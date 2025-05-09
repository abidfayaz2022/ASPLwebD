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
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar navbar-expand-lg fixed-top shadow-sm ${styles.navbarCustom}`}>
      {/* Logo Section (left-aligned) */}
      <div className="ps-5 d-flex align-items-center">

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
      </div>

      {/* Desktop Nav (right-aligned outside container) */}
      <div className="d-none d-lg-flex align-items-center justify-content-end w-100 px-4">
        <ul className={`navbar-nav ${styles.navLinks}`}>
          {navItems.map((item) => {
            if (item.name === 'Global') {
              return (
                <li className={`nav-item ${styles.dropdownWrapper}`} key="Global">
                  <Link href={item.path} className={`nav-link ${styles.navItem}`}>
                    Global
                  </Link>
                  <div className={styles.dropdownMenu}>
                    <Link href="/singapore" className={styles.dropdownItem}>Singapore</Link>
                    <Link href="/uae" className={styles.dropdownItem}>UAE</Link>
                    <Link href="/india" className={styles.dropdownItem}>India</Link>
                  </div>
                </li>
              );
            }

            return (
              <li className="nav-item" key={item.name}>
                <Link href={item.path} className={`nav-link ${styles.navItem}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Hamburger */}
      <button
        className={`d-lg-none ${styles.navbarToggler}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span className={styles.navbarTogglerIcon}></span>
      </button>

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
            <li className={styles.mobileSubLink}>
              <Link href="/singapore" onClick={() => setMenuOpen(false)}>→ Singapore</Link>
            </li>
            <li className={styles.mobileSubLink}>
              <Link href="/uae" onClick={() => setMenuOpen(false)}>→ UAE</Link>
            </li>
            <li className={styles.mobileSubLink}>
              <Link href="/india" onClick={() => setMenuOpen(false)}>→ India</Link>
            </li>
          </ul>
        </div>
      )}

      {/* Backdrop */}
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
