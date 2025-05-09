'use client';
import React from 'react';
import Link from 'next/link';

const ToolsSection = () => {
    return (
        <section className="tools-section py-5">
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <h2 className="display-5 fw-bold mb-4" style={{ fontSize: 'var(--font-size-main-heading)' }}>Powerful Tools & Resources</h2>
                        <div className="underline-center mx-auto mb-4"></div>
                        <p className="lead text-muted mb-5" style={{ fontSize: 'var(--font-size-subheading)' }}>
                            Simplify your financial decisions with our free tools
                        </p>
                    </div>
                </div>

                <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                        <div className="p-4 bg-light rounded-4 shadow-sm mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="fw-bold mb-0">Corporate Tax Calculator</h4>
                                <span className="badge badge-orange rounded-pill px-3 py-2">Free</span>
                            </div>
                            <p className="mb-4">
                                Compute tax liability with applicable deductions & surcharges.
                            </p>
                            <div className="d-flex justify-content-end">
                                <Link href="/resources/corporate-tax" className="btn btn-orange px-4">
                                    Try Calculator <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>

                        <div className="p-4 bg-light rounded-4 shadow-sm">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="fw-bold mb-0">Tax Filing Guide</h4>
                                <span className="badge badge-orange rounded-pill px-3 py-2">Free</span>
                            </div>
                            <p className="mb-4">
                                Comprehensive guide to help NRIs understand their tax obligations and maximize benefits.
                            </p>
                            <div className="d-flex justify-content-end">
                                <Link href="/resources" className="btn btn-orange px-4">
                                    View Resources <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>

                        {/* More Resources Button */}
                        <div className="text-center mt-4">
                            <Link href="/resources" className="btn btn-outline-dark rounded-pill px-5 py-2">
                                More Resources
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Financial Tools"
                            className="img-fluid rounded-4 shadow"
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .tools-section {
                    background-color:rgb(255, 255, 255);
                }

                .btn-orange {
                    background-color: #f7c600;
                    color: black;
                    border-radius: 50px;
                    padding: 8px 16px;
                    font-size: 0.875rem;
                }
    .underline-center {
  height: 4px;
  width: 80px;
  background-color: #fcb900;
  border-radius: 4px;
}
                .btn-orange:hover {
                    background-color: #e6b800;
                }

                .btn-outline-dark {
                    border: 2px solid #333;
                    color: #333;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .btn-outline-dark:hover {
                    background-color: #333;
                    color: #fff;
                }

                .badge {
                    background-color: #fcb900;
                    color: black;
                    font-size: 0.875rem;
                    padding: 0.5rem 1rem;
                }

                .img-fluid {
                    max-width: 100%;
                    height: auto;
                }

                .container {
                    max-width: 1140px;
                }

                .shadow-sm {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .rounded-4 {
                    border-radius: 16px;
                }

                .fw-bold {
                    font-weight: 700;
                }
            `}</style>
        </section>
    );
};

export default ToolsSection;
