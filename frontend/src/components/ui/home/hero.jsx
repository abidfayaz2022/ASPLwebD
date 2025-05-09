// components/HeroSection.js
"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection() {
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
        <section className="hero-section position-relative d-flex align-items-center overflow-hidden">
            <div className="diagonal-bg" />
            <div className="dot-pattern" />
            <div className="floating-shape shape-circle shape1" />
            <div className="floating-shape shape-polygon shape2" />
            <div className="floating-shape shape-circle shape3" />
            <div className="floating-shape shape-custom shape4" />

            <div
                className="geometric-pattern pattern-dots"
                style={{
                    bottom: '15%',
                    right: '10%',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                }}
            />

            <div className="container position-relative" style={{ zIndex: 1 }}>
                <div className="row min-vh-75 align-items-center py-5">
                    <div className="col-lg-6 col-xl-5 mb-5 mb-lg-0 d-flex flex-column justify-content-center align-items-center text-center">
                        <div
                            className="hero-content p-4 p-md-5 rounded-3 w-100"
                            style={{
                                backgroundColor: '#ffffff',
                                maxWidth: '480px',
                                transform: 'translateX(-4px)'
                            }}
                        >
<h1 className="hero-heading display-4 fw-bold mb-3">
  Angel Services
</h1>


                            <p className="lead mb-4">
                                Your partner for business growth
                            </p>

                            <div className="d-flex flex-wrap justify-content-center gap-3">
                                <Link
                                    href="/contact"
                                    className="btn btn-warning rounded-pill px-4 py-2 fw-semibold"
                                >
                                    Get Started <i className="bi bi-arrow-right ms-2" />
                                </Link>
                                <Link
                                    href="/services"
                                    className="btn btn-dark rounded-pill px-4 py-2 fw-semibold text-white"
                                >
                                    Explore Services
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 d-flex justify-content-center align-items-center">
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
                                                            <i className="bi bi-globe2" style={{ fontSize: '2rem', color: 'var(--primary-color)' }} />
                                                        </div>
                                                    )}
                                                </div>
                                                <h6 className="mb-3 text-center" style={{ color: 'var(--text-dark)' }}>
                                                    {idx === 0 ? 'Income Tax Filing for Non-Resident Indians' : 'Global Business Setup & Formation'}
                                                </h6>
                                                <ul className="list-unstyled mb-3">
                                                    {(idx === 0
                                                        ? ['Expert Tax Filing', 'DTAA Benefits', 'Maximum Tax Savings']
                                                        : ['Multiple Jurisdictions', 'End-to-End Support', 'Tax-Efficient Structures']
                                                    ).map((li) => (
                                                        <li key={li} className="mb-2 d-flex align-items-center">
                                                            <i className="bi bi-check-circle-fill text-success me-2" />
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

.hero-heading {
  font-size: 3.5rem;
  color: #212529;
  line-height: 1.2;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .hero-heading {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .hero-heading {
    font-size: 2rem;
  }
}

                .hero-content p {
                    font-size: 1.125rem;
                    color: #555;
                    margin-bottom: 1.5rem;
                }

                .hero-content .btn {
                    min-width: 160px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }

                .services-slider-container {
                    position: relative;
                    width: 100%;
                    max-width: 480px;
                    margin-left: 130px;
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 992px) {
                    .services-slider-container {
                        margin-left: 0;
                        margin-top: 2rem;
                    }
                }

                @media (max-width: 768px) {
                    .hero-content {
                        padding: 2rem 1rem !important;
                        text-align: center;
                    }

                    .hero-content .d-flex {
                        flex-direction: column;
                        gap: 0.75rem;
                    }

                    .services-slider-container {
                        max-width: 100% !important;
                        margin: 2rem auto 0 auto !important;
                    }
                }

                @media (max-width: 576px) {
                    .hero-content .btn {
                        width: 100%;
                        font-size: 0.95rem;
                    }

                    .slider-arrow i {
                        font-size: 1.2rem !important;
                    }

                    .slider-indicators {
                        gap: 0.5rem;
                    }

                    .indicator {
                        width: 10px;
                        height: 10px;
                    }
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

                .featured-service-card, .featured-service-card * {
                    text-decoration: none !important;
                }
            `}</style>
        </section>
    );
}
