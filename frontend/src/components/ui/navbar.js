'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.css'; // Adjust the path as necessary

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('offcanvas-open');
    } else {
      document.body.classList.remove('offcanvas-open');
    }
    return () => document.body.classList.remove('offcanvas-open');
  }, [menuOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Resources', path: '/resources' },
    { name: 'Global', path: '/services/global' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar navbar-expand-lg fixed-top shadow-sm ${styles.navbarCustom}`}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className={`navbar-brand d-flex align-items-center ${styles.logoWrapper}`}>
          <Image
            src="/images/angelserviceslogo (2).png"
            alt="Angel Services Logo"
            width={190}
            height={56}
            priority
            className={styles.logoImage}
          />
        </Link>

        {/* Hamburger for mobile only */}
        <button
          className={`d-lg-none ${styles.navbarToggler}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={styles.navbarTogglerIcon}></span>
        </button>

        {/* Desktop Nav: Do NOT touch */}
        <div className="collapse navbar-collapse justify-content-end d-none d-lg-block">
          <ul className={`navbar-nav ${styles.navLinks}`}>
            {navItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link href={item.path} className={`nav-link ${styles.navItem}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`d-lg-none ${styles.mobileMenu}`}>
          <ul className={styles.navLinksMobile}>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={styles.navItem}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Backdrop */}
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
