"use client";

import Image from 'next/image';
import Link from 'next/link';

const IncorporationServices = () => {
    return (
        <>
            {/* Hero Section */}
            <section
    className="hero position-relative"
    style={{
        backgroundImage: 'url("/images/incorporation-hero.jpg")', // 👈 Replace with your actual image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
    }}
>

                {/* Animated Background Elements */}
                <div className="animated-bg">
                    <div className="circle-1"></div>
                    <div className="circle-2"></div>
                    <div className="circle-3"></div>
                </div>

                <div className="container position-relative py-5" style={{ zIndex: 2 }}>
                    <div className="row py-5 min-vh-40">
                        <div className="col-lg-8 mx-auto text-center">
                            <h1 className="display-3 fw-bold text-white mb-4 text-shadow">
                                Incorporation Services
                            </h1>
                            <p className="lead text-white mb-5 fs-4 fw-light">
                                Your gateway to global business presence
                            </p>
                            <div className="hero-buttons">
                            <a
  href="#services"
  className="btn btn-yellow btn-lg rounded-pill px-4 py-3 fw-semibold me-2 mb-2 mb-md-0 shadow-sm"
>
  Our Services <i className="bi bi-arrow-down-circle ms-2"></i>
</a>

                                <Link href="/contact" className="btn btn-outline-light btn-lg rounded-pill px-4 py-3 fw-semibold">
                                    Contact Us <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Separator */}
                <div className="wave-separator text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="service-intro py-5 bg-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-10 mx-auto">
                            <div className="card border-0 shadow-lg rounded-4 position-relative overflow-hidden">
                                <div className="card-body p-5">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 text-center text-lg-start mb-4 mb-lg-0">
                                            <div className="intro-icon d-inline-flex">
                                                <i
                                                    className="bi bi-briefcase text-primary"
                                                    style={{ fontSize: '4rem' }}
                                                ></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <h2 className="fw-bold text-dark mb-3">End-to-End Company Formation</h2>
                                            <p className="lead text-dark mb-0">
                                                We specialise in end-to-end company formation services across major jurisdictions including Singapore, UAE, Hong Kong, Indonesia, Vietnam, and key offshore centres such as the British Virgin Islands (BVI) and the Cayman Islands. From pre-incorporation advisory to post-setup support, we help entrepreneurs, investors, and corporates build compliant and strategically structured entities to meet both local and international goals.
                                            </p>
                                        </div>
                                    </div>
                                    {/* Accent Bar */}
                                    <div
                                        className="accent-bar position-absolute bg-primary"
                                        style={{ height: '6px', width: '100%', bottom: 0, left: 0 }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services bg-white py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold text-dark mb-2">Our Incorporation Services</h2>
                        <div className="divider-center mb-4"><span className="bg-primary"></span></div>
                        <p className="lead col-md-8 mx-auto text-dark">Comprehensive support for global company formation</p>
                    </div>

                    <div className="row g-4">
                        {/* Service Cards */}
                        {[
                            {
                                icon: 'bi-building',
                                title: 'Entity Incorporation',
                                description: 'Incorporation of Private Limited Companies, LLCs, Branches, and Representative Offices',
                                features: ['Private Limited Companies', 'LLCs', 'Branches', 'Representative Offices']
                            },
                            {
                                icon: 'bi-globe2',
                                title: 'Jurisdiction Analysis',
                                description: 'Jurisdiction analysis and entity type recommendation based on business objectives',
                                features: ['Jurisdiction analysis', 'Entity type recommendation', 'Business objectives alignment']
                            },
                            {
                                icon: 'bi-diagram-3',
                                title: 'Legal Structure Advisory',
                                description: 'Advisory on legal structure, shareholding, and directorship setup',
                                features: ['Legal structure', 'Shareholding', 'Directorship setup']
                            },
                            {
                                icon: 'bi-file-earmark-medical',
                                title: 'Documentation Support',
                                description: 'End-to-end documentation support, including MOA/AOA drafting, registration forms, and statutory filings',
                                features: ['MOA/AOA drafting', 'Registration forms', 'Statutory filings']
                            },
                            {
                                icon: 'bi-card-checklist',
                                title: 'Licensing & Tax Registration',
                                description: 'Assistance with business license applications and tax registrations',
                                features: ['Business license applications', 'Tax registrations']
                            },
                            {
                                icon: 'bi-bank',
                                title: 'Liaison & Account Opening',
                                description: 'Liaison with local authorities and banks for registration and account opening',
                                features: ['Local authority liaison', 'Bank account opening', 'Registration support']
                            },
                            {
                                icon: 'bi-calendar2-check',
                                title: 'Post-Incorporation Services',
                                description: 'Post-incorporation services such as compliance calendar setup and regulatory onboarding',
                                features: ['Compliance calendar', 'Regulatory onboarding', 'Ongoing support']
                            }
                        ].map((service, index, arr) => {
                            // For the last (7th) card, center it on large screens
                            if (arr.length === 7 && index === 6) {
                                return (
                                    <div key={index} className="col-md-6 col-lg-4 mb-4 mx-lg-auto">
                                        <div className="card h-100 service-card border-0 shadow-lg rounded-4 overflow-hidden">
                                            <div className="card-body p-4">
                                                <div className="service-icon mb-4">
                                                    <i className={`bi ${service.icon} text-primary`} style={{ fontSize: '2.5rem' }}></i>
                                                </div>
                                                <h3 className="card-title fw-bold mb-3">{service.title}</h3>
                                                <p className="card-text text-dark mb-4">{service.description}</p>
                                                <ul className="list-unstyled mb-0">
                                                    {service.features.map((feature, idx) => (
                                                        <li key={idx} className="mb-2 d-flex align-items-center">
                                                            <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                                <i className="bi bi-check text-white"></i>
                                                            </span>
                                                            <span className="text-dark">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div key={index} className="col-md-6 col-lg-4 mb-4">
                                    <div className="card h-100 service-card border-0 shadow-lg rounded-4 overflow-hidden">
                                        <div className="card-body p-4">
                                            <div className="service-icon mb-4">
                                                <i className={`bi ${service.icon} text-primary`} style={{ fontSize: '2.5rem' }}></i>
                                            </div>
                                            <h3 className="card-title fw-bold mb-3">{service.title}</h3>
                                            <p className="card-text text-dark mb-4">{service.description}</p>
                                            <ul className="list-unstyled mb-0">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="mb-2 d-flex align-items-center">
                                                        <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                            <i className="bi bi-check text-white"></i>
                                                        </span>
                                                        <span className="text-dark">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="card-body p-5 text-center">
                                    <h2 className="fw-bold mb-4">Simplify Your Global Expansion</h2>
                                    <p className="lead mb-4">
                                        We also provide region-specific incorporation packages designed to simplify market entry while addressing regulatory and tax implications.
                                    </p>
                                    <Link href="/contact" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-semibold">
                                        Get Started <i className="bi bi-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                :global(:root) {
                    --primary-color: #fcb900;
                }

                .hero {
                   background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  color: #fff;
                }
.btn-yellow {
  background-color: #fcb900;
  border: none;
  color: #000;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-yellow:hover {
  background-color: #e0a800;
  color: #000;
  transform: translateY(-2px);
}

                .animated-bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 1;
                }

                .circle-1, .circle-2, .circle-3 {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    animation: float 6s ease-in-out infinite;
                }

                .circle-1 {
                    width: 300px;
                    height: 300px;
                    top: -150px;
                    right: -150px;
                    animation-delay: 0s;
                }

                .circle-2 {
                    width: 200px;
                    height: 200px;
                    bottom: -100px;
                    left: -100px;
                    animation-delay: 2s;
                }

                .circle-3 {
                    width: 150px;
                    height: 150px;
                    top: 50%;
                    right: 10%;
                    animation-delay: 4s;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .text-shadow {
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                }

                .wave-separator {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    line-height: 0;
                }

                .intro-icon i {
                    font-size: 4rem;
                }

                .accent-bar {
                    height: 6px;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                }

                .services {
                    background-color: rgba(252, 185, 0, 0.05);
                }

                .divider-center {
                    position: relative;
                    height: 4px;
                    width: 80px;
                    margin: 0 auto;
                }

                .divider-center span {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    border-radius: 2px;
                }

                .feature-check {
                    width: 24px;
                    height: 24px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .service-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .service-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 1rem 3rem rgba(0,0,0,0.175) !important;
                }

                .btn {
                    transition: all 0.3s ease;
                }

                .btn:hover {
                    transform: translateY(-2px);
                }

                .badge {
                    transition: all 0.3s ease;
                }

                .badge:hover {
                    transform: scale(1.05);
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .col-md-6 {
                        margin-bottom: 1.5rem;
                    }
                }
            `}</style>
        </>
    );
};

export default IncorporationServices; 