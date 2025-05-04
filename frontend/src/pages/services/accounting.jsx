"use client";

import Image from 'next/image';
import Link from 'next/link';

const AccountingServices = () => {
    return (
        <>
            {/* Hero Section */}
            <section
                className="hero position-relative"
                style={{
                    background: 'linear-gradient(90deg, var(--primary-color), #e59b00)',
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
                            
                            <div className="hero-badge mb-3 d-inline-block">
                                <span
                                    className="badge bg-white px-3 py-2 rounded-pill fs-6 fw-semibold"
                                    style={{ color: 'var(--primary-color)' }}
                                >
                                    Financial Clarity
                                </span>
                            </div>
                            <h1 className="display-3 fw-bold text-white mb-4 text-shadow">
                                Accounting Services
                            </h1>
                            <p className="lead text-white mb-5 fs-4 fw-light">
                                Clear financial reporting to power strategic decisions.
                            </p>
                            <div className="hero-buttons">
                                <a
                                    href="#services"
                                    className="btn btn-light btn-lg rounded-pill px-4 py-3 fw-semibold me-2 mb-2 mb-md-0 shadow-sm"
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
                                                    className="bi bi-bar-chart-line text-primary"
                                                    style={{ fontSize: '4rem' }}
                                                ></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <h2 className="fw-bold text-dark mb-3">Modern, Insightful Accounting</h2>
                                            <p className="lead text-dark mb-0">
                                                Our accounting services are designed for modern businesses that value timely, accurate, and actionable financial insights. We go beyond compliance to provide CFO-level visibility into your operations, empowering better budgeting, forecasting, and performance tracking.
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
            <section id="services" className="services py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold text-dark mb-2">Our Accounting Services</h2>
                        <div className="divider-center mb-4"><span className="bg-primary"></span></div>
                        <p className="lead col-md-8 mx-auto text-dark">Cloud-first, CFO-level support for your business</p>
                    </div>

                    <div className="row g-4">
                        {/* Service Cards */}
                        {[
                            {
                                icon: 'bi-journal-bookmark',
                                title: 'Bookkeeping & Classification',
                                description: 'Day-to-day bookkeeping and transaction classification (monthly, quarterly, annual)',
                                features: ['Bookkeeping', 'Transaction classification', 'Flexible frequency']
                            },
                            {
                                icon: 'bi-file-earmark-spreadsheet',
                                title: 'Statutory Financials',
                                description: 'Preparation of statutory financial statements in accordance with local GAAP and IFRS',
                                features: ['Statutory financials', 'Local GAAP', 'IFRS compliance']
                            },
                            {
                                icon: 'bi-clipboard-data',
                                title: 'Management Accounts & MIS',
                                description: 'Management accounts and MIS reports tailored to internal needs',
                                features: ['Management accounts', 'MIS reports', 'Custom reporting']
                            },
                            {
                                icon: 'bi-diagram-3',
                                title: 'Consolidation & Reconciliation',
                                description: 'Consolidation of group entities and intercompany reconciliation',
                                features: ['Group consolidation', 'Intercompany reconciliation', 'Multi-entity support']
                            },
                            {
                                icon: 'bi-journal-check',
                                title: 'General Ledger & Closing',
                                description: 'General ledger maintenance, trial balances, and financial closing',
                                features: ['General ledger', 'Trial balances', 'Financial closing']
                            },
                            {
                                icon: 'bi-cash-stack',
                                title: 'AP/AR Processing',
                                description: 'Accounts payable and receivable processing with payment tracking',
                                features: ['Accounts payable', 'Accounts receivable', 'Payment tracking']
                            },
                            {
                                icon: 'bi-people',
                                title: 'Payroll Processing',
                                description: 'Payroll processing including payslips, CPF/EPF filings, and leave accruals',
                                features: ['Payslips', 'CPF/EPF filings', 'Leave accruals']
                            },
                            {
                                icon: 'bi-cloud-arrow-up',
                                title: 'Cloud Migration & Automation',
                                description: 'Cloud accounting migration and automation advisory (e.g., QuickBooks, Xero, Zoho)',
                                features: ['Cloud migration', 'Automation advisory', 'QuickBooks/Xero/Zoho']
                            }
                        ].map((service, index, arr) => {
                            // For the last (8th) card, center it on large screens
                            if (arr.length === 8 && index === 7) {
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
                                    <h2 className="fw-bold mb-4">Access Your Financials Anytime, Anywhere</h2>
                                    <p className="lead mb-4">
                                        Our cloud-first approach allows clients to access their financial data in real-time and collaborate seamlessly with our finance team.
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
                    background: linear-gradient(90deg, var(--primary-color), #e59b00);
                    overflow: hidden;
                    position: relative;
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

export default AccountingServices; 