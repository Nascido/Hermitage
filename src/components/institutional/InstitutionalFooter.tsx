export default function InstitutionalFooter() {
  return (
    <footer className="institutional-footer">
      <div className="social-row" aria-label="Social links">
        {["f", "vk", "yt", "tg", "rss", "ok"].map((item) => (
          <a href="#social" key={item}>{item}</a>
        ))}
      </div>
      <nav aria-label="Footer links">
        <a href="#about">ABOUT</a>
        <a href="#press">PRESS</a>
        <a href="#contacts">CONTACTS</a>
        <a href="#accessibility">ACCESSIBILITY</a>
        <a href="#sitemap">SITEMAP</a>
      </nav>
      <div className="app-badges">
        <span>App Store</span>
        <span>Google play</span>
      </div>
      <p>© The State Hermitage Museum, 1998-2026</p>
    </footer>
  );
}
