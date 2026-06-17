import richterImage from "../assets/artworks/burchard-richter.png";
import richterThumb from "../assets/artworks/richter-thumb.png";
import exodusThumb from "../assets/artworks/exodus-thumb.png";
import isleDeadThumb from "../assets/artworks/isle-dead-thumb.png";
import catThumb from "../assets/artworks/cat-thumb.png";

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  author?: string;
  authorDates?: string;
  country?: string;
  place?: string;
  date?: string;
  technique?: string;
  material?: string;
  dimensions?: string;
  inventoryNumber?: string;
  acquisition?: string;
  category?: string;
  collection?: string;
  subcollection?: string;
  building?: string;
  room?: string;
  image: string;
  thumbnail: string;
}

export const artworks: Artwork[] = [
  {
    id: "richter",
    slug: "portrait-of-burchard-richter",
    title: "Portrait of the Life Guards Jaeger Regiment's Colonel Burchard Ch. Richter",
    author: "Vogel von Vogelstein, Carl Christian",
    authorDates: "1788-1868",
    country: "Germany",
    place: "Germany",
    date: "1810-1812",
    technique: "Oil on canvas",
    material: "Canvas",
    dimensions: "71 x 57 cm",
    inventoryNumber: "GE-7642",
    acquisition: "Entered the Hermitage in 1925; transferred from the Yusupov Palace Museum, Petrograd",
    category: "Painting",
    collection: "European Fine Art",
    subcollection: "German Painting of the 19th-20th Centuries",
    building: "Winter Palace",
    room: "197",
    image: richterImage,
    thumbnail: richterThumb,
  },
  {
    id: "exodus",
    slug: "illustration-for-the-book-of-exodus",
    title: "Illustration for the Book of Exodus, ch. VII, § III, “The first Egyptian plague: waters turned into blood”",
    author: "Delvaux, Remi-Henri-Joseph",
    authorDates: "1748-1823",
    country: "France, Paris",
    date: "circa 1790",
    collection: "European Fine Art",
    image: exodusThumb,
    thumbnail: exodusThumb,
  },
  {
    id: "isle-dead",
    slug: "isle-of-the-dead",
    title: "Isle of the Dead",
    author: "Bocklin, Arnold",
    authorDates: "1827-1901",
    country: "Western Europe",
    date: "1901",
    collection: "European Fine Art",
    image: isleDeadThumb,
    thumbnail: isleDeadThumb,
  },
  {
    id: "cat",
    slug: "head-of-a-cat",
    title: "Head of a Cat",
    country: "Ancient Egypt",
    date: "7th - 6th century BC (?)",
    collection: "Oriental Art",
    image: catThumb,
    thumbnail: catThumb,
  },
  {
    id: "adam-eve",
    slug: "plaquette-with-adam-and-eve",
    title: "Plaquette with Adam and Eve",
    country: "Germany",
    date: "16th century (Germany)",
    collection: "European Applied Art",
    image: exodusThumb,
    thumbnail: exodusThumb,
  },
  {
    id: "beham",
    slug: "portrait-of-sebald-beham",
    title: "Portrait of Sebald Beham",
    author: "Monogrammist \"HXC\"",
    date: "1532",
    collection: "European Fine Art",
    image: richterThumb,
    thumbnail: richterThumb,
  },
];

export const searchCategories = [
  ["WORK OF ART", 40],
  ["EXHIBITION", 1314],
  ["EVENT", 1314],
  ["NEWS", 6002],
  ["COLLECTION", 200],
  ["PUBLICATION", 367],
  ["A WORD FROM THE DIRECTOR", 143],
  ["MUSEUM", 2981],
  ["CHAIN OF MEMORY", 66],
  ["BUILDINGS", 7],
  ["ROOMS", 920],
  ["VIRTUAL VISIT", 70],
] as const;
