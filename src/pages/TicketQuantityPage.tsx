import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import TicketShopLayout from "../layouts/TicketShopLayout";
import { getOrder, getOrderCount, getOrderTotal, getProduct, saveOrder } from "../utils/ticketOrder";

export default function TicketQuantityPage() {
  const product = getProduct();
  const [order, setOrder] = useState(getOrder());
  const [expanded, setExpanded] = useState(false);
  const visibleCategories = expanded ? product.categories : product.categories.slice(0, 6);
  const total = useMemo(() => getOrderTotal(order), [order]);
  const count = useMemo(() => getOrderCount(order), [order]);

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
        <Link className="back-link" to="/ticket-shop/main-museum-complex">Back to time selection</Link>
        <section className="date-time-panel compact-step">
          <div className="date-strip"><button className="selected" type="button">18<span>June</span></button></div>
          <div className="time-grid"><button className="selected" type="button">{order.selectedTime}</button></div>
        </section>
        <section className="quantity-panel">
          <h1>{product.title}</h1>
          <p className="limit-warning">The maximum number of tickets per order: 4</p>
          <div className="quantity-table" role="table" aria-label="Ticket quantities">
            <div role="row" className="quantity-head">
              <span>Category</span><span>Price, RUB</span><span>Quantity</span><span>Amount, RUB</span>
            </div>
            {visibleCategories.map((category) => {
              const quantity = order.quantities[category.id] || 0;
              return (
                <div role="row" className="quantity-row" key={category.id}>
                  <span><strong>{category.name}</strong><small>{category.description}</small></span>
                  <span>{category.price}</span>
                  <span className="stepper">
                    <button type="button" aria-label={`Decrease ${category.name}`} onClick={() => setQuantity(category.id, quantity - 1)}>-</button>
                    <input aria-label={`${category.name} quantity`} value={quantity} readOnly />
                    <button type="button" aria-label={`Increase ${category.name}`} onClick={() => setQuantity(category.id, quantity + 1)}>+</button>
                  </span>
                  <span>{quantity * category.price}</span>
                </div>
              );
            })}
          </div>
          <button className="more-categories" type="button" onClick={() => setExpanded((value) => !value)}>More categories</button>
          <p className="order-total" aria-live="polite">Total order amount: {total} RUB</p>
          {count > 0 && <Link className="continue-button" to="/ticket-shop/checkout">CONTINUE</Link>}
        </section>
      </main>
    </TicketShopLayout>
  );
}
