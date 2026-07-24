'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const links = [
    { href: '/#shop', label: 'Shop' },
    { href: '/#refreshers', label: 'Refreshers' },
    { href: '/#story', label: 'Story' },
    { href: '/#roaster', label: 'Our Roaster' },
    { href: '/#giving', label: 'Giving Back' },
    { href: '/#join', label: 'Contact' },
  ];

  return (
    <header className={scrolled ? 'solid' : ''}>
      <div className="wrap">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <img className="logo-mark" src="/kinetic-logo.png" alt="Kinetic Coffee Co. logo" />
          <span className="logo-text">
            KINETIC <span>COFFEE CO.</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <div className={`nav-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />

      <nav className={`mobile-nav ${open ? 'open' : ''}`}>
        <button className="nav-close" aria-label="Close navigation" onClick={() => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span>Close</span>
        </button>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
