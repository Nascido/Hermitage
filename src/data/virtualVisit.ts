import redGallery from "../assets/banners/red-gallery.png";

export const tourCards = [
  "THE MAIN MUSEUM COMPLEX",
  "THE GENERAL STAFF BUILDING",
  "WINTER PALACE OF PETER THE GREAT",
  "THE MENSHIKOV PALACE",
  "THE HERMITAGE THEATRE",
  "THE MUSEUM OF THE IMPERIAL PORCELAIN FACTORY",
  "THE RESTORATION AND STORAGE CENTRE",
  "AROUND THE MAIN MUSEUM COMPLEX",
];

export const roomGroups = [
  { color: "#f7a9ae", label: "Eastern Europe, Northwest" },
  { color: "#e9b4ed", label: "Culture of Ancient Russia" },
  { color: "#fff2a3", label: "Classical Antiquities" },
  { color: "#fbc98b", label: "The Near East" },
  { color: "#c7eff0", label: "Western European Applied Art" },
  { color: "#d6eca3", label: "Western European Fine Art" },
  { color: "#d7f0c4", label: "Arsenal" },
  { color: "#f1c0e8", label: "Numismatics" },
];

export const rooms = Array.from({ length: 52 }, (_, index) => ({
  number: index < 8 ? `${index + 12}` : `${index + 82}`,
  title:
    index % 5 === 0
      ? "Gallery of the History of Ancient Painting"
      : index % 4 === 0
        ? "The Hall of Twenty Columns"
        : index % 3 === 0
          ? "The Alexander Hall"
          : "Rooms of Russian Culture",
}));

export const galleryImage = redGallery;
