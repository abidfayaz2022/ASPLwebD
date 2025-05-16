"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FinalHero() {
    const slidesCount = 2;
    const slideTime = 2000;

    const [currentSlide, setCurrentSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

    useEffect(() => {
        if (!paused) {
            const id = setInterval(nextSlide, slideTime);
            return () => clearInterval(id);
        }
    }, [paused]);

    return (
        <section className="incorporation-hero position-relative d-flex align-items-center overflow-hidden">
            {/* Background Elements */}
            <div className="diagonal-bg" />
            <div className="incorporation-bg" />
            <div className="incorporation-pattern" />
            <div className="incorporation-shape shape1" />
            <div className="incorporation-shape shape2" />
            <div className="incorporation-shape shape3" />

            <div className="container position-relative" style={{ zIndex: 1 }}>
                <div className="row min-vh-75 align-items-center py-4">
                    {/* Left Content Section from IncorporationHero */}
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="incorporation-content">
                            <div className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill">
                                <i className="bi bi-star-fill me-2"></i>
                                Most Popular Service
                            </div>
                            <h1 className="display-3 fw-bold mb-4 text-gradient">
                                Launch Your Business
                                <span className="d-block text-primary">With Confidence</span>
                            </h1>
                            <p className="lead mb-4 text-muted">
                                Start your entrepreneurial journey with our expert guidance.
                                We handle the complex paperwork while you focus on your vision.
                            </p>
                            <div className="d-flex flex-wrap gap-3 mb-5">
                                <Link
                                    href="/incorporation/step1"
                                    className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-semibold"
                                >
                                    Start Now <i className="bi bi-arrow-right ms-2" />
                                </Link>
                                <Link
                                    href="/services/incorporation"
                                    className="btn btn-outline-dark btn-lg rounded-pill px-5 py-3 fw-semibold"
                                >
                                    Learn More
                                </Link>
                            </div>
                            <div className="incorporation-stats d-flex gap-4">
                                <div className="stat-item">
                                    <h3 className="fw-bold mb-1">500+</h3>
                                    <p className="text-muted mb-0">Companies Formed</p>
                                </div>
                                <div className="stat-item">
                                    <h3 className="fw-bold mb-1">24/7</h3>
                                    <p className="text-muted mb-0">Expert Support</p>
                                </div>
                                <div className="stat-item">
                                    <h3 className="fw-bold mb-1">15+</h3>
                                    <p className="text-muted mb-0">Countries</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Slider Section from Hero */}
                    <div className="col-lg-6">
                        <div className="services-slider-container">
                            <div
                                className="services-slider"
                                style={{ height: '340px', position: 'relative' }}
                                onMouseEnter={() => setPaused(true)}
                                onMouseLeave={() => setPaused(false)}
                            >
                                {[0, 1].map((idx) => (
                                    <Link
                                        key={idx}
                                        href={idx === 0 ? '/nri-tax-return' : '/services/incorporation'}
                                        className="featured-service-card slide"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: currentSlide === idx ? 1 : 0,
                                            zIndex: currentSlide === idx ? 1 : -1,
                                            transition: 'opacity 0.5s ease',
                                        }}
                                    >
                                        <div className="card bg-white shadow-lg h-100" style={{ borderRadius: '15px', border: 'none' }}>
                                            <div className="card-header bg-primary text-center py-3" style={{ borderRadius: '15px 15px 0 0', border: 'none' }}>
                                                <h5 className="card-title mb-0 fw-bold" style={{ color: 'var(--text-dark)' }}>
                                                    {idx === 0 ? 'NRI Tax Services' : 'Incorporation Services'}
                                                </h5>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="text-center mb-3">
                                                    {idx === 0 ? (
                                                        <div className="india-flag rounded-circle shadow-sm d-inline-flex align-items-center justify-content-center"
                                                            style={{ width: '60px', height: '60px', backgroundColor: '#f8f9fa', padding: '5px' }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: `<svg width="40" height="30" viewBox="0 0 900 600">
                                    <rect fill="#f93" width="900" height="200"/>
                                    <rect fill="#fff" y="200" width="900" height="200"/>
                                    <rect fill="#128807" y="400" width="900" height="200"/>
                                    <circle fill="#008" cx="450" cy="300" r="90"/>
                                    <circle fill="#fff" cx="450" cy="300" r="70"/>
                                    <circle fill="#008" cx="450" cy="300" r="20"/>
                                    <g id="spokes">
                                        <g id="spoke"><rect width="2" height="20" x="449" y="230" fill="#008"/></g>
                                        ${[...Array(24)].map((_, i) => `<use href="#spoke" transform="rotate(${15 * i},450,300)"/>`).join('')}
                                    </g>
                                </svg>`
                                                            }} />
                                                    ) : (
                                                        <div className="globe-icon rounded-circle shadow-sm d-inline-flex align-items-center justify-content-center"
                                                            style={{ width: '60px', height: '60px', backgroundColor: '#f8f9fa', padding: '5px' }}>
                                                            <i className="bi bi-globe2" style={{ fontSize: '2rem', color: '#0d6efd' }} />
                                                        </div>
                                                    )}
                                                </div>
                                                <h6 className="mb-3 text-center" style={{ color: 'var(--text-dark)' }}>
                                                    {idx === 0 ? 'Income Tax Filing for Non-Resident Indians' : 'Global Business Setup & Formation'}
                                                </h6>
                                                <ul className="list-unstyled mb-3">
                                                    {(idx === 0
                                                        ? ['Expert assisted tax filing', 'Get quick refund of tax deducted', 'Be compliant, avoid penalties']
                                                        : ['Multiple Jurisdictions', 'End-to-End Support', 'Quick Turnaround Time']
                                                    ).map((li) => (
                                                        <li key={li} className="mb-2 d-flex align-items-center">
                                                            <i className="bi bi-check-circle-fill text-primary me-2" />
                                                            <span style={{ color: 'var(--text-dark)' }}>{li}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="text-center mt-3">
                                                    <span className="btn btn-orange rounded-pill px-4">
                                                        {idx === 0 ? 'File Now' : 'Learn More'} <i className="bi bi-arrow-right ms-1" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="slider-indicators mt-3">
                                {[0, 1].map((i) => (
                                    <span
                                        key={i}
                                        className={`indicator ${i === currentSlide ? 'active' : ''}`}
                                        onClick={() => {
                                            setCurrentSlide(i);
                                            setPaused(true);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Global link styles */
\
                a, a:hover, a:focus, a:active, a:visited {
                    text-decoration: none !important;
                    outline: none !important;
                    border-bottom: none !important;
                    color: inherit !important;
                }

                /* Specific styles for featured service card */
                .featured-service-card,
                .featured-service-card *,
                .featured-service-card a,
                .featured-service-card a:visited,
                .featured-service-card a:active,
                .featured-service-card a:focus,
                .featured-service-card a:hover {
                    text-decoration: none !important;
                    border-bottom: none !important;
                    color: inherit !important;
                }

                .incorporation-hero {
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    min-height: 75vh;
                    padding: 1rem 0;
                    position: relative;
                    overflow: hidden;
                }

                .incorporation-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        linear-gradient(120deg, rgba(13, 110, 253, 0.05) 0%, transparent 50%),
                        linear-gradient(60deg, rgba(255, 193, 7, 0.05) 0%, transparent 50%);
                    z-index: 0;
                }

                .incorporation-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230d6efd' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E"),
                        url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffc107' fill-opacity='0.03'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    opacity: 0.5;
                    z-index: 0;
                }

                .incorporation-shape {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.05;
                    filter: blur(40px);
                }

                .incorporation-shape.shape1 {
                    width: 600px;
                    height: 600px;
                    background: var(--primary-color);
                    top: -300px;
                    right: -200px;
                }

                .incorporation-shape.shape2 {
                    width: 400px;
                    height: 400px;
                    background: var(--warning-color);
                    bottom: -200px;
                    left: -100px;
                }

                .incorporation-shape.shape3 {
                    width: 300px;
                    height: 300px;
                    background: var(--success-color);
                    top: 50%;
                    right: 10%;
                }

                .text-gradient {
                    background: linear-gradient(45deg, #212529 0%, #495057 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .incorporation-content {
                    max-width: 600px;
                    padding: 1rem 0;
                }

                .incorporation-stats {
                    border-top: 1px solid rgba(0,0,0,0.1);
                    padding-top: 1.5rem;
                    margin-top: 1rem;
                }

                .stat-item h3 {
                    color: var(--primary-color);
                }

                .services-slider-container {
                    position: relative;
                    width: 100%;
                    max-width: 480px;
                    margin-left: auto;
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                }

                .slider-indicators {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .indicator.active {
                    background-color: var(--primary-color);
                    transform: scale(1.2);
                }

                .btn-orange {
                    background-color: var(--primary-color);
                    color: #000;
                    border: none;
                    border-radius: 30px;
                    transition: var(--transition-speed) ease;
                    padding: 0.6rem 1.5rem;
                    font-size: 1rem;
                    line-height: 1.5;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-orange:hover {
                    background-color: #e6b800;
                }

                .btn-orange i {
                    color: #000 !important;
                }

                @media (max-width: 991.98px) {
                    .incorporation-hero {
                        min-height: 75vh;
                        padding: 1rem 0;
                    }

                    .row.min-vh-75 {
                        min-height: 75vh;
                        padding: 0.5rem 0;
                    }

                    .incorporation-content {
                        text-align: center;
                        margin: 0 auto;
                        padding: 1rem 0;
                    }

                    .incorporation-stats {
                        justify-content: center;
                        margin-top: 1rem;
                    }

                    .services-slider-container {
                        margin: 2rem auto 0 auto;
                    }
                }

                @media (max-width: 767.98px) {
                    .incorporation-hero {
                        padding: 1.5rem 0;
                    }

                    .display-3 {
                        font-size: 2rem;
                    }

                    .incorporation-stats {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: center;
                        padding-top: 1rem;
                    }

                    .btn-lg {
                        padding: 0.5rem 1.5rem;
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
} 