"use client";

import Link from 'next/link';

const FundAdministration = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="hero position-relative">
                <div className="animated-bg">
                    <div className="circle-1"></div>
                    <div className="circle-2"></div>
                    <div className="circle-3"></div>
                </div>

                <div className="container position-relative py-5" style={{ zIndex: 2 }}>
                    <div className="row py-5 min-vh-40">
                        <div className="col-lg-8 mx-auto text-center">

                            <h1 className="display-3 fw-bold text-white mb-4 text-shadow">
                                Fund Administration
                            </h1>
                            <p className="lead text-white mb-5 fs-4 fw-light">
                                Operational excellence for investment structures.
                            </p>
                            <div className="hero-buttons">
                                <a href="#services" className="btn btn-yellow btn-lg rounded-pill px-4 py-3 fw-semibold me-2 mb-2 mb-md-0 shadow-sm">
                                    Our Services <i className="bi bi-arrow-down-circle ms-2"></i>
                                </a>
                                <Link href="/contact" className="btn btn-outline-light btn-lg rounded-pill px-4 py-3 fw-semibold">
                                    Contact Us <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wave-separator text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
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
                                                <i className="bi bi-briefcase-fill text-primary" style={{ fontSize: '4rem' }}></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <h2 className="fw-bold text-dark mb-3">Specialised, Secure Fund Support</h2>
                                            <p className="lead text-dark mb-0">
                                                Our team, comprising experienced professionals with a deep understanding of fund administration, delivers specialised services designed for emerging and mid-sized funds, family investment vehicles, and venture capital structures. We ensure your fund's operations remain compliant, investor-friendly, and audit-ready—giving you more time to focus on dealmaking and value creation.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="accent-bar position-absolute bg-primary" style={{ height: '6px', width: '100%', bottom: 0, left: 0 }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold text-dark mb-2">Our Fund Administration Services</h2>
                        <div className="divider-center mb-4"><span className="bg-primary"></span></div>
                        <p className="lead col-md-8 mx-auto text-dark">Comprehensive, confidential, and audit-ready fund support</p>
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                icon: 'bi-lightbulb',
                                title: 'Fund Setup Advisory',
                                description: 'Fund setup advisory (Singapore VCC, LLPs, offshore funds)',
                                features: ['Singapore VCC', 'LLPs', 'Offshore funds']
                            },
                            {
                                icon: 'bi-journal-bookmark',
                                title: 'Fund Accounting & NAV',
                                description: 'Fund accounting, bookkeeping, and NAV computation',
                                features: ['Fund accounting', 'Bookkeeping', 'NAV computation']
                            },
                            {
                                icon: 'bi-person-plus',
                                title: 'Investor Onboarding',
                                description: 'Investor onboarding, subscriptions, redemptions, and registry maintenance',
                                features: ['Onboarding', 'Subscriptions/redemptions', 'Registry maintenance']
                            },
                            {
                                icon: 'bi-file-earmark-bar-graph',
                                title: 'Investor Reporting',
                                description: 'Preparation of investor reports, capital call notices, and distribution summaries',
                                features: ['Investor reports', 'Capital call notices', 'Distribution summaries']
                            },
                            {
                                icon: 'bi-shield-lock',
                                title: 'AML/CFT & KYC',
                                description: 'AML/CFT checks and investor KYC documentation',
                                features: ['AML/CFT checks', 'KYC documentation']
                            },
                            {
                                icon: 'bi-clipboard-check',
                                title: 'Regulatory Compliance',
                                description: 'Regulatory compliance (MAS, SEBI, DIFC, offshore regimes)',
                                features: ['MAS/SEBI/DIFC', 'Offshore compliance']
                            },
                            {
                                icon: 'bi-people',
                                title: 'Stakeholder Coordination',
                                description: 'Coordination with auditors, legal counsel, banks, and custodians',
                                features: ['Auditor coordination', 'Legal/bank/custodian liaison']
                            },
                            {
                                icon: 'bi-bar-chart-steps',
                                title: 'Bespoke Reporting & Back-Office',
                                description: 'Bespoke reporting and back-office support for GPs and family offices',
                                features: ['Custom reporting', 'Back-office support', 'GP/family office solutions']
                            }
                        ].map((service, index, arr) => {
                            // For the last two (7th and 8th) cards, center them on large screens
                            if (arr.length === 8 && (index === 6 || index === 7)) {
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
                                    <h2 className="fw-bold mb-4">Integrated, Discreet, Global Service</h2>
                                    <p className="lead mb-4">
                                        Our integrated service model allows clients to rely on a single partner for multi-jurisdictional needs—backed by local insights, professional integrity, and global reach.
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
                .animated-bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: 1;
                }
                    .hero {
  background-image: url("https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/fund-hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 60vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.wave-separator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 2;
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
            `}</style>
        </>
    );
};

export default FundAdministration;
