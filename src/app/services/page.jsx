'use client';
import Link from 'next/link';
import React from 'react';

const ServicePage = () => {
    return (
        <>
            {/* Hero Section with Parallax Effect */}
            <section className="services-hero position-relative overflow-hidden">
                <div
                    className="services-hero-bg"
                    style={{
                        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center/cover`,
                        height: '400px',
                    }}
                />
                <div className="container position-relative" style={{ zIndex: 1 }}>
                    <div className="row min-vh-40 align-items-center py-5">
                        <div className="col-lg-8 mx-auto text-center text-white">
                            <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInDown">
                                Our Services
                            </h1>
                            <p className="lead mb-5 animate__animated animate__fadeInUp">
                                Comprehensive financial and accounting solutions tailored to your business needs
                            </p>
                            <Link href="#services_section" className="btn btn-primary btn-lg rounded-pill animate__animated animate__fadeInUp">
                                Explore Our Services <i className="bi bi-arrow-down-circle ms-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Service Workflow Section with Modern Design */}
            <section id="serviceWorkflow" className="workflow-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2 className="fw-bold mb-4 text-primary">Our Service Workflow</h2>
                            <p className="lead text-dark">A seamless process designed to deliver exceptional results for your business</p>
                        </div>
                    </div>
                    <div className="workflow-container position-relative">
                        <div className="row g-4">
                            {[
                                {
                                    icon: 'bi-calendar-check',
                                    title: 'Initial Consultation',
                                    desc: 'Understanding your business needs and requirements'
                                },
                                {
                                    icon: 'bi-graph-up-arrow',
                                    title: 'Analysis & Planning',
                                    desc: 'Developing customized solutions'
                                },
                                {
                                    icon: 'bi-gear',
                                    title: 'Implementation',
                                    desc: 'Executing the planned solutions'
                                },
                                {
                                    icon: 'bi-shield-check',
                                    title: 'Continuous Support',
                                    desc: 'Ongoing monitoring and optimization'
                                }
                            ].map((step, index) => (
                                <div className="col-md-3" key={index}>
                                    <div className="workflow-step text-center p-4 bg-white rounded-3 shadow-sm hover-lift h-100 visible">
                                        <div
                                            className="workflow-icon-container mb-3 mx-auto rounded-circle bg-primary d-flex align-items-center justify-content-center"
                                            style={{ width: '80px', height: '80px' }}
                                        >
                                            <i className={`bi ${step.icon} text-white fs-3`}></i>
                                        </div>
                                        <h4 className="text-dark">{step.title}</h4>
                                        <p className="text-muted">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Connecting Lines (CSS-based) */}
                        {/* <div
                            className="workflow-connector d-none d-md-block"
                            style={{
                                background: 'linear-gradient(to right, rgba(13,110,253,0.1), rgba(13,110,253,0.7), rgba(13,110,253,0.1))'
                            }}
                        ></div> */}
                    </div>
                </div>
            </section>

            {/* Featured Service Banner */}
            <section className="featured-service py-4 bg-primary text-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-9">
                            <div className="d-flex align-items-center">
                                <div className="badge bg-white text-primary fs-6 me-3 px-3 py-2">New</div>
                                <div>
                                    <h4 className="mb-1">Try Our NRI Tax Calculator</h4>
                                    <p className="mb-0">Calculate your estimated tax liability for FY 2025-26 (AY 2026-27)</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 text-lg-end mt-3 mt-lg-0">
                            <Link href="/tax-calculator" className="btn btn-light btn-lg">
                                <i className="bi bi-calculator" /> Try Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section id="services_section" className="services-list py-5" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2 className="fw-bold mb-3 text-dark">Our Comprehensive Services</h2>
                            <p className="lead text-muted">Discover our complete range of financial and accounting solutions</p>
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {/** Incorporation Services Featured Card **/}
                        <div className="col-md-6 col-lg-4">
                            <div className="card h-100 border-0 shadow service-card featured-card">
                                <div className="card-header bg-primary text-white py-3 position-relative">
                                    <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger">
                                        New
                                    </span>
                                    <h3 className="card-title fs-4 mb-0">Incorporation Services</h3>
                                </div>
                                <div className="card-body p-4 d-flex flex-column">
                                    <p>Strategic business setup across key international jurisdictions</p>
                                    <ul className="list-unstyled mb-4">
                                        <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2" /> Company formation in Singapore, India, UAE</li>
                                        <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2" /> Offshore incorporation in BVI, Cayman Islands</li>
                                        <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2" /> ASEAN business setup (Vietnam, Indonesia)</li>
                                        <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2" /> Complete compliance and banking support</li>
                                    </ul>
                                    <div className="mt-auto">
                                        <Link href="/services/incorporation" className="btn btn-primary w-100">
                                            <i className="bi bi-building" /> Learn More About Our Global Network
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/** Other service cards loop **/}
                        {[
                            { id: 'ap', title: 'Accounts Payable (AP) Management', icon: 'credit-card-2-front', items: ['Invoice processing', 'Vendor payments', 'Reconciliation of accounts'] },
                            { id: 'ar', title: 'Accounts Receivable (AR) Management', icon: 'receipt', items: ['Invoice generation and distribution', 'Payment tracking and follow-ups', 'Customer account reconciliation'] },
                            { id: 'bookkeeping', title: 'Bookkeeping and General Accounting', icon: 'journal-bookmark', items: ['Maintenance of ledgers', 'Preparation of trial balances', 'Journal entry processing'] },
                            { id: 'payroll', title: 'Payroll Processing', icon: 'people', items: ['Employee payroll management', 'Tax calculations and compliance', 'Generation of payslips and reports'] },
                            { id: 'reporting', title: 'Financial Reporting', icon: 'file-earmark-bar-graph', items: ['Preparation of monthly, quarterly, and annual financial statements', 'Budgeting and forecasting', 'Management reporting'] },
                            { id: 'tax', title: 'Tax Compliance and Filing', icon: 'file-text', items: ['Preparation and filing of tax returns', 'Compliance with local and international tax regulations', 'Tax audit support'], link: '/tax-calculator' },
                            { id: 'bank', title: 'Bank Reconciliation', icon: 'bank', items: ['Matching bank transactions with internal records', 'Resolving discrepancies', 'Generating reconciliation reports'] },
                            { id: 'expense', title: 'Expense Management', icon: 'cash-stack', items: ['Monitoring and reporting of employee expenses', 'Policy compliance checks', 'Expense analytics'] },
                            { id: 'audit', title: 'Audit Support', icon: 'search', items: ['Documentation and data preparation for audits', 'Liaison with auditors', 'Resolution of audit queries'] },
                            { id: 'fpa', title: 'Financial Planning and Analysis (FP&A)', icon: 'bar-chart', items: ['Cost analysis', 'Profitability studies', 'Strategic financial planning'] },
                        ].map(service => (
                            <div className="col-md-6 col-lg-4" key={service.id} id={service.id}>
                                <div className="card h-100 border-0 shadow service-card">
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="service-icon mb-3 text-primary">
                                            <i className={`bi bi-${service.icon} fs-1`} />
                                        </div>
                                        <h3 className="card-title fs-4">{service.title}</h3>
                                        <ul className="list-unstyled">
                                            {service.items.map((it, i) => (
                                                <li className="mb-2" key={i}><i className="bi bi-check-circle text-success me-2" />{it}</li>
                                            ))}
                                        </ul>
                                        {service.link && (
                                            <div className="mt-auto">
                                                <Link href={service.link} className="btn btn-outline-primary w-100">
                                                    <i className="bi bi-calculator" /> Try NRI Tax Calculator
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section with Gradient Background */}
            <section className="service-cta py-5 text-white" style={{ background: 'linear-gradient(135deg, #fcb900, #fcb700)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2 className="fw-bold mb-3">Need More Information?</h2>
                            <p className="lead mb-4">
                                Contact us to discuss your specific requirements and how we can help.
                            </p>
                            <Link href="/contact" className="btn btn-light btn-lg rounded-pill px-5">
                                <i className="bi bi-envelope me-2" /> Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .services-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 0;
        }

        .min-vh-40 {
          min-height: 40vh;
        }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-10px);
        }

        .service-card {
          transition: all 0.3s ease;
          border-radius: 8px;
          overflow: hidden;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }

        .featured-card {
          position: relative;
          overflow: visible;
          border-top: 4px solid var(--bs-primary) !important;
        }

        .animate__animated {
          animation-duration: 1s;
        }

        .animate__fadeInDown {
          animation-name: fadeInDown;
        }

        .animate__fadeInUp {
          animation-name: fadeInUp;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* Workflow connector line */
        .workflow-container {
          position: relative;
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        .workflow-connector {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, rgba(13,110,253,0.1), rgba(13,110,253,0.7), rgba(13,110,253,0.1));
          z-index: 0;
        }

        .workflow-step {
          position: relative;
          z-index: 1;
        }
      `}</style>
        </>
    );
};

export default ServicePage;

