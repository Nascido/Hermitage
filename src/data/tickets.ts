import jordan from "../assets/tickets/jordan-staircase.png";
import church from "../assets/tickets/church-staircase.png";
import threeDay from "../assets/tickets/three-day.png";

export interface TicketCategory {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface TicketTime {
  label: string;
  available: number;
}

export interface TicketDate {
  iso: string;
  label: string;
  times: TicketTime[];
}

export interface TicketProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  dateRange: string;
  location: string;
  duration?: string;
  ageRating?: string;
  categories: TicketCategory[];
  availableDates: TicketDate[];
}

const times: TicketTime[] = [
  { label: "11:00", available: 0 },
  { label: "11:30", available: 0 },
  { label: "12:00", available: 0 },
  { label: "12:30", available: 0 },
  { label: "13:00", available: 0 },
  { label: "13:30", available: 0 },
  { label: "14:00", available: 0 },
  { label: "14:30", available: 0 },
  { label: "15:00", available: 0 },
  { label: "15:30", available: 61 },
  { label: "16:00", available: 58 },
];

export const ticketCategories: TicketCategory[] = [
  { id: "main", name: "Main category", description: "for one person", price: 700 },
  { id: "children", name: "Children under 18", description: "for one person", price: 0 },
  { id: "cadets", name: "Cadets of educational institutions of the Russian Federation", description: "for one person", price: 0 },
  { id: "disabled", name: "Disabled persons", description: "for one person", price: 0 },
  { id: "companion", name: "Accompanying disabled person", description: "for one person", price: 0 },
  { id: "retirees", name: "Retirees (Russian Federation and EAEU countries)", description: "for one person", price: 0 },
  { id: "students", name: "Students", description: "for one person", price: 0 },
  { id: "employees", name: "Museum employees", description: "for one person", price: 0 },
];

export const ticketProducts: TicketProduct[] = [
  {
    id: "main-museum-complex",
    slug: "main-museum-complex",
    title: "Entrance ticket to the Main Museum Complex. Entry by way of the Jordan Staircase",
    description: "The entrance ticket gives the opportunity to independently view the permanent displays and temporary exhibitions of the Main Museum Complex.",
    image: jordan,
    dateRange: "June 18 - June 30",
    location: "Palace Square, 2",
    duration: "02:00",
    ageRating: "0+",
    categories: ticketCategories,
    availableDates: ["18 June", "19 June", "20 June", "21 June", "23 June", "24 June", "25 June"].map((label, index) => ({
      iso: `2026-06-${18 + index}`,
      label,
      times,
    })),
  },
  {
    id: "church-staircase",
    slug: "church-staircase",
    title: "Entrance ticket to the Main Museum Complex. The entrance is from the Church staircase",
    description: "The entrance ticket gives the opportunity to independently view the permanent displays and temporary exhibitions.",
    image: church,
    dateRange: "June 18 - June 30",
    location: "Palace Square, 2",
    categories: ticketCategories,
    availableDates: [],
  },
  {
    id: "three-day",
    slug: "three-day",
    title: "Entrance ticket to the Main Museum Complex, valid for a single visit over the course of three days",
    description: "This ticket gives the holder the right to visit the museum facility on one of three successive working days.",
    image: threeDay,
    dateRange: "June 18 - July 2",
    location: "Palace Square, 2",
    categories: ticketCategories,
    availableDates: [],
  },
];

export interface TicketOrder {
  productId: string;
  selectedDate: string | null;
  selectedTime: string | null;
  quantities: Record<string, number>;
}

export const emptyOrder: TicketOrder = {
  productId: "main-museum-complex",
  selectedDate: null,
  selectedTime: null,
  quantities: {},
};
