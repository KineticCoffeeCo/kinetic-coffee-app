import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="wrap">
        <Link href="/" className="logo">
          <img className="logo-mark" src="/kinetic-logo.jpg" alt="Kinetic Coffee Company logo" />
          <span className="logo-text">KINETIC <span>COFFEE</span></span>
        </Link>
        <nav>
          <Link href="/#shop">Shop</Link>
          <Link href="/#refreshers">Refreshers</Link>
          <Link href="/#story">Story</Link>
          <Link href="/#roaster">Our Roaster</Link>
          <Link href="/#giving">Giving Back</Link>
          <Link href="/#join">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
