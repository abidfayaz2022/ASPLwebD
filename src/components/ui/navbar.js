'use client';

import Link from 'next/link';
import { useEffect } from 'react';



const Navbar = () => {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);
    return (

        < nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" >
            <div className="container">
                <Link className="navbar-brand" href="/">ASPL Consultancy</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" href="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/resources">Resources</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contact">Contact</Link>
                        </li>
                    </ul>
                    <div className="ms-auto d-none d-lg-flex align-items-center">
                        <img
                            src="/images/angelserviceslogo (2).png"
                            alt="Angel Services Logo"
                            style={{ height: '50px', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </nav >
    );
};



export default Navbar;
