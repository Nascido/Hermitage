import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VirtualVisitPage from "./pages/VirtualVisitPage";
import MuseumMapPage from "./pages/MuseumMapPage";
import SearchPage from "./pages/SearchPage";
import ArtworkSearchPage from "./pages/ArtworkSearchPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage";
import TicketsInfoPage from "./pages/TicketsInfoPage";
import TicketCatalogPage from "./pages/TicketCatalogPage";
import TicketDatePage from "./pages/TicketDatePage";
import TicketQuantityPage from "./pages/TicketQuantityPage";
import CheckoutPage from "./pages/CheckoutPage";
import ReviewPage from "./pages/ReviewPage";
import NotImplementedPage from "./pages/NotImplementedPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/virtual-visit" element={<VirtualVisitPage />} />
      <Route path="/virtual-visit/main-museum-complex" element={<MuseumMapPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/artworks" element={<ArtworkSearchPage />} />
      <Route path="/artworks/portrait-of-burchard-richter" element={<ArtworkDetailsPage />} />
      <Route path="/tickets" element={<TicketsInfoPage />} />
      <Route path="/ticket-shop" element={<TicketCatalogPage />} />
      <Route path="/ticket-shop/main-museum-complex" element={<TicketDatePage />} />
      <Route path="/ticket-shop/main-museum-complex/quantity" element={<TicketQuantityPage />} />
      <Route path="/ticket-shop/checkout" element={<CheckoutPage />} />
      <Route path="/not-implemented" element={<NotImplementedPage />} />
      <Route path="/tours" element={<Navigate to="/not-implemented" replace />} />
      <Route path="/collection" element={<Navigate to="/not-implemented" replace />} />
      <Route path="/collection/search" element={<Navigate to="/not-implemented" replace />} />
      <Route path="/collection/artworks/:artworkId" element={<Navigate to="/not-implemented" replace />} />
      <Route path="/__review" element={<ReviewPage />} />
      <Route path="*" element={<NotImplementedPage />} />
    </Routes>
  );
}
