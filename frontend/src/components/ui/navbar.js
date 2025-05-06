'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

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
      <Link
  href="/"
  className={`navbar-brand d-flex align-items-center ${styles.logoWrapper}`}
  style={{ height: '64px' }}
>
  <Image
    src="/images/angelserviceslogo (2).png"
    alt="Angel Services Logo"
    width={190}
    height={56}
    priority
    className={styles.logoImage}
  />
</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
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
    </nav>
  );
};

export default Navbar;
