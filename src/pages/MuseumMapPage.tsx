import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import InstitutionalFooter from "../components/institutional/InstitutionalFooter";
import mapImage from "../assets/maps/main-museum-floor-1.png";
import InstitutionalLayout from "../layouts/InstitutionalLayout";
import { galleryImage, roomGroups, rooms } from "../data/virtualVisit";

const floors = ["Floor 1", "Floor 2", "Floor 3"] as const;

export default function MuseumMapPage() {
  const [floor, setFloor] = useState<(typeof floors)[number]>("Floor 1");
  const featuredRooms = useMemo(() => rooms.slice(floor === "Floor 1" ? 0 : floor === "Floor 2" ? 8 : 16, floor === "Floor 1" ? 7 : floor === "Floor 2" ? 15 : 23), [floor]);

  return (
    <InstitutionalLayout footer={<InstitutionalFooter />}>
      <main className="museum-map-page">
        <section className="page-hero compact" style={{ backgroundImage: `url(${galleryImage})` }}>
          <h1>The Main Museum Complex</h1>
          <p>Virtual Visit</p>
        </section>
        <section className="map-intro">
          <Link className="back-link institutional" to="/virtual-visit">← Back</Link>
          <h1>The Main Museum Complex</h1>
          <div className="map-toolbar">
            <div className="floor-tabs" role="tablist" aria-label="Museum floor">
              {floors.map((item) => (
                <button key={item} role="tab" aria-selected={item === floor} type="button" onClick={() => setFloor(item)}>
                  {item}
                </button>
              ))}
            </div>
            <label>
              <span className="sr-only">Other tours</span>
              <select defaultValue="Other tours"><option>Other tours</option><option>The General Staff Building</option><option>Winter Palace of Peter the Great</option></select>
            </label>
          </div>
          <div className="museum-map-grid">
            <div className={`museum-map-frame ${floor.toLowerCase().replace(" ", "-")}`}>
              <img className="museum-map-image" src={mapImage} alt={`${floor} map of the Main Museum Complex`} />
              <Link className="map-pin" to="/artworks/portrait-of-burchard-richter" style={{ left: floor === "Floor 3" ? "10%" : floor === "Floor 2" ? "34%" : "58%", top: floor === "Floor 3" ? "38%" : floor === "Floor 2" ? "62%" : "70%" }}>
                <span className="sr-only">Open featured artwork on {floor}</span>
              </Link>
            </div>
            <aside className="map-legend">
              <h2>Legenda</h2>
              <div>
                {roomGroups.slice(0, 4).map((group) => (
                  <span key={group.label}><i style={{ backgroundColor: group.color }} />{group.label}</span>
                ))}
              </div>
              <ol>
                {featuredRooms.map((room, index) => (
                  <li key={`${floor}-${room.number}`}>{index + 1}. {room.title}</li>
                ))}
              </ol>
            </aside>
          </div>
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
