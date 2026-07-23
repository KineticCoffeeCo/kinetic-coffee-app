export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img
              src="/kinetic-logo.jpg"
              alt="Kinetic Coffee Company logo"
              style={{ width: 56, height: 56, borderRadius: '50%', marginBottom: '0.9rem' }}
            />
            <span className="logo-text" style={{ fontSize: '1.15rem' }}>
              KINETIC <span style={{ color: 'var(--orange)' }}>COFFEE CO.</span>
            </span>
            <p style={{ color: 'var(--paper-dim)', fontSize: '0.85rem', marginTop: '0.8rem', maxWidth: 280 }}>
              Small-batch coffee, roasted with discipline. Veteran-owned and operated — 2.2% of every order supports
              Mission 22.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <a href="/products/white-knuckle">White Knuckle</a>
            <a href="/products/standard-issue">Standard Issue</a>
            <a href="/products/rally-point">Rally Point</a>
            <a href="/products/full-deployment">Full Deployment</a>
            <a href="/#refreshers">Lotus Energy Refreshers</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/#story">Our Story</a>
            <a href="/#roaster">Our Roaster</a>
            <a href="/#giving">Giving Back</a>
            <a href="/#join">Contact</a>
          </div>
          <div>
            <h4>Coordinates</h4>
            <a href="mailto:kineticcoffeeco@gmail.com">kineticcoffeeco@gmail.com</a>
            <a href="#">Colorado, USA</a>
            <a href="https://www.instagram.com/kineticcoffeeco/">Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kinetic Coffee Company.</span>
          <span>Veteran-Owned &amp; Operated · All Systems Go</span>
        </div>
      </div>
    </footer>
  );
}
