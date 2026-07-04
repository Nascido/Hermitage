import { FormEvent, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import TicketShopLayout from "../layouts/TicketShopLayout";
import { getOrder, getOrderCount, getOrderTotal, getProduct } from "../utils/ticketOrder";

export default function CheckoutPage() {
  const order = getOrder();
  const product = getProduct();
  const total = getOrderTotal(order);
  const count = getOrderCount(order);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: "email@bananinha.com",
    repeat: "email@bananinha.com",
    first: "Bananilson",
    last: "Da Silva",
    phone: "+55 (48) 98812-3456",
    terms: false,
    data: false,
    info: false,
  });
  const valid = useMemo(
    () => /\S+@\S+\.\S+/.test(form.email) && form.email === form.repeat && Boolean(form.first && form.last && form.phone) && form.terms && form.data && form.info && count > 0,
    [form, count],
  );
  const selectedDateLabel = product.availableDates.find((date) => date.iso === order.selectedDate)?.label ?? order.selectedDate ?? "";
  const orderItems = product.categories
    .map((category) => ({ ...category, quantity: order.quantities[category.id] || 0 }))
    .filter((category) => category.quantity > 0);

  if (!count) return <Navigate to="/ticket-shop/main-museum-complex/quantity" replace />;

  const update = (name: string, value: string | boolean) => setForm((current) => ({ ...current, [name]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <TicketShopLayout>
      <main className="ticket-step-page checkout-page">
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={submit}>
            <Link className="back-link" to="/ticket-shop/main-museum-complex/quantity">← Back</Link>
            <h1>Seus dados</h1>
            <label>E-mail<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
            <label>Confirm e-mail<input required type="email" value={form.repeat} onChange={(event) => update("repeat", event.target.value)} aria-describedby="repeat-error" /></label>
            {form.repeat && form.email !== form.repeat && <p id="repeat-error" className="field-error">E-mails must match</p>}
            <div className="checkout-name-row">
              <label>Name<input required value={form.first} onChange={(event) => update("first", event.target.value)} /></label>
              <label>Surname<input required value={form.last} onChange={(event) => update("last", event.target.value)} /></label>
            </div>
            <label>Phone<input required value={form.phone} onChange={(event) => update("phone", event.target.value)} /></label>
            <fieldset className="checkout-consents">
              <legend className="sr-only">Purchase agreements</legend>
              <label className="check-line"><input type="checkbox" checked={form.terms} onChange={(event) => update("terms", event.target.checked)} /> I agree with the rules for purchase and public offering.</label>
              <label className="check-line"><input type="checkbox" checked={form.data} onChange={(event) => update("data", event.target.checked)} /> I authorize the processing of my personal data.</label>
              <label className="check-line"><input type="checkbox" checked={form.info} onChange={(event) => update("info", event.target.checked)} /> I accept the terms and conditions for visiting the museum.</label>
            </fieldset>
            <button type="submit" aria-disabled={!valid}>PAY {total} RUB</button>
            {!valid && <p className="checkout-note">Fill in all the fields to enable payment.</p>}
          </form>
          <aside className="checkout-order-card" aria-label="Order summary">
            <h2>Order</h2>
            <div className="checkout-order-title">
              <strong>Main Museum Complex</strong>
              <span>{selectedDateLabel} · {order.selectedTime}</span>
            </div>
            <div className="checkout-order-items">
              {orderItems.map((category) => (
                <p key={category.id}>
                  <span>{category.quantity}× {category.name}</span>
                  <strong>{category.quantity * category.price} RUB</strong>
                </p>
              ))}
            </div>
            <p className="checkout-order-total">
              <span>Total</span>
              <strong>{total} RUB</strong>
            </p>
          </aside>
        </div>
        {submitted && (
          <section className="payment-approved-modal" role="dialog" aria-modal="true" aria-labelledby="payment-approved-title">
            <Link className="approved-back-link" to="/">← Voltar para o menu principal</Link>
            <div className="approved-content">
              <span className="approved-check-icon" aria-hidden="true" />
              <h2 id="payment-approved-title">Approved</h2>
              <p>The payment was successfully processed.</p>
            </div>
          </section>
        )}
      </main>
    </TicketShopLayout>
  );
}
