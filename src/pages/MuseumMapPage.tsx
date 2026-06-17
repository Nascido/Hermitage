import InstitutionalFooter from "../components/institutional/InstitutionalFooter";
import mapImage from "../assets/maps/main-museum-floor-1.png";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import { galleryImage, roomGroups, rooms } from "../data/virtualVisit";

export default function MuseumMapPage() {
  return (
    <InstitutionalLayout footer={<InstitutionalFooter />}>
      <main className="museum-map-page">
        <div className="wide-banner" style={{ backgroundImage: `url(${galleryImage})` }}>
          <span>VIRTUAL VISIT</span>
        </div>
        <section className="map-intro">
          <h1>The Main Museum Complex</h1>
          <div className="select-row">
            <label>
              <span className="sr-only">Floor</span>
              <select defaultValue="Floor 1"><option>Floor 1</option><option>Floor 2</option></select>
            </label>
            <label>
              <span className="sr-only">Other tours</span>
              <select defaultValue="OTHER TOURS"><option>OTHER TOURS</option><option>THE GENERAL STAFF BUILDING</option></select>
            </label>
          </div>
          <img className="museum-map-image" src={mapImage} alt="Floor 1 map of the Main Museum Complex" />
        </section>
        <section className="room-directory" aria-label="Room directory">
          <div className="legend-grid">
            {roomGroups.map((group) => (
              <span key={group.label}><i style={{ backgroundColor: group.color }} />{group.label}</span>
            ))}
          </div>
          <ol>
            {rooms.map((room) => (
              <li key={`${room.number}-${room.title}`}><span>{room.number}</span> {room.title}</li>
            ))}
          </ol>
        </section>
      </main>
    </InstitutionalLayout>
  );
}
