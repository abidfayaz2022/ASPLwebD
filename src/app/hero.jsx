// components/HeroSection.js
"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection() {
    const slidesCount = 2
    const slideTime = 2000

    const [currentSlide, setCurrentSlide] = useState(0)
    const [paused, setPaused] = useState(false)

    const nextSlide = () =>
        setCurrentSlide((prev) => (prev + 1) % slidesCount)
    const prevSlide = () =>
        setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount)

    useEffect(() => {
        if (!paused) {
            const id = setInterval(nextSlide, slideTime)
            return () => clearInterval(id)
        }
    }, [paused])

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
                    <div className="col-lg-6 col-xl-5 mb-5 mb-lg-0">
                        <div
                            className="hero-content p-4 rounded-3"
                            style={{
                                backdropFilter: 'blur(5px)',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                            }}
                        >
                            <h1
                                className="display-4 fw-bold mb-6"
                                style={{ fontSize: '3.5rem', color: 'var(--text-dark)' }}
                            >
                                ASPL Consultancy
                            </h1>
                            <p className="lead mb-4" style={{ color: 'var(--text-dark)' }}>
                                Your trusted partner in finance and business solutions
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <Link href="/contact" className="cta-primary">
                                    Get Started <i className="bi bi-arrow-right ms-2" />
                                </Link>
                                <Link href="/services" className="cta-secondary">
                                    Explore Services
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 d-flex justify-content-center align-items-center">
                        <div
                            className="services-slider-container"
                            style={{
                                width: '100%',
                                maxWidth: '480px',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                                marginLeft: '130px',
                            }}
                        >
                            <div className="slider-controls">
                                <button
                                    className="slider-arrow prev-arrow"
                                    onClick={() => {
                                        prevSlide()
                                        setPaused(true)
                                    }}
                                    aria-label="Previous slide"
                                >
                                    <i className="bi bi-chevron-left" />
                                </button>
                                <button
                                    className="slider-arrow next-arrow"
                                    onClick={() => {
                                        nextSlide()
                                        setPaused(true)
                                    }}
                                    aria-label="Next slide"
                                >
                                    <i className="bi bi-chevron-right" />
                                </button>
                            </div>

                            <div
                                className="services-slider"
                                style={{ height: '340px', position: 'relative' }}
                                onMouseEnter={() => setPaused(true)}
                                onMouseLeave={() => setPaused(false)}
                            >
                                {[0, 1].map((idx) => (
                                    <Link
                                        key={idx}
                                        href={idx === 0 ? '/nri_tax_return' : '/services_incorporation'}
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
                                        <div
                                            className="card bg-white shadow-lg h-100"
                                            style={{ borderRadius: '15px', border: 'none' }}
                                        >
                                            <div
                                                className="card-header bg-primary text-center py-3"
                                                style={{
                                                    borderRadius: '15px 15px 0 0',
                                                    border: 'none',
                                                }}
                                            >
                                                <h5
                                                    className="card-title mb-0 fw-bold"
                                                    style={{ color: 'var(--text-dark)' }}
                                                >
                                                    {idx === 0 ? 'NRI Tax Services' : 'Incorporation Services'}
                                                </h5>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="text-center mb-3">
                                                    {idx === 0 ? (
                                                        <div
                                                            className="india-flag rounded-circle shadow-sm d-inline-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: '60px',
                                                                height: '60px',
                                                                backgroundColor: '#f8f9fa',
                                                                padding: '5px',
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: `
                              <svg width="40" height="30" viewBox="0 0 900 600">
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
                              </svg>`}}
                                                        />
                                                    ) : (
                                                        <div
                                                            className="globe-icon rounded-circle shadow-sm d-inline-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: '60px',
                                                                height: '60px',
                                                                backgroundColor: '#f8f9fa',
                                                                padding: '5px',
                                                            }}
                                                        >
                                                            <i
                                                                className="bi bi-globe2"
                                                                style={{ fontSize: '2rem', color: 'var(--primary-color)' }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <h6 className="mb-3 text-center" style={{ color: 'var(--text-dark)' }}>
                                                    {idx === 0
                                                        ? 'Income Tax Filing for Non-Resident Indians'
                                                        : 'Global Business Setup & Formation'}
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
                                                        {idx === 0 ? 'File Now' : 'Learn More'}{' '}
                                                        <i className="bi bi-arrow-right ms-1" />
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
                                            setCurrentSlide(i)
                                            setPaused(true)
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        /* CSS Variables */
        :root {
          --text-dark: #333;
          --primary-color: #f7c600;
          --transition-speed: 0.3s;
          --border-radius-lg: 1rem;
        }

        /* Custom Styles for Homepage */
        .service-card h4,
        .service-card p,
        .service-card span,
        .featured-service-card h5,
        .featured-service-card h6,
        .featured-service-card span,
        .featured-service-card li span {
          color: var(--text-dark) !important;
        }

        .service-icon i,
        .featured-service-card .bi {
          color: var(--primary-color) !important;
        }

        .service-card .bi-check-circle-fill {
          color: var(--primary-color) !important;
        }

        /* Arrow Fixes */
        .services-slider-container {
          position: relative;
        }

        .slider-controls {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9;
          pointer-events: none;
        }

        .slider-arrow {
          pointer-events: auto;
          background: transparent;
          border: none;
        }

        .slider-arrow i {
          font-size: 1.5rem;
          color: var(--text-dark) !important;
        }

        /* Button Fix */
        .card-body {
          padding-bottom: 2.5rem;
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

        /* Other Styling */
        .review-stack {
          position: relative;
        }

        .review-box {
          max-width: 90%;
        }

        .object-fit-cover {
          object-fit: cover;
        }

        .tools-section .badge {
          font-size: 0.8rem;
        }

        .service-card {
          transition: all var(--transition-speed) ease;
          position: relative;
          background-color: white;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          height: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .service-card .btn {
          opacity: 0.9;
          transition: all var(--transition-speed) ease;
        }

        .service-card:hover .btn {
          opacity: 1;
          transform: translateY(-3px);
        }

        /* Remove text underline inside featured slider cards */
        .featured-service-card,
        .featured-service-card *,
        .featured-service-card h5,
        .featured-service-card h6,
        .featured-service-card span,
        .featured-service-card li,
        .featured-service-card a {
          text-decoration: none !important;
        }

        @media (max-width: 992px) {
          .review-box {
            max-width: 100%;
          }

          .service-card {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
        </section>
    )
}
