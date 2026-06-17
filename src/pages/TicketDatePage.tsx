import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TicketShopLayout from "../layouts/TicketShopLayout";
import { getOrder, getProduct, saveOrder } from "../utils/ticketOrder";

export default function TicketDatePage() {
  const product = getProduct();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(getOrder().selectedDate ?? product.availableDates[0].iso);
  const [selectedTime, setSelectedTime] = useState(getOrder().selectedTime);
  const date = product.availableDates.find((item) => item.iso === selectedDate) ?? product.availableDates[0];

  useEffect(() => {
    saveOrder({ ...getOrder(), productId: product.id, selectedDate, selectedTime });
  }, [product.id, selectedDate, selectedTime]);

  const chooseTime = (time: string, available: number) => {
    if (!available) return;
    setSelectedTime(time);
    saveOrder({ ...getOrder(), productId: product.id, selectedDate, selectedTime: time });
    navigate("/ticket-shop/main-museum-complex/quantity");
  };

  return (
    <TicketShopLayout>
      <main className="ticket-step-page">
        <Link className="back-link" to="/ticket-shop">Back to ticket selection</Link>
        <section className="ticket-product-intro">
          <h1>{product.title}</h1>
          <span className="age-badge">{product.ageRating}</span>
          <p>{product.description}</p>
          <p><strong>Session duration:</strong> {product.duration}</p>
          <p><strong>{product.location}</strong></p>
        </section>
        <section className="date-time-panel">
          <h2>Choose a date:</h2>
          <div className="date-strip">
            {product.availableDates.map((item) => (
              <button className={item.iso === selectedDate ? "selected" : ""} type="button" key={item.iso} onClick={() => setSelectedDate(item.iso)}>
                <strong>{item.label.split(" ")[0]}</strong><span>{item.label.split(" ")[1]}</span>
              </button>
            ))}
          </div>
          <h2>Select time:</h2>
          <div className="time-grid">
            {date.times.map((time) => (
              <button type="button" className={selectedTime === time.label ? "selected" : ""} disabled={!time.available} key={time.label} onClick={() => chooseTime(time.label, time.available)}>
                {time.label}
              </button>
            ))}
          </div>
          <p className="availability-note">{selectedTime ? `${selectedTime} selected` : "15:30 - 61 pcs.  16:00 - 58 pcs."}</p>
        </section>
      </main>
    </TicketShopLayout>
  );
}
