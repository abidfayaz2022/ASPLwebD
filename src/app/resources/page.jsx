'use client';
import Link from 'next/link';
import Image from 'next/image';


import React from 'react';

const Resources = () => {
    return (<>
        <section
            style={{
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background */}
            <div
                style={{
                    background: `linear-gradient(135deg, rgba(254,254,254,0.85), rgba(230,170,0,0.95)), url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center/cover`,
                    height: '500px',
                    width: '100%',
                }}
            />

            {/* Decorative Elements (Optional, needs extra styling if you want them to show) */}
            <div
                className="d-none d-md-block"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                }}
            >
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>

            {/* Main Content */}
            <div
                className="container"
                style={{
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <div
                    className="row min-vh-50 align-items-center py-5"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '50vh',
                        paddingTop: '3rem',
                        paddingBottom: '3rem',
                    }}
                >
                    {/* Text Content */}
                    <div className="col-lg-7 text-black" style={{ color: '#000' }}>
                        <div className="animate__animated animate__fadeInLeft">
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                Financial & Business Resources
                            </h1>
                            <div
                                className="accent-line mb-4"
                                style={{
                                    width: '60px',
                                    height: '4px',
                                    backgroundColor: '#e6aa00',
                                    marginBottom: '1.5rem',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                Expert tools and resources specifically designed for NRIs and global entrepreneurs
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    marginTop: '2rem',
                                }}
                            >
                                <a
                                    href="#calculator_section"
                                    style={{
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        padding: '0.75rem 2rem',
                                        borderRadius: '999px',
                                        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <i className="bi bi-calculator" style={{ marginRight: '0.5rem' }}></i>
                                    NRI Tax Calculator
                                </a>
                                <a
                                    href="#filing_section"
                                    style={{
                                        backgroundColor: '#e6aa00',
                                        color: '#fff',
                                        padding: '0.75rem 2rem',
                                        borderRadius: '999px',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <i className="bi bi-file-earmark-text" style={{ marginRight: '0.5rem' }}></i>
                                    Tax Filing
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card */}
                    <div className="col-lg-5 d-none d-lg-block">
                        <div className="floating-image animate__animated animate__fadeInRight">
                            <div
                                style={{
                                    backgroundColor: '#fff',
                                    padding: '2rem',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 1rem 3rem rgba(0,0,0,0.1)',
                                    color: '#000',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    <h4 style={{ fontWeight: 'bold', marginBottom: 0 }}>NRI Tax Benefits</h4>
                                    <div
                                        style={{
                                            backgroundColor: '#e6aa00',
                                            color: '#fff',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '999px',
                                            fontSize: '0.875rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        FY 2025-26
                                    </div>
                                </div>

                                {/* Stat Items */}
                                {[
                                    {
                                        icon: 'bi-bank',
                                        title: 'NRE Account Interest',
                                        description: 'Tax Exempt',
                                    },
                                    {
                                        icon: 'bi-currency-exchange',
                                        title: 'FCNR Deposits',
                                        description: 'Tax Exempt',
                                    },
                                    {
                                        icon: 'bi-globe',
                                        title: 'Foreign Income',
                                        description: 'Not Taxable in India',
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: idx < 2 ? '1rem' : 0,
                                        }}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: '#f8f9fa',
                                                padding: '0.5rem',
                                                borderRadius: '50%',
                                                marginRight: '1rem',
                                            }}
                                        >
                                            <i
                                                className={`bi ${item.icon}`}
                                                style={{
                                                    fontSize: '1.5rem',
                                                    color: '#e6aa00',
                                                }}
                                            ></i>
                                        </div>
                                        <div>
                                            <h6 style={{ marginBottom: '0.25rem', color: '#343a40' }}>{item.title}</h6>
                                            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 0, color: 'green' }}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            id="calculator_section"
            style={{
                padding: '3rem 0',
                backgroundColor: '#f8f9fa', // Bootstrap bg-light
            }}
        >
            <div className="container">
                <div
                    className="row g-4 align-items-center"
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        alignItems: 'center',
                    }}
                >
                    {/* Image Section */}
                    <div
                        className="col-lg-6 order-lg-2"
                        style={{
                            order: 2,
                            flex: '0 0 auto',
                            width: '50%',
                        }}
                    >
                        <div className="resource-image" style={{ position: 'relative' }}>
                            {/* If your image is in public/images/tax_calc.jpg, you can access it like /images/tax_calc.jpg */}
                            <Image
                                src="/images/tax_calc.jpg"
                                alt="NRI Tax Calculator"
                                width={600}
                                height={400}
                                className="img-fluid rounded-4 shadow-lg"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 1rem 3rem rgba(0,0,0,0.15)',
                                }}
                            />
                            <div
                                className="resource-badge"
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                }}
                            >
                                <span
                                    style={{
                                        backgroundColor: '#e6aa00',
                                        color: '#fff',
                                        borderRadius: '999px',
                                        padding: '0.5rem 1rem',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Popular Tool
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div
                        className="col-lg-6 order-lg-1"
                        style={{
                            order: 1,
                            flex: '0 0 auto',
                            width: '50%',
                        }}
                    >
                        <div style={{ paddingRight: '2rem' }}>
                            <div className="section-tag mb-2">
                                <span
                                    style={{
                                        backgroundColor: '#e6aa00',
                                        color: '#fff',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '999px',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    FREE TOOL
                                </span>
                            </div>
                            <h2
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                NRI Tax Calculator
                            </h2>
                            <div
                                className="accent-underline"
                                style={{
                                    width: '60px',
                                    height: '4px',
                                    backgroundColor: '#e6aa00',
                                    marginBottom: '1.5rem',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                Calculate your estimated tax liability for FY 2025-26 (AY 2026-27) with our comprehensive tax calculator designed specifically for Non-Resident Indians.
                            </p>

                            {/* Benefits List */}
                            <div className="benefits-list" style={{ marginBottom: '1.5rem' }}>
                                {[
                                    {
                                        title: 'Accurate Tax Estimation',
                                        desc: 'Based on latest NRI tax slabs and regulations',
                                    },
                                    {
                                        title: 'Instant Results',
                                        desc: 'Detailed breakdown of your tax liability',
                                    },
                                    {
                                        title: 'Smart Recommendations',
                                        desc: 'Personalized tax saving suggestions',
                                    },
                                ].map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="benefit-item"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'start',
                                            marginBottom: index < 2 ? '1rem' : 0,
                                        }}
                                    >
                                        <div className="benefit-icon" style={{ marginRight: '1rem' }}>
                                            <i className="bi bi-check-circle-fill" style={{ color: '#0d6efd', fontSize: '1.5rem' }}></i>
                                        </div>
                                        <div>
                                            <h5 style={{ marginBottom: '0.25rem' }}>{benefit.title}</h5>
                                            <p style={{ color: '#6c757d', marginBottom: 0 }}>{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <Link href="/tax alculator" // change this if needed
                                className="btn btn-orange btn-lg px-4 shadow-sm"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    backgroundColor: '#e6aa00',
                                    color: '#fff',
                                    fontSize: '1.125rem',
                                    padding: '0.75rem 2rem',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                <i className="bi bi-calculator" style={{ marginRight: '0.5rem' }}></i> Use Tax Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="filing_section" style={{ padding: '5rem 0', backgroundColor: 'white' }}>
            <div className="container">
                <div className="row g-4 align-items-center">

                    <div className="col-lg-6">
                        <div style={{ position: 'relative' }}>
                            <Image src="/images/nri_tax_return.jpg"  // Make sure the file extension is correct (e.g., .jpg, .png)
                                alt="NRI Tax Return"
                                width={500}  // Specify the width in pixels
                                height={300} alt="NRI Tax Return Filing" className="img-fluid rounded-4 shadow-lg" />
                            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                                <span className="badge badge-orange rounded-pill px-3 py-2 fs-6">Step-by-Step</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div style={{ paddingLeft: '2rem' }}>
                            <div className="section-tag mb-2">
                                <span className="badge badge-orange px-3 py-2">EXPERT SERVICE</span>
                            </div>
                            <h2 className="display-6 fw-bold mb-4">NRI Tax Return Filing</h2>
                            <div className="accent-underline mb-4"></div>
                            <p className="lead mb-4">
                                A guided step-by-step process for filing your Indian tax returns as an NRI, with expert support at every stage.
                            </p>

                            {/* Steps */}
                            {[
                                { step: 1, title: 'Basic Information', desc: 'Complete your personal and residency details' },
                                { step: 2, title: 'Income & Deductions', desc: 'Enter your income sources and applicable deductions' },
                                { step: 3, title: 'Review & Submit', desc: 'Our experts handle the filing process' }
                            ].map(({ step, title, desc }) => (
                                <div className="d-flex mb-3" key={step}>
                                    <div style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>{step}</div>
                                    <div>
                                        <h5 className="mb-1">{title}</h5>
                                        <p className="text-muted mb-0">{desc}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Button */}
                            <Link href="/nri_tax_return" className="btn btn-orange btn-lg px-4 shadow-sm" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <i className="bi bi-file-earmark-text me-2"></i> Start Tax Filing
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section className="py-5 bg-light">
            <div className="container">
                <div className="row justify-content-center text-center mb-5">
                    <div className="col-lg-8">
                        <h2 className="display-6 fw-bold mb-3">More Resources Coming Soon</h2>
                        <div className="accent-center-underline mb-4 mx-auto"></div>
                        <p className="lead">
                            We're constantly developing new tools and resources to help you manage your global financial needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        (
        <section className="cta-section py-5 bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div
                            className="cta-card p-5 rounded-4 shadow text-white position-relative overflow-hidden"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        >
                            {/* Decorative elements */}
                            <div className="cta-shapes">
                                <div className="shape shape-1"></div>
                                <div className="shape shape-2"></div>
                                <div className="shape shape-3"></div>
                            </div>

                            <div className="row align-items-center position-relative">
                                <div className="col-lg-7">
                                    <h2 className="display-6 fw-bold mb-3">Need Personalized Assistance?</h2>
                                    <p className="lead mb-4">
                                        Our team of global tax and incorporation experts is ready to help you navigate the complexities of
                                        international business and finance.
                                    </p>
                                    <div className="d-flex flex-wrap gap-3">
                                        <a href="/contact" className="btn btn-light btn-lg px-4 shadow-sm">
                                            <i className="bi bi-chat-dots me-2"></i> Contact Our Experts
                                        </a>
                                        <a href="/about" className="btn btn-outline-light btn-lg px-4">
                                            <i className="bi bi-info-circle me-2"></i> About Our Team
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-5 mt-4 mt-lg-0">
                                    <div className="contact-card bg-white p-4 rounded-4 shadow-sm text-dark">
                                        <h4 style={{ color: 'var(--primary-color)' }} className="mb-3">
                                            Quick Connect
                                        </h4>
                                        <div className="contact-item d-flex align-items-center mb-3">
                                            <div className="contact-icon me-3">
                                                <i className="bi bi-envelope" style={{ color: 'var(--primary-color)' }}></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Email Us</h6>
                                                <a href="mailto:contact@asplconsultancy.com" className="text-dark text-decoration-none">
                                                    contact@asplconsultancy.com
                                                </a>
                                            </div>
                                        </div>
                                        <div className="contact-item d-flex align-items-center mb-3">
                                            <div className="contact-icon me-3">
                                                <i className="bi bi-telephone" style={{ color: 'var(--primary-color)' }}></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Call Us</h6>
                                                <a href="tel:+91-9259049836" className="text-dark text-decoration-none">
                                                    +91-9259049836
                                                </a>
                                            </div>
                                        </div>
                                        <div className="contact-item d-flex align-items-center">
                                            <div className="contact-icon me-3">
                                                <i className="bi bi-whatsapp" style={{ color: 'var(--primary-color)' }}></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">WhatsApp</h6>
                                                <a href="https://wa.me/919259049836" className="text-dark text-decoration-none">
                                                    Message us on WhatsApp
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    </>



    );
};

export default Resources;
