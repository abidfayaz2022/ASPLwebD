"use client";
import Link from 'next/link';

export default function IncorporationHero() {
    return (
        <section className="incorporation-hero position-relative d-flex align-items-center overflow-hidden">
            {/* Background Elements */}
            <div className="incorporation-bg" />
            <div className="incorporation-pattern" />
            <div className="incorporation-shape shape1" />
            <div className="incorporation-shape shape2" />
            <div className="incorporation-shape shape3" />

            <div className="container position-relative" style={{ zIndex: 1 }}>
                <div className="row min-vh-75 align-items-center py-5">
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

                    <div className="col-lg-6">
                        <div className="incorporation-features">
                            <div className="feature-card main-card bg-white shadow-lg rounded-4 p-4 mb-3">
                                <div className="card-header bg-transparent border-0 p-0 mb-4">
                                    <div className="d-flex align-items-center">
                                        <div className="feature-icon-wrapper me-3">
                                            <div className="feature-icon bg-primary bg-opacity-10 rounded-circle p-3">
                                                <i className="bi bi-globe2" style={{ color: '#212529', fontSize: '2.5rem' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="mb-1">Global Business Setup</h3>
                                            <p className="text-muted mb-0 small">Your Gateway to International Markets</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="features-grid">
                                        {[
                                            {
                                                icon: 'bi-building',
                                                title: 'Multiple Jurisdictions',
                                                description: 'Choose from 15+ countries for incorporation'
                                            },
                                            {
                                                icon: 'bi-check-circle',
                                                title: 'End-to-End Support',
                                                description: 'Complete assistance throughout the process'
                                            },
                                            {
                                                icon: 'bi-lightning',
                                                title: 'Quick Turnaround',
                                                description: 'Fast processing and documentation'
                                            },
                                            {
                                                icon: 'bi-shield-check',
                                                title: 'Legal Compliance',
                                                description: '100% compliant with local regulations'
                                            },
                                            {
                                                icon: 'bi-gear',
                                                title: 'Post-Setup Services',
                                                description: 'Ongoing support after incorporation'
                                            }
                                        ].map((feature, index) => (
                                            <div key={index} className="feature-item">
                                                <div className="feature-item-icon">
                                                    <i className={`bi ${feature.icon} text-primary`} />
                                                </div>
                                                <div className="feature-item-content">
                                                    <h6 className="mb-1">{feature.title}</h6>
                                                    <p className="small text-muted mb-0">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="feature-cards-wrapper d-flex gap-3">
                                <div className="feature-card bg-white shadow-sm rounded-4 p-3 flex-grow-1">
                                    <i className="bi bi-clock-history text-primary mb-2" style={{ fontSize: '1.5rem' }} />
                                    <h5 className="mb-2">Quick Process</h5>
                                    <p className="small text-muted mb-0">Get incorporated in as little as 7 days</p>
                                </div>
                                <div className="feature-card bg-white shadow-sm rounded-4 p-3 flex-grow-1">
                                    <i className="bi bi-shield-check text-primary mb-2" style={{ fontSize: '1.5rem' }} />
                                    <h5 className="mb-2">100% Compliant</h5>
                                    <p className="small text-muted mb-0">Full legal compliance guaranteed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .incorporation-hero {
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    min-height: 100vh;
                    padding: 2rem 0;
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

                .feature-card {
                    transition: all 0.3s ease;
                    margin-bottom: 1rem;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                }

                .main-card {
                    border: 1px solid rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                }

                .main-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
                }

                .feature-icon-wrapper {
                    position: relative;
                    color: white;
                }

                .feature-icon-wrapper::after {
                    content: '';
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                    background: var(--primary-color);
                    opacity: 0.1;
                    border-radius: 50%;
                    z-index: -1;
                    transform: scale(1);
                    transition: transform 0.3s ease;
                }

                .feature-icon-wrapper:hover::after {
                    transform: scale(1.1);
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }

                .feature-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    background: rgba(13, 110, 253, 0.03);
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                }

                .feature-item:hover {
                    background: rgba(13, 110, 253, 0.06);
                    transform: translateX(5px);
                }

                .feature-item-icon {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }

                .feature-item-content {
                    flex: 1;
                }

                .feature-item h6 {
                    color: var(--primary-color);
                    font-weight: 600;
                }

                .row.min-vh-75 {
                    min-height: calc(100vh - 4rem);
                    padding: 1rem 0;
                }

                @media (max-width: 991.98px) {
                    .incorporation-hero {
                        min-height: auto;
                        padding: 2rem 0;
                    }

                    .row.min-vh-75 {
                        min-height: auto;
                        padding: 1rem 0;
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

                    .feature-cards-wrapper {
                        flex-direction: column;
                    }

                    .features-grid {
                        grid-template-columns: 1fr;
                        gap: 0.75rem;
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

                    .feature-item {
                        padding: 0.5rem;
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