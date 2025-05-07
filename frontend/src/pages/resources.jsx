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



            
{/* Tools and Blogs Section */}
<section className="py-5 bg-light">
  <div className="container">

    {/* Section Heading 
    <div className="row text-center mb-5">
      <div className="col-12">
        <h2 className="section-heading">Explore Our Tools & Insights</h2>
        <div className="accent-center-underline mx-auto mb-3"></div>
        <p className="lead">Use our expert calculators and stay updated with practical knowledge tailored for NRIs.</p>
      </div>
    </div>*/}

    {/* Calculator Cards 2x2 
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
    </div> */}


<section id="tools_section" className="py-5 bg-light resource-section">
  <div className="container">

    {/* Section Heading */}
    <div className="row text-center mb-5">
      <div className="col-12">
        <h2 className="section-heading">Explore Our Expert Tools</h2>
        <div className="accent-center-underline mx-auto mb-3"></div>
        <p className="lead">Empowering you with accurate calculators and timely compliance updates tailored for businesses.</p>
      </div>
    </div>

    {/* Tool: Audit Requirement Calculator */}
    <div className="row g-4 align-items-center mb-5">
      <div className="col-lg-6 order-lg-2">
        <div className="resource-image">
          <img
            src="/images/audit_tool.jpg"
            alt="Audit Requirement Calculator"
            className="img-fluid rounded-4 shadow-lg"
          />
          <div className="resource-badge">
            <span className="badge badge-orange rounded-pill px-3 py-2 fs-6">Check Eligibility</span>
          </div>
        </div>
      </div>
      <div className="col-lg-6 order-lg-1">
        <div className="pe-lg-5">
          <div className="section-tag mb-2">
            <span className="badge badge-orange px-3 py-2">FREE TOOL</span>
          </div>
          <h2 className="display-6 fw-bold mb-4">Audit Requirement Calculator</h2>
          <div className="accent-underline mb-4"></div>
          <p className="lead mb-4">Determine if your business requires a statutory audit based on turnover and activity type.</p>
          <ul className="list-unstyled text-muted mb-4">
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> Based on latest audit thresholds</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> For businesses & professionals</li>
            <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Instant eligibility status</li>
          </ul>
          <a href="/resources/audit-calculator" className="btn btn-orange btn-lg px-4 shadow-sm">
            <i className="bi bi-journal-check me-2"></i> Use Audit Calculator
          </a>
        </div>
      </div>
    </div>

    {/* Tool: Corporate Tax Calculator */}
    <div className="row g-4 align-items-center mb-5">
      <div className="col-lg-6">
        <div className="resource-image">
          <img
            src="/images/corporate_tax.jpg"
            alt="Corporate Tax Calculator"
            className="img-fluid rounded-4 shadow-lg"
          />
          <div className="resource-badge">
            <span className="badge badge-orange rounded-pill px-3 py-2 fs-6">Tax Tool</span>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="ps-lg-5">
          <div className="section-tag mb-2">
            <span className="badge badge-orange px-3 py-2">CALCULATOR</span>
          </div>
          <h2 className="display-6 fw-bold mb-4">Corporate Tax Calculator</h2>
          <div className="accent-underline mb-4"></div>
          <p className="lead mb-4">Calculate corporate income tax liability under Indian tax laws including cess and surcharges.</p>
          <ul className="list-unstyled text-muted mb-4">
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> Based on current fiscal slabs</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> Includes surcharge & cess</li>
            <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Optimized for private limited companies</li>
          </ul>
          <a href="/resources/corporate-tax" className="btn btn-orange btn-lg px-4 shadow-sm">
            <i className="bi bi-calculator me-2"></i> Use Corporate Calculator
          </a>
        </div>
      </div>
    </div>

    {/* Tool: Compliance Calendar */}
    <div className="row g-4 align-items-center mb-5">
      <div className="col-lg-6 order-lg-2">
        <div className="resource-image">
          <img
            src="/images/compliance_calendar.jpg"
            alt="Compliance Calendar"
            className="img-fluid rounded-4 shadow-lg"
          />
          <div className="resource-badge">
            <span className="badge badge-orange rounded-pill px-3 py-2 fs-6">Due Dates</span>
          </div>
        </div>
      </div>
      <div className="col-lg-6 order-lg-1">
        <div className="pe-lg-5">
          <div className="section-tag mb-2">
            <span className="badge badge-orange px-3 py-2">CALENDAR</span>
          </div>
          <h2 className="display-6 fw-bold mb-4">Compliance Calendar</h2>
          <div className="accent-underline mb-4"></div>
          <p className="lead mb-4">Track important tax and regulatory due dates to avoid penalties and stay compliant.</p>
          <ul className="list-unstyled text-muted mb-4">
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> Covers GST, Income Tax, TDS, ROC</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> Real-time updates for deadlines</li>
            <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Year-round tracking</li>
          </ul>
          <a href="/resources/compliance-calendar" className="btn btn-orange btn-lg px-4 shadow-sm">
            <i className="bi bi-calendar2-event me-2"></i> Use Compliance Calendar
          </a>
        </div>
      </div>
    </div>

    {/* Tool: GST Requirement Checker */}
    <div className="row g-4 align-items-center">
      <div className="col-lg-6">
        <div className="resource-image">
          <img
            src="/images/gst_checker.jpg"
            alt="GST Requirement Checker"
            className="img-fluid rounded-4 shadow-lg"
          />
          <div className="resource-badge">
            <span className="badge badge-orange rounded-pill px-3 py-2 fs-6">GST Eligibility</span>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="ps-lg-5">
          <div className="section-tag mb-2">
            <span className="badge badge-orange px-3 py-2">CHECKER</span>
          </div>
          <h2 className="display-6 fw-bold mb-4">GST Requirement Checker</h2>
          <div className="accent-underline mb-4"></div>
          <p className="lead mb-4">Check if your business needs GST registration based on turnover and services provided.</p>
          <ul className="list-unstyled text-muted mb-4">
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> Based on current GST threshold</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i> Suitable for services & trading</li>
            <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Instant result with suggestion</li>
          </ul>
          <a href="/resources/gst-requirement" className="btn btn-orange btn-lg px-4 shadow-sm">
            <i className="bi bi-receipt me-2"></i> Use GST Checker
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
{/* NRI Tax Calculator Section */}
<section id="calculator_section" className="py-5 resource-section">
  <div className="container">
    <div className="row g-4 align-items-center">
      <div className="col-lg-6 order-lg-2">
        <div className="resource-image">
          <Image
            src="/images/tax_calc.jpg"
            alt="NRI Tax Calculator"
            width={600}
            height={400}
            className="img-fluid"
          />
          <div className="resource-badge">
            <span className="badge">Popular Tool</span>
          </div>
        </div>
      </div>
      <div className="col-lg-6 order-lg-1">
        <div className="pe-lg-5">
          <div className="section-tag mb-2">
            <span className="badge">FREE TOOL</span>
          </div>
          <h2 className="display-6 fw-bold">NRI Tax Calculator</h2>
          <div className="accent-underline mb-4"></div>
          <p className="lead mb-4">
            Calculate your estimated tax liability for FY 2025-26 (AY 2026-27) with our comprehensive calculator built for NRIs.
          </p>
          <ul className="list-unstyled text-muted mb-4">
            <li><i className="bi bi-check-circle-fill"></i> Accurate tax estimation based on latest slabs</li>
            <li><i className="bi bi-check-circle-fill"></i> Instant breakdown of liability</li>
            <li><i className="bi bi-check-circle-fill"></i> Personalized tax-saving suggestions</li>
          </ul>
          <button className="btn btn-orange btn-lg px-4 shadow-sm" disabled>
            <i className="bi bi-calculator me-2"></i> Coming Soon
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

