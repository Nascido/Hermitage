import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import TicketShopLayout from "../layouts/TicketShopLayout";
import { getOrder, getOrderCount, getOrderTotal, getProduct, saveOrder } from "../utils/ticketOrder";

export default function TicketQuantityPage() {
  const product = getProduct();
  const [order, setOrder] = useState(() => {
    const initialOrder = getOrder();
    if (initialOrder.selectedDate && initialOrder.selectedTime && getOrderCount(initialOrder) === 0) {
      return { ...initialOrder, quantities: { ...initialOrder.quantities, main: 1 } };
    }
    return initialOrder;
  });
  const [expanded, setExpanded] = useState(false);
  const primaryCategories = product.categories.filter((category) => ["main", "students", "retirees"].includes(category.id));
  const visibleCategories = expanded ? product.categories : primaryCategories;
  const total = useMemo(() => getOrderTotal(order), [order]);
  const count = useMemo(() => getOrderCount(order), [order]);
  const selectedDateLabel = product.availableDates.find((date) => date.iso === order.selectedDate)?.label ?? order.selectedDate ?? "";
  const [selectedDay = "", selectedMonth = ""] = selectedDateLabel.split(" ");

  useEffect(() => {
    saveOrder(order);
  }, [order]);

  if (!order.selectedDate || !order.selectedTime) return <Navigate to="/ticket-shop/main-museum-complex" replace />;

  const setQuantity = (id: string, next: number) => {
    const current = order.quantities[id] || 0;
    const projected = count - current + next;
    if (next < 0 || projected > 4) return;
    const nextOrder = { ...order, quantities: { ...order.quantities, [id]: next } };
    setOrder(nextOrder);
    saveOrder(nextOrder);
  };

  return (
    <TicketShopLayout>
      <main className="ticket-step-page quantity-page">
        <Link className="back-link" to="/ticket-shop/main-museum-complex">← Back</Link>
        <section className="date-time-panel compact-step" aria-label="Selected visit date and time">
          <div className="date-strip">
            <button className="selected" type="button">
              <strong>{selectedDay}</strong>
              <span>{selectedMonth.slice(0, 3)}</span>
            </button>
          </div>
          <div className="time-grid"><button className="selected" type="button">{order.selectedTime}</button></div>
        </section>
        <section className="quantity-panel">
          <h1>Main Museum Complex</h1>
          <p className="limit-warning">⚠ Maximum of 4 tickets per order</p>
          <div className="quantity-table" role="table" aria-label="Ticket quantities">
            <div role="row" className="quantity-head">
              <span>Category</span><span>Price (RUB)</span><span>Amount</span>
            </div>
            {visibleCategories.map((category) => {
              const quantity = order.quantities[category.id] || 0;
              return (
                <div role="row" className="quantity-row" key={category.id}>
                  <span><strong>{category.name}</strong><small>{category.description}</small></span>
                  <span>{category.price}</span>
                  <span className={category.id === "main" ? "stepper" : "stepper is-empty"} aria-label={`${category.name} quantity controls`}>
                    {category.id === "main" && (
                      <>
                        <input aria-label={`${category.name} quantity`} value={quantity} readOnly />
                        <span className="stepper-buttons">
                          <button type="button" aria-label={`Increase ${category.name}`} onClick={() => setQuantity(category.id, quantity + 1)}>⌃</button>
                          <button type="button" aria-label={`Decrease ${category.name}`} onClick={() => setQuantity(category.id, quantity - 1)}>⌄</button>
                        </span>
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <button className="more-categories" type="button" onClick={() => setExpanded((value) => !value)}>{expanded ? "− See less" : "+ See more"}</button>
          <div className="quantity-actions">
            <p className="order-total" aria-live="polite">Total: {total} RUB</p>
            {count > 0 && <Link className="continue-button" to="/ticket-shop/checkout">CONTINUE →</Link>}
          </div>
        </section>
      </main>
    </TicketShopLayout>
  );
}
