"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Resources = () => {
    return (
        <>
            {/* Hero Section with Enhanced Design */}
            <section className="resources-hero position-relative overflow-hidden">
                <div className="resources-hero-bg"></div>

                {/* Decorative Elements */}
                <div className="hero-circles d-none d-md-block">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>

                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row min-vh-50 align-items-center py-5">
                        <div className="col-lg-7 text-black">
                            <div className="animate__animated animate__fadeInLeft">
                                <h1 className="display-4 fw-bold mb-2">Financial & Business Resources</h1>
                                <div className="accent-line mb-4"></div>
                                <p className="lead fs-4 mb-4">Expert tools and resources specifically designed for NRIs and global entrepreneurs</p>
                                <div className="d-flex flex-wrap gap-3 mt-4">
                                    <Link href="#calculator_section" className="btn btn-white btn-lg rounded-pill px-4 shadow-sm">
                                        <i className="bi bi-calculator me-2"></i>NRI Tax Calculator
                                    </Link>
                                    <Link href="#filing_section" className="btn btn-orange btn-lg rounded-pill px-4">
                                        <i className="bi bi-file-earmark-text me-2"></i>Tax Filing
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="floating-image animate__animated animate__fadeInRight">
                                <div className="stats-card bg-white p-4 rounded-4 shadow-lg text-dark">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="fw-bold mb-0">NRI Tax Benefits</h4>
                                        <div className="badge badge-orange px-3 py-2">FY 2025-26</div>
                                    </div>
                                    <div className="stat-item d-flex align-items-center mb-3">
                                        <div className="stat-icon bg-light rounded-circle p-2 me-3">
                                            <i className="bi bi-bank fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-0">NRE Account Interest</h6>
                                            <p className="fs-5 fw-bold mb-0 text-success">Tax Exempt</p>
                                        </div>
                                    </div>
                                    <div className="stat-item d-flex align-items-center mb-3">
                                        <div className="stat-icon bg-light rounded-circle p-2 me-3">
                                            <i className="bi bi-currency-exchange fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-0">FCNR Deposits</h6>
                                            <p className="fs-5 fw-bold mb-0 text-success">Tax Exempt</p>
                                        </div>
                                    </div>
                                    <div className="stat-item d-flex align-items-center">
                                        <div className="stat-icon bg-light rounded-circle p-2 me-3">
                                            <i className="bi bi-globe fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-0">Foreign Income</h6>
                                            <p className="fs-5 fw-bold mb-0 text-success">Not Taxable in India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NRI Tax Calculator Section */}
            <section id="calculator_section" className="py-5 bg-light resource-section">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="resource-image">
                                <Image
                                    src="/images/tax_calc.jpg"
                                    alt="NRI Tax Calculator"
                                    width={600}
                                    height={400}
                                    className="img-fluid rounded-4 shadow-lg"
                                />
                                <div className="resource-badge">
                                    <span className="badge badge-orange rounded-pill px-3 py-2 fs-6">Popular Tool</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="pe-lg-5">
                                <div className="section-tag mb-2">
                                    <span className="badge badge-orange px-3 py-2">FREE TOOL</span>
                                </div>
                                <h2 className="display-6 fw-bold mb-4">NRI Tax Calculator</h2>
                                <div className="accent-underline mb-4"></div>
                                <p className="lead mb-4">Calculate your estimated tax liability for FY 2025-26 (AY 2026-27) with our comprehensive tax calculator designed specifically for Non-Resident Indians.</p>
                                <div className="benefits-list mb-4">
                                    <div className="benefit-item d-flex align-items-start mb-3">
                                        <div className="benefit-icon me-3">
                                            <i className="bi bi-check-circle-fill text-primary fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-1">Accurate Tax Estimation</h5>
                                            <p className="text-muted mb-0">Based on latest NRI tax slabs and regulations</p>
                                        </div>
                                    </div>
                                    <div className="benefit-item d-flex align-items-start mb-3">
                                        <div className="benefit-icon me-3">
                                            <i className="bi bi-check-circle-fill text-primary fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-1">Instant Results</h5>
                                            <p className="text-muted mb-0">Detailed breakdown of your tax liability</p>
                                        </div>
                                    </div>
                                    <div className="benefit-item d-flex align-items-start">
                                        <div className="benefit-icon me-3">
                                            <i className="bi bi-check-circle-fill text-primary fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-1">Smart Recommendations</h5>
                                            <p className="text-muted mb-0">Personalized tax saving suggestions</p>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/tax-calculator" className="btn btn-orange btn-lg px-4 shadow-sm">
                                    <i className="bi bi-calculator me-2"></i> Use Tax Calculator
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NRI Tax Filing Section */}
            <section id="filing_section" className="py-5 bg-white resource-section">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <div className="resource-image">
                                <Image
                                    src="/images/tax_file.jpg"
                                    alt="NRI Tax Return Filing"
                                    width={600}
                                    height={400}
                                    className="img-fluid rounded-4 shadow-lg"
                                />
                                <div className="resource-badge">
                                    <span className="badge badge-orange rounded-pill px-3 py-2 fs-6">Step-by-Step</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="ps-lg-5">
                                <div className="section-tag mb-2">
                                    <span className="badge badge-orange px-3 py-2">EXPERT SERVICE</span>
                                </div>
                                <h2 className="display-6 fw-bold mb-4">NRI Tax Return Filing</h2>
                                <div className="accent-underline mb-4"></div>
                                <p className="lead mb-4">A guided step-by-step process for filing your Indian tax returns as an NRI, with expert support at every stage.</p>
                                <div className="process-timeline mb-4">
                                    <div className="process-step d-flex">
                                        <div className="process-number rounded-circle me-3">1</div>
                                        <div className="process-content mb-3">
                                            <h5 className="mb-1">Basic Information</h5>
                                            <p className="text-muted mb-0">Complete your personal and residency details</p>
                                        </div>
                                    </div>
                                    <div className="process-step d-flex">
                                        <div className="process-number rounded-circle me-3">2</div>
                                        <div className="process-content mb-3">
                                            <h5 className="mb-1">Income & Deductions</h5>
                                            <p className="text-muted mb-0">Enter your income sources and applicable deductions</p>
                                        </div>
                                    </div>
                                    <div className="process-step d-flex">
                                        <div className="process-number rounded-circle me-3">3</div>
                                        <div className="process-content">
                                            <h5 className="mb-1">Review & Submit</h5>
                                            <p className="text-muted mb-0">Our experts handle the filing process</p>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/nri-tax-return" className="btn btn-orange btn-lg px-4 shadow-sm">
                                    <i className="bi bi-file-earmark-text me-2"></i> Start Tax Filing
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coming Soon Section */}
{/* Tools and Blogs Section */}
<section className="py-5 bg-light">
  <div className="container">

    {/* Section Heading */}
    <div className="row text-center mb-5">
      <div className="col-12">
        <h2 className="section-heading">Explore Our Tools & Insights</h2>
        <div className="accent-center-underline mx-auto mb-3"></div>
        <p className="lead">Use our expert calculators and stay updated with practical knowledge tailored for NRIs.</p>
      </div>
    </div>

    {/* Calculator Cards 2x2 */}
    <div className="row g-4 mb-5">
      {[
        {
          title: "Audit Requirement Calculator",
          desc: "Check if your business qualifies for audit under Indian tax laws.",
          icon: "bi-journal-check",
          link: "/resources/audit-calculator"
        },
        {
          title: "Corporate Tax Calculator",
          desc: "Compute tax liability with applicable deductions & surcharges.",
          icon: "bi-calculator",
          link: "/resources/corporate-tax"
        },
        {
          title: "Compliance Calendar",
          desc: "Stay updated on return filing & financial due dates.",
          icon: "bi-calendar2-event",
          link: "/resources/compliance-calendar"
        },
        {
          title: "GST Requirement Checker",
          desc: "Find if your business needs GST registration based on turnover.",
          icon: "bi-receipt",
          link: "/resources/gst-requirement"
        }
      ].map((tool, index) => (
        <div className="col-md-6" key={index}>
          <div className="tool-box p-4 rounded-4 bg-white shadow-sm h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-start mb-3">
                <i className={`bi ${tool.icon} fs-2 text-warning me-3`}></i>
                <div>
                  <h5 className="fw-bold text-dark mb-1">{tool.title}</h5>
                  <p className="text-muted mb-0">{tool.desc}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link href={tool.link} className="btn btn-warning w-100 text-dark fw-semibold">
                <i className="bi bi-arrow-right-circle me-2"></i>Use {tool.title.split(" ")[0]}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Blog Teasers */}
    <div className="row mb-4">
      <div className="col-12 text-center">
        <h3 className="fw-bold text-dark mb-3">Recent Blog Highlights</h3>
        <p className="text-muted">Catch up with our latest knowledge drops from LinkedIn</p>
      </div>
    </div>

    <div className="row g-4 justify-content-center mb-4">
      {[
        {
          url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7309249758286528513?collapsed=1",
          date: "April 1, 2024"
        },
        {
          url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7306616750173736960?collapsed=1",
          date: "March 28, 2024"
        },
        {
          url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7304068620878327808?collapsed=1",
          date: "March 20, 2024"
        }
      ].map((blog, idx) => (
        <div className="col-md-6 col-lg-4" key={idx}>
          <div className="bg-white shadow-sm rounded-4 overflow-hidden">
            <iframe
              src={blog.url}
              height="360"
              width="100%"
              frameBorder="0"
              allowFullScreen
              title={`Blog ${idx}`}
            ></iframe>
            <div className="p-3 text-end text-muted small">🗓 {blog.date}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center">
      <Link href="/resources/blogs" className="btn btn-outline-dark rounded-pill px-4">
        <i className="bi bi-newspaper me-2"></i>View All Blogs
      </Link>
    </div>
  </div>

</section>


            {/* Newsletter & CTA Section */}
            <section className="cta-section py-5 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="cta-card p-5 rounded-4 shadow text-white position-relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="cta-shapes">
                                    <div className="shape shape-1"></div>
                                    <div className="shape shape-2"></div>
                                    <div className="shape shape-3"></div>
                                </div>

                                <div className="row align-items-center position-relative">
                                    <div className="col-lg-7">
                                        <h2 className="display-6 fw-bold mb-3">Need Personalized Assistance?</h2>
                                        <p className="lead mb-4">Our team of global tax and incorporation experts is ready to help you navigate the complexities of international business and finance.</p>
                                        <div className="d-flex flex-wrap gap-3">
                                            <Link href="/contact" className="btn btn-light btn-lg px-4 shadow-sm">
                                                <i className="bi bi-chat-dots me-2"></i> Contact Our Experts
                                            </Link>
                                            <Link href="/about" className="btn btn-outline-light btn-lg px-4">
                                                <i className="bi bi-info-circle me-2"></i> About Our Team
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 mt-4 mt-lg-0">
                                        <div className="contact-card bg-white p-4 rounded-4 shadow-sm text-dark">
                                            <h4 className="mb-3">Quick Connect</h4>
                                            <div className="contact-item d-flex align-items-center mb-3">
                                                <div className="contact-icon me-3">
                                                    <i className="bi bi-envelope"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Email Us</h6>
                                                    <a href="mailto:contact@asplconsultancy.com" className="text-dark text-decoration-none">contact@asplconsultancy.com</a>
                                                </div>
                                            </div>
                                            <div className="contact-item d-flex align-items-center mb-3">
                                                <div className="contact-icon me-3">
                                                    <i className="bi bi-telephone"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Call Us</h6>
                                                    <a href="tel:+91-9259049836" className="text-dark text-decoration-none">+91-9259049836</a>
                                                </div>
                                            </div>
                                            <div className="contact-item d-flex align-items-center">
                                                <div className="contact-icon me-3">
                                                    <i className="bi bi-whatsapp"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">WhatsApp</h6>
                                                    <a href="https://wa.me/919259049836" className="text-dark text-decoration-none">Message us on WhatsApp</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
       
        /*calculators*/
         .section-heading {
      color: #1F2A44;
      font-weight: 700;
    }

    .tool-box:hover {
      box-shadow: 0 0 18px rgba(252, 185, 0, 0.3);
      transition: all 0.3s ease;
    }

    .accent-center-underline {
      height: 4px;
      width: 80px;
      background: linear-gradient(to right, #fcb900, rgba(252, 185, 0, 0.5));
      border-radius: 4px;
    }

    @media (max-width: 768px) {
      .tool-box {
        text-align: center;
      }
    }
       /* Hero Section Styles */
        .resources-hero-bg {
          background: linear-gradient(135deg, rgba(254,254,254,0.85), rgba(230,170,0,0.95)), url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center/cover;
          height: 500px;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 0;
        }

        .hero-circles .circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          background: white;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: -150px;
          right: -100px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: -70px;
          left: 10%;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          top: 20%;
          left: 30%;
        }

        .accent-line {
          height: 4px;
          width: 80px;
          background: linear-gradient(to right, #fff, rgba(255,255,255,0.5));
          border-radius: 4px;
        }

        .accent-underline {
          height: 4px;
          width: 80px;
          background: linear-gradient(to right, var(--primary-color), rgba(252,185,0,0.5));
          border-radius: 4px;
        }

        .accent-center-underline {
          height: 4px;
          width: 80px;
          background: linear-gradient(to right, var(--primary-color), rgba(252,185,0,0.5));
          border-radius: 4px;
        }

        .floating-image {
          position: relative;
        }

        .stats-card {
          transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
          transition: all 0.5s ease;
        }

        .stats-card:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
        }

        /* Animation Classes */
        .animate__animated {
          animation-duration: 1s;
        }

        .animate__fadeInLeft {
          animation-name: fadeInLeft;
        }

        .animate__fadeInRight {
          animation-name: fadeInRight;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-50px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translate3d(50px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* Resource Sections */
        .resource-section {
          position: relative;
          overflow: hidden;
        }

        .resource-image {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .resource-badge {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .benefit-icon, .contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
        }

        .section-tag {
          display: inline-block;
        }
        /* Process Timeline */
        .process-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          background-color: var(--primary-color);
          color: var(--secondary-color);
        }

        .process-step {
          position: relative;
        }

        .process-step:not(:last-child):before {
          content: '';
          position: absolute;
          left: 18px;
          top: 36px;
          height: calc(100% - 36px);
          width: 1px;
          background-color: rgba(252,185,0,0.3);
          z-index: 0;
        }

        /* CTA Section */
        .cta-card {
          z-index: 1;
          background-color: var(--primary-color);
        }

        .cta-shapes .shape {
          position: absolute;
          background-color: rgba(255,255,255,0.1);
          border-radius: 50%;
        }

        .shape-1 {
          width: 200px;
          height: 200px;
          top: -100px;
          right: -50px;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          bottom: -50px;
          right: 30%;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          top: 30%;
          left: -30px;
        }

        .contact-card {
          transform: rotate(2deg);
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: rotate(0deg);
        }

        @media (max-width: 768px) {
          .process-step:not(:last-child):before {
            height: calc(100% - 30px);
          }
          
          .contact-card {
            transform: none;
          }
        }
      `}</style>
        </>
    );
};

export default Resources; 