'use client';
import React from 'react';

const ServicesSection = () => {
    return (
        <section className="services-section py-5 bg-light">
            <div className="container">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-6">
                        <h2 className="display-5 fw-bold mb-3">Our Comprehensive Services</h2>
                        <p className="lead mb-4">
                            Discover our full range of financial and accounting solutions designed for global businesses and NRIs
                        </p>
                    </div>
                    <div className="col-lg-6 text-lg-end">
                        <a href="/services" className="btn btn-outline-primary px-4">
                            View All Services <i className="bi bi-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Global Incorporation */}
                    <div className="col-md-6 col-lg-4">
                        <a href="/services_incorporation" className="text-decoration-none">
                            <div className="service-card">
                                <div className="position-absolute top-0 end-0 mt-3 me-3">
                                    <span className="badge bg-primary rounded-pill px-3 py-2">New</span>
                                </div>
                                <div className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="service-icon me-3">
                                            <i className="bi bi-building fs-1"></i>
                                        </div>
                                        <h4 className="mb-0">Incorporation Services</h4>
                                    </div>
                                    <p className="mb-4">
                                        Strategic business setup across key international jurisdictions
                                    </p>
                                    <ul className="list-unstyled mb-4">
                                        <li className="d-flex align-items-center mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>Multiple Jurisdictions</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>End-to-End Support</span>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>Tax-Efficient Structures</span>
                                        </li>
                                    </ul>
                                    <div className="d-flex justify-content-end">
                                        <span className="btn btn-orange rounded-pill px-4">
                                            Learn More <i className="bi bi-arrow-right ms-2"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* NRI Tax Services */}
                    <div className="col-md-6 col-lg-4">
                        <a href="/services" className="text-decoration-none">
                            <div className="service-card">
                                <div className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="service-icon me-3">
                                            <i className="bi bi-file-earmark-text fs-1"></i>
                                        </div>
                                        <h4 className="mb-0">Financial Reporting</h4>
                                    </div>
                                    <p className="mb-4">
                                        Comprehensive financial statements and management reports
                                    </p>
                                    <ul className="list-unstyled mb-4">
                                        <li className="d-flex align-items-center mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>Accurate Statement Preparation</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>Custom Management Reports</span>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>Regulatory Compliant Filings</span>
                                        </li>
                                    </ul>
                                    <div className="d-flex justify-content-end">
                                        <span className="btn btn-orange rounded-pill px-4">
                                            Learn More <i className="bi bi-arrow-right ms-2"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Accounting Services */}
                    <div className="col-md-6 col-lg-4">
                        <a href="/services" className="text-decoration-none">
                            <div className="service-card">
                                <div className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="service-icon me-3">
                                            <i className="bi bi-calculator fs-1"></i>
                                        </div>
                                        <h4 className="mb-0">Accounting & Tax Compliance</h4>
                                    </div>
                                    <p className="mb-4">
                                        Ensure smooth financial operations and full regulatory compliance for your business
                                    </p>
                                    <ul className="list-unstyled mb-4">
                                        <li className="d-flex align-items-center mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>Streamlined Payables & Reconciliation</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>Regulatory Tax Filings</span>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>End-to-End Compliance Support</span>
                                        </li>
                                    </ul>
                                    <div className="d-flex justify-content-end">
                                        <span className="btn btn-orange rounded-pill px-4">
                                            Learn More <i className="bi bi-arrow-right ms-2"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>



            {/* Inline CSS */}
            <style jsx>{`
        .services-section {
          background-color: #f8f9fa;
        }

        .service-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: relative;
          transition: transform 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-10px);
        }

        .service-icon {
          font-size: 40px;
          color: #007bff;
        }

        .service-card h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
        }

        .service-card p {
          color: #777;
          font-size: 1rem;
        }

        .btn-orange {
          background-color: #f7c600;;
          color: white;
          border-radius: 50px;
          padding: 8px 16px;
          font-size: 0.875rem;
        }

        .btn-orange:hover {
          background-color: #e6b800;
        }

        .badge {
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
        }

        .container {
          max-width: 1140px;
        }
      `}</style>
        </section>
    );
};

export default ServicesSection;
