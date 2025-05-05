"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="footer-section mt-5">
            {/* Main Footer */}
            <div
                className="footer-main py-5"
                style={{
                    backgroundColor: '#f8f9fa',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative Elements */}
                <div className="footer-shapes">
                    <div className="footer-shape shape1"></div>
                    <div className="footer-shape shape2"></div>
                    <div className="footer-shape shape3"></div>
                </div>

                <div className="container position-relative">
                    <div className="row gy-4">
                        {/* Company Info Section */}
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-widget">
                                {/* <a className="navbar-brand" href="/">
                                    Angel Services
                                </a> */}
                                <div className="ms-auto d-none d-lg-flex align-items-center">
                                    <img
                                        src="/images/angelserviceslogo (2).png"
                                        alt="Angel Services Logo"
                                        style={{ height: '60px', objectFit: 'contain' }}
                                    />
                                </div>
                                <p className="mb-4 pe-lg-3">
                                    Your trusted partner in finance and business solutions
                                </p>

                                <div className="social-links d-flex gap-3 mb-3">
                                    <a
                                        href="https://www.linkedin.com/company/aspl-consultancy-pvt-ltd/?originalSubdomain=in"
                                        className="social-icon"
                                        style={{

                                            color: '#fff',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease',
                                            fontSize: '24px',
                                            color: '#0A66C2'
                                        }}
                                    >
                                        <i className="bi bi-linkedin" ></i>
                                    </a>
                                    <a
                                        href="https://x.com/AngelServices13"
                                        className="social-icon"
                                        style={{

                                            color: '#fff',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease',
                                            fontSize: '24px', color: '#000000'
                                        }}
                                    >
                                        <i className="bi bi-twitter-x" ></i>
                                    </a>
                                    <a
                                        href="https://www.facebook.com/urbizsupport/"
                                        className="social-icon"
                                        style={{

                                            color: '#fff',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease',
                                            fontSize: '24px', color: '#1877F2'
                                        }}
                                    >
                                        <i className="bi bi-facebook" ></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-2 col-md-6">
                            <div className="footer-widget">
                                <h4
                                    className="widget-title position-relative mb-4"
                                    style={{
                                        fontWeight: '600',
                                        color: '#333',
                                    }}
                                >
                                    Quick Links
                                    <span
                                        className="title-line"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-10px',
                                            left: '0',
                                            width: '40px',
                                            height: '3px',
                                            backgroundColor: 'var(--primary-color)',
                                        }}
                                    ></span>
                                </h4>
                                <ul className="footer-links list-unstyled">
                                    <li className="mb-2">
                                        <a
                                            href="/about"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="/services"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Services
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="/resources"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Resources
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="/contact"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Contact
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://asplconsultancy.com/angel"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Global
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="col-lg-2 col-md-6">
                            <div className="footer-widget">
                                <h4
                                    className="widget-title position-relative mb-4"
                                    style={{
                                        fontWeight: '600',
                                        color: '#333',
                                    }}
                                >
                                    Services
                                    <span
                                        className="title-line"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-10px',
                                            left: '0',
                                            width: '40px',
                                            height: '3px',
                                            backgroundColor: 'var(--primary-color)',
                                        }}
                                    ></span>
                                </h4>
                                <ul className="footer-links list-unstyled">
                                    <li className="mb-2">
                                        <a
                                            href="/services/incorporation"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Incorporation
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="/services"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Company Secretary
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="/services"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Acounting
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="/nri-tax-return"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Tax Advisory
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="/services"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Legacy Planning
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="/services"
                                            className="footer-link d-block py-1"
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Fund Administration
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-widget">
                                <h4
                                    className="widget-title position-relative mb-4"
                                    style={{
                                        fontWeight: '600',
                                        color: '#333',
                                    }}
                                >
                                    Contact Us
                                    <span
                                        className="title-line"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-10px',
                                            left: '0',
                                            width: '40px',
                                            height: '3px',
                                            backgroundColor: 'var(--primary-color)',
                                        }}
                                    ></span>
                                </h4>
                                <div className="contact-info">
                                    <div className="contact-item d-flex mb-3">
                                        <div
                                            className="icon me-3"
                                            style={{
                                                color: 'var(--primary-color)',
                                                fontSize: '20px',
                                            }}
                                        >
                                            <i className="bi bi-geo-alt-fill"></i>
                                        </div>
                                        <div className="content">
                                            <h6
                                                className="mb-1"
                                                style={{
                                                    fontWeight: '600',
                                                    color: '#333',
                                                    fontSize: '15px',
                                                }}
                                            >
                                                Global Headquarter
                                            </h6>
                                            <p
                                                className="mb-0"
                                                style={{
                                                    color: '#444',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                101 Cecil Street, #14-05 Tong Eng Building, Singapore 069533
                                            </p>
                                        </div>
                                    </div>
                                    {/* Other contact items can be placed here following the same structure */}
                                    <div className="contact-item d-flex mb-3">
                                        <div className="icon me-3" style={{ color: 'var(--primary-color)', fontSize: '20px' }}>
                                            <i className="bi bi-geo-alt-fill"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="mb-1" style={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>India Corporate Office</h6>
                                            <p className="mb-0" style={{ color: '#444', fontSize: '14px' }}>316, 3rd Floor, Ocean Plaza, Sector 18, Noida, U.P., India 201301</p>
                                        </div>
                                    </div>

                                    <div className="contact-item d-flex mb-3">
                                        <div className="icon me-3" style={{ color: 'var(--primary-color)', fontSize: '20px' }}>
                                            <i className="bi bi-geo-alt-fill"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="mb-1" style={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>Administrative Office</h6>
                                            <p className="mb-0" style={{ color: '#444', fontSize: '14px' }}>10, Shree Nath Ji Complex, Madia Katra Crossing, Agra, U.P., India 282004.</p>
                                        </div>
                                    </div>

                                    <div className="contact-item d-flex mb-3">
                                        <div className="icon me-3" style={{ color: 'var(--primary-color)', fontSize: '20px' }}>
                                            <i className="bi bi-envelope-fill"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="mb-1" style={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>Email Us</h6>
                                            <a href="mailto:contact@asplconsultancy.com" style={{ color: '#444', textDecoration: 'none', fontSize: '14px' }}>contact@theangelservices.com</a>
                                        </div>
                                    </div>

                                    <div className="contact-item d-flex">
                                        <div className="icon me-3" style={{ color: 'var(--primary-color)', fontSize: '20px' }}>
                                            <i className="bi bi-telephone-fill"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="mb-1" style={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>Call Us</h6>
                                            <a href="tel:+91-9259049836" style={{ color: '#444', textDecoration: 'none', fontSize: '14px' }}>+65-82002370</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div
                className="footer-bottom py-3"
                style={{
                    backgroundColor: 'var(--primary-color)',
                }}
            >
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-6">
                            <p
                                className="copyright mb-md-0 text-center text-md-start"
                                style={{
                                    color: '#000',
                                    fontSize: '14px',
                                }}
                            >
                                &copy; 2025 Angel Services pte. ltd. , All rights reserved.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <div className="footer-links text-center text-md-end">
                                <a
                                    href="/privacy"
                                    className="footer-link1 text-white px-2"
                                    style={{
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                    }}
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="/terms"
                                    className="footer-link1 text-white px-2"
                                    style={{
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                    }}
                                >
                                    Terms & Conditions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .footer-link {
          color: #444;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .footer-link1 {
          color: #444;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: var(--primary-color) !important;
          transform: translateX(5px);
        }

        .social-icon {
         
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-5px);
        }

        .footer-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .footer-shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(252, 185, 0, 0.1);
        }

        .shape1 {
          width: 200px;
          height: 200px;
          top: -100px;
          right: 10%;
        }

        .shape2 {
          width: 150px;
          height: 150px;
          bottom: -50px;
          left: 20%;
        }

        .shape3 {
          width: 100px;
          height: 100px;
          top: 30%;
          left: 10%;
          opacity: 0.5;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
