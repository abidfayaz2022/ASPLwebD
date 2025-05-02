'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/Navbar.module.css';

 // Add this line for custom styles

const Navbar = () => {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top shadow-sm ${styles.navbarCustom}`}>
            <div className="container d-flex justify-content-between align-items-center">
                <Link href="/" className="navbar-brand d-flex align-items-center">
                <img
  src="/images/angelserviceslogo (2).png"
  alt="Angel Services Logo"
  style={{ height: '40px', objectFit: 'contain' }} // reduced from 50px
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
                        {["Home", "About", "Services", "Resources", "Contact"].map((item) => (
                            <li className="nav-item" key={item}>
                                <Link href={`/${item.toLowerCase()}`} className={`nav-link ${styles.navItem}`}>
                                    {item}
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