{/* NRI Tax Filing Section */}
<section id="filing_section" className="py-5 resource-section">
  <div className="container">
    <div className="row g-4 align-items-center">
      <div className="col-lg-6 order-lg-2">
        <div className="resource-image">
          <Image
            src="/images/tax_file.jpg"
            alt="NRI Tax Return Filing"
            width={600}
            height={400}
            className="img-fluid"
          />
          <div className="resource-badge">
            <span className="badge">Step-by-Step</span>
          </div>
        </div>
      </div>
      <div className="col-lg-6 order-lg-1">
        <div className="pe-lg-5">
          <div className="section-tag mb-2">
            <span className="badge">EXPERT SERVICE</span>
          </div>
          <h2 className="display-6 fw-bold">NRI Tax Return Filing</h2>
          <div className="accent-underline mb-4"></div>
          <p className="lead mb-4">
            A guided process to help NRIs file Indian tax returns easily and accurately with expert assistance.
          </p>
          <ul className="list-unstyled text-muted mb-4">
            <li><i className="bi bi-check-circle-fill"></i> Fill basic personal & residency details</li>
            <li><i className="bi bi-check-circle-fill"></i> Submit income and deduction info</li>
            <li><i className="bi bi-check-circle-fill"></i> Expert-assisted review and filing</li>
          </ul>
          <Link href="/nri-tax-return" className="btn btn-orange btn-lg px-4 shadow-sm">
            <i className="bi bi-file-earmark-text me-2"></i> Start Tax Filing
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

    {/* Blog Highlights Section */}
