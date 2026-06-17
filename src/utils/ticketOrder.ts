import { emptyOrder, ticketProducts, type TicketOrder } from "../data/tickets";

const key = "hermitage-ticket-order";

export function getOrder(): TicketOrder {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? { ...emptyOrder, ...JSON.parse(raw) } : emptyOrder;
  } catch {
    return emptyOrder;
  }
}

export function saveOrder(order: TicketOrder) {
  sessionStorage.setItem(key, JSON.stringify(order));
}

export function getProduct() {
  return ticketProducts[0];
}

export function getOrderTotal(order: TicketOrder) {
  const product = getProduct();
  return product.categories.reduce((sum, category) => sum + (order.quantities[category.id] || 0) * category.price, 0);
}

export function getOrderCount(order: TicketOrder) {
  return Object.values(order.quantities).reduce((sum, value) => sum + value, 0);
}
