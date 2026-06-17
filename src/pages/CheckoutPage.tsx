import { FormEvent, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import TicketShopLayout from "../layouts/TicketShopLayout";
import { getOrder, getOrderCount, getOrderTotal, getProduct } from "../utils/ticketOrder";

export default function CheckoutPage() {
  const order = getOrder();
  const product = getProduct();
  const total = getOrderTotal(order);
  const count = getOrderCount(order);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ email: "", repeat: "", first: "", last: "", phone: "", terms: false, data: false, info: false });
  const valid = useMemo(
    () => /\S+@\S+\.\S+/.test(form.email) && form.email === form.repeat && Boolean(form.first && form.last && form.phone) && form.terms && form.data && form.info && count > 0,
    [form, count],
  );

  if (!count) return <Navigate to="/ticket-shop/main-museum-complex/quantity" replace />;

  const update = (name: string, value: string | boolean) => setForm((current) => ({ ...current, [name]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (valid) setSubmitted(true);
  };

  return (
    <TicketShopLayout>
      <main className="ticket-step-page checkout-page">
        <section className="checkout-summary">
          <h1>{product.title}</h1>
          <p>{order.selectedDate} {order.selectedTime}</p>
          <p>Total order amount: {total} RUB</p>
        </section>
        <form className="checkout-form" onSubmit={submit}>
          <h2>Your data</h2>
          <label>E-mail<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
          <label>Repeat e-mail<input required type="email" value={form.repeat} onChange={(event) => update("repeat", event.target.value)} aria-describedby="repeat-error" /></label>
          {form.repeat && form.email !== form.repeat && <p id="repeat-error" className="field-error">E-mails must match</p>}
          <label>First name<input required value={form.first} onChange={(event) => update("first", event.target.value)} /></label>
          <label>Last name<input required value={form.last} onChange={(event) => update("last", event.target.value)} /></label>
          <label>Phone number<input required value={form.phone} onChange={(event) => update("phone", event.target.value)} /></label>
          <label className="check-line"><input type="checkbox" checked={form.terms} onChange={(event) => update("terms", event.target.checked)} /> I agree with the public offer and ticket purchase rules.</label>
          <label className="check-line"><input type="checkbox" checked={form.data} onChange={(event) => update("data", event.target.checked)} /> I consent to the processing of personal data.</label>
          <label className="check-line"><input type="checkbox" checked={form.info} onChange={(event) => update("info", event.target.checked)} /> I accept information conditions related to the museum visit.</label>
          <p className="order-total" aria-live="polite">Total order amount: {total} RUB</p>
          <button type="submit" disabled={!valid}>PAY</button>
          {submitted && <p className="success-message" role="status">Order confirmed locally. Payment is not processed.</p>}
        </form>
      </main>
    </TicketShopLayout>
  );
}