<div className="row mb-4">
  <div className="col-12 text-center">
    <h3 className="fw-bold text-dark mb-3">Recent Blog Highlights</h3>
    <div className="accent-center-underline mx-auto mb-3"></div>
    <p className="text-muted">Catch up with our latest knowledge drops from LinkedIn</p>
  </div>
</div>

<div className="row g-4 justify-content-center mb-5">
  {[
    {
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7309249758286528513",
      date: "April 1, 2024"
    },
    {
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7306616750173736960",
      date: "March 28, 2024"
    },
    {
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7304068620878327808",
      date: "March 20, 2024"
    }
  ].map((blog, idx) => (
    <div className="col-md-6 col-lg-4" key={idx}>
      <div className="bg-white rounded-4 shadow-sm overflow-hidden d-flex flex-column h-100">
        <iframe
          src={blog.url}
          width="100%"
          height="500" // 👈 Increased height for full post visibility
          frameBorder="0"
          allowFullScreen
          title={`Blog ${idx}`}
          style={{
            border: "none",
            borderRadius: "16px 16px 0 0",
            width: "100%",
            minHeight: "500px"
          }}
        ></iframe>
        <div className="p-3 text-end text-muted small border-top">
          <i className="bi bi-calendar-event me-1"></i>{blog.date}
        </div>
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
                                                    <a href="mailto:contact@theangelservices.com" className="text-dark text-decoration-none">contact@theangelservices.com</a>
                                                </div>
                                            </div>
                                            <div className="contact-item d-flex align-items-center mb-3">
                                                <div className="contact-icon me-3">
                                                    <i className="bi bi-telephone"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Call Us</h6>
                                                    <a href="tel:+65-82002370" className="text-dark text-decoration-none">+6582002370</a>
                                                </div>
                                            </div>
                                            <div className="contact-item d-flex align-items-center">
                                                <div className="contact-icon me-3">
                                                    <i className="bi bi-whatsapp"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">WhatsApp</h6>
                                                    <a href="https://wa.me/6582002370" className="text-dark text-decoration-none">Message us on WhatsApp</a>
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

       .ratio-16x9 {
  aspect-ratio: 16 / 9;
  width: 100%;
  display: block;
}

.accent-center-underline {
  height: 4px;
  width: 80px;
  background: linear-gradient(to right, #fcb900, rgba(252, 185, 0, 0.5));
  border-radius: 4px;
}


        /*calculators*/
/* Match layout to NRI tool sections */
/* Wrapper with more edge spacing and curved background */
.resource-section {
  padding: 80px 20px;
  background-color: #f9fafa;
}

/* Inner container with white background and soft shadow */
.resource-section .container {
  background-color: #ffffff;
  border-radius: 24px;
  padding: 60px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
}

/* Resource image box */
.resource-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.resource-image img {
  border-radius: 20px;
  width: 100%;
  height: auto;
  object-fit: cover;
}
.resource-image:hover {
  transform: scale(1.02);
}

/* Small badge above image */
.resource-badge {
  position: absolute;
  top: 16px;
  right: 16px;
}
.section-tag .badge,
.resource-badge .badge {
  background-color: #fcb900;
  color: #000;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 999px;
}

/* Heading */
.resource-section h2.display-6 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2a44;
  margin-bottom: 1rem;
}

/* Underline accent below heading */
.accent-underline {
  height: 4px;
  width: 60px;
  background-color: #fcb900;
  border-radius: 2px;
  margin-bottom: 1rem;
}

/* Description text */
.resource-section .lead {
  font-size: 1.125rem;
  color: #444;
}

/* Bullet points */
ul.list-unstyled li {
  font-size: 1rem;
  display: flex;
  align-items: center;
  line-height: 1.6;
}
ul.list-unstyled i {
  color: #fcb900;
  font-size: 1.2rem;
  margin-right: 8px;
}

/* Button styles */
.btn-orange {
  background-color: #fcb900;
  color: #000;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}
.btn-orange:hover {
  background-color: #e6a700;
  color: #000;
}

/* Mobile responsive tweaks */
@media (max-width: 992px) {
  .resource-section .container {
    padding: 40px 20px;
  }
  .resource-section h2.display-6 {
    font-size: 1.6rem;
  }
  .resource-section .lead {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .resource-section {
    padding: 60px 10px;
  }
  .resource-section .container {
    padding: 30px 15px;
  }
  .resource-section h2.display-6 {
    font-size: 1.4rem;
  }
  .accent-underline {
    width: 50px;
  }
  ul.list-unstyled li {
    font-size: 0.95rem;
  }
}



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
