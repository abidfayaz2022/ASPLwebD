'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Services() {
  useEffect(() => {
    // Add any client-side initialization here if needed
  }, []);

  return (
    <>
      {/* Hero Section with Parallax Effect */}
      <section
        className="services-hero position-relative text-white"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundColor: '#f8f9fa',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          minHeight: '500px'
        }}
      >
        {/* Floating Elements */}
        <div className="animated-bg">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
        </div>

        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <div className="row py-5 min-vh-40">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-3 fw-bold text-white mb-4 text-shadow">Our Services</h1>
              <p className="lead text-white mb-5 fs-4 fw-light">
                We empower businesses and families across the globe with structured, compliant, and forward-thinking solutions. Our presence across Singapore, Indonesia, Vietnam, UAE, Hong Kong, BVI, and Cayman Islands allows us to serve a truly global clientele—supporting their ambitions with local insights and international best practices.
              </p>
              <Link
                href="#services_section"
                className="btn btn-yellow btn-lg rounded-pill px-4 py-3 fw-semibold me-2 shadow-sm"
              >
                Explore Our Services <i className="bi bi-arrow-down-circle ms-2"></i>
              </Link>

            </div>
          </div>
        </div>

        {/* Wave Separator (same as incorporation page) */}
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




      {/* Featured Service Banner 
      <section className="featured-service py-4 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9 col-sm-12 mb-3 mb-md-0">
              <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                <div className="badge bg-white text-primary fs-6 me-3 px-3 py-2 mb-2 mb-sm-0">New</div>
                <div>
                  <h4 className="mb-1" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>Try Our NRI Tax Calculator</h4>
                  <p className="mb-0" style={{ fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>Calculate your estimated tax liability for FY 2025-26 (AY 2026-27)</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 text-md-end text-center">
             <button className="btn btn-orange btn-lg px-4 shadow-sm" disabled>
  <i className="bi bi-calculator me-2"></i> Coming Soon
</button>

            </div>
          </div>
        </div>
      </section>*/}

      {/* Services Grid Section */}
      <section id="services_section" className="services-list py-4 py-md-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row mb-4 mb-md-5">
            <div className="col-lg-8 col-md-10 mx-auto text-center">
              <h2 className="fw-bold mb-3 text-dark" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
                We specialize in the following core verticals:
              </h2>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Featured Service Card */}
            <div className="col-md-6 col-lg-4" id="incorporation">
              <div className="card h-100 border-0 shadow service-card featured-card">
                <div className="card-header py-3 position-relative" style={{ background: 'linear-gradient(135deg, #fcb900, #fcb700)', color: '#000' }}>
                  <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill" style={{ backgroundColor: '#000', color: 'white' }}>
                    Featured
                  </span>
                  <h3 className="card-title fs-4 mb-0 fw-bold">Incorporation</h3>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <p className="text-muted mb-3" style={{ textAlign: 'justify' }}>Turning Ideas into Global Enterprises</p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle-fill me-2" style={{ textAlign: 'justify' }} /> Incorporation of private limited companies, holding structures, and SPVs</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill me-2" style={{ textAlign: 'justify' }} /> Business license advisory and application support</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill me-2" style={{ textAlign: 'justify' }} /> Structuring for international expansion and market entry</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill me-2" style={{ textAlign: 'justify' }} /> Branch office and representative office setup</li>
                  </ul>
                  <div className="mt-auto">
                    <Link href="/services/incorporation" className="btn rounded-pill px-4 w-100" style={{ backgroundColor: '#fcb900', color: '#000', fontWeight: '600' }}>
                      <i className="bi bi-building me-2" /> Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Regular Service Cards */}
            {[
              {
                id: 'corporate-secretary',
                icon: 'credit-card-2-front',
                title: 'Company Secretary',
                description: 'Keeping Your Business Compliant and Future-Ready',
                items: [
                  'Annual return filings and statutory maintenance',
                  'Drafting of company resolutions and board support',
                  'XBRL financial statement submissions',
                  'Compliance monitoring and regulatory advisory'
                ],
                link: '/services/corporate-secretary'
              },
              {
                id: 'accounting',
                icon: 'receipt',
                title: 'Accounting',
                description: 'Numbers that Tell Your Business Story',
                items: [
                  'Full-service bookkeeping and financial reporting',
                  'Management accounts and customized MIS reporting',
                  'Payroll management and statutory compliance',
                  'Accounts receivable and payable services'
                ],
                link: '/services/accounting'
              },
              {
                id: 'tax-advisory',
                icon: 'journal-bookmark',
                title: 'Tax Advisory',
                description: 'Tax-Smart Strategies for a Global World',
                items: [
                  'Corporate tax advisory and filings',
                  'Individual and expatriate tax planning',
                  'GST/VAT registration, compliance, and advisory',
                  'Cross-border tax structuring and reporting'
                ],
                link: '/services/tax-advisory'
              },
              {
                id: 'legacy-planning',
                icon: 'people',
                title: 'Legacy Planning',
                description: 'Protecting Wealth, Securing Generations',
                items: [
                  'Structuring of family trusts and holding companies',
                  'Wealth protection and succession planning',
                  'Risk segregation between personal and business assets',
                  'Governance frameworks for multigenerational families'
                ],
                link: '/services/legacy-planning'
              },
              {
                id: 'fund-administration',
                icon: 'file-earmark-bar-graph',
                title: 'Fund Administration',
                description: 'Efficient Support for Your Investment Structures',
                items: [
                  'NAV calculation and investor reporting',
                  'Fund accounting and transaction processing',
                  'AML/KYC onboarding and compliance support',
                  'Administrative support for VCCs and offshore funds'
                ],
                link: '/services/fund-administration'
              }
            ].map((service) => (
              <div key={service.id} className="col-md-6 col-lg-4" id={service.id}>
                <div className="card h-100 border-0 shadow service-card">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="service-icon mb-3">
                      <i className={`bi bi-${service.icon} fs-1`} />
                    </div>
                    <h3 className="card-title fs-4">{service.title}</h3>
                    <p className="text-muted">{service.description}</p>
                    <ul className="list-unstyled mb-4">
                      {service.items.map((item, index) => (
                        <li key={index} className="mb-2">
                          <i className="bi bi-check-circle me-2" style={{ textAlign: 'justify' }} /> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Link href={service.link} className="btn rounded-pill px-4 w-100" style={{ backgroundColor: '#fcb900', color: '#000', fontWeight: '600' }}>
                        <i className="bi bi-arrow-right me-2" /> Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Service Workflow Section with Modern Design */}
      <section
        id="serviceWorkflow"
        className="workflow-section py-5"
        style={{ backgroundColor: '#ffffff' }} // Replace with your preferred tone
      >

        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-3 text-primary" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
                Our Service Workflow
              </h2>
              <div className="underline-center mx-auto mb-4"></div>


              <p className="lead text-dark mb-1">
                A seamless process designed to deliver exceptional results for your business
              </p>

            </div>
          </div>
          <div className="workflow-container position-relative ">
            <div className="row g-4">
              {[
                {
                  icon: 'bi-calendar-check',
                  title: 'Initial Consultation',
                  desc: 'We understand your business needs and goals clearly.',
                },
                {
                  icon: 'bi-graph-up-arrow',
                  title: 'Analysis & Planning',
                  desc: 'We create tailored strategies to suit your needs.',
                },
                {
                  icon: 'bi-gear',
                  title: 'Implementation',
                  desc: 'We carry out all planned solutions efficiently.',
                },
                {
                  icon: 'bi-shield-check',
                  title: 'Continuous Support',
                  desc: 'We monitor and improve performance consistently.',
                }
              ]
                .map((step, index) => (
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
            <div
              className="workflow-connector d-none d-md-block"
              style={{
                background: 'linear-gradient(to right, rgba(13,110,253,0.1), rgba(13,110,253,0.7), rgba(13,110,253,0.1))'
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="why-partner-section py-4 py-md-5 bg-light">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8 col-md-10 mx-auto text-center">
              <h2 className="fw-bold mb-3 mb-md-4" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
                Why Partner with Us?
              </h2>
            </div>
          </div>
          <div className="row g-3 g-md-4 justify-content-center">
            {[
              {
                icon: 'globe',
                title: 'Global Reach',
                description: 'Worldwide reach backed by deep, local market-specific expertise.',
              },
              {
                icon: 'laptop',
                title: 'Technology',
                description: 'Tech-enabled services that ensure efficiency, clarity, and transparency.',
              },
              {
                icon: 'shield-check',
                title: 'Compliance',
                description: 'Focused on compliance, confidentiality, integrity, and client success.',
              },
              {
                icon: 'person-check',
                title: 'Personal Touch',
                description: 'Tailored support with a boutique-style, client-first service approach.',
              },
              {
                icon: 'diagram-3',
                title: 'Seamless Integration',
                description: 'Smooth operational integration across all legal and regional borders.',
              }
            ].map((feature, index) => (
              <div key={index} className="col-sm-6 col-lg-4">
                <div className="why-partner-card bg-white p-3 p-md-4 h-100 rounded-4 shadow-sm">
                  <div className="d-flex align-items-center mb-2 mb-md-3">
                    <div
                      className="why-partner-icon me-3 d-flex align-items-center justify-content-center rounded-circle"
                      style={{ width: 'clamp(40px, 8vw, 50px)', height: 'clamp(40px, 8vw, 50px)', backgroundColor: '#fcb900' }}
                    >
                      <i className={`bi bi-${feature.icon} text-white`} style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} />
                    </div>
                    <h4 className="mb-0 fw-bold" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}>{feature.title}</h4>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta py-4 py-md-5 text-white" style={{ background: 'linear-gradient(135deg, #fcb900, #fcb700)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto text-center">
              <h2 className="fw-bold mb-2 mb-md-3" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
                Need More Information?
              </h2>
              <p className="lead mb-3 mb-md-4" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
                Contact us to discuss your specific requirements and how we can help.
              </p>
              <Link href="/contact" className="btn btn-light btn-responsive rounded-pill px-3 px-md-5">
                <i className="bi bi-envelope me-2" /> Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
:global(.btn-yellow) {
    background-color: #fcb900;
    border: none;
    color: #000;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  :global(.btn-yellow:hover) {
    background-color: #e0a800;
    color: #000;
    transform: translateY(-2px);
  }

  :global(.btn-yellow:hover) {
  background-color: #e0a800;
  color: #000;
  box-shadow: 0 0 10px rgba(252, 185, 0, 0.6);
  transform: translateY(-2px);
}

.underline-center {
  height: 4px;
  width: 80px;
  background-color: #fcb900;
  border-radius: 4px;
}
.yellow-glow-border {
  border: 2px solid #fcb900;
  box-shadow: 0 0 10px rgba(252, 185, 0, 0.4);
  transition: all 0.3s ease-in-out;
}

.yellow-glow-border:hover {
  box-shadow: 0 0 20px rgba(252, 185, 0, 0.6);
}
      .services-hero {
  position: relative;
  min-height: 500px;
  color: #fff;
  background-size: cover;
  background-position: center;
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

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.wave-separator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 1;
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

        /* Enhanced Styles for Services Page */
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
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          border: none !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05) !important;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(252, 185, 0, 0.1) !important;
        }

        .service-card .service-icon {
          color: #fcb900 !important;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1);
        }

        .service-card .card-title {
          position: relative;
          padding-bottom: 10px;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .service-card .card-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: #fcb900;
          transition: all 0.3s ease;
        }

        .service-card:hover .card-title:after {
          width: 80px;
        }

        .featured-card {
          position: relative;
          overflow: visible;
          border-top: 4px solid #fcb900 !important;
          box-shadow: 0 8px 25px rgba(252, 185, 0, 0.15) !important;
        }

        .service-card .bi-check-circle,
        .service-card .bi-check-circle-fill {
          color: #fcb900 !important;
        }

        .service-card ul li {
          transition: all 0.2s ease;
        }

        .service-card:hover ul li {
          transform: translateX(5px);
          transition-delay: calc(0.05s * var(--i, 0));
        }

        .service-card ul li:nth-child(1) { --i: 1; }
        .service-card ul li:nth-child(2) { --i: 2; }
        .service-card ul li:nth-child(3) { --i: 3; }
        .service-card ul li:nth-child(4) { --i: 4; }

        .why-partner-card {
          transition: all 0.3s ease;
        }

        .why-partner-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
        }

        .why-partner-icon {
          background-color: #fcb900 !important;
          transition: all 0.3s ease;
        }

        .why-partner-card:hover .why-partner-icon {
          transform: rotate(10deg) scale(1.1);
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

        /* Responsive button styling */
        .btn-responsive {
          font-size: clamp(0.9rem, 3vw, 1.1rem);
          padding: 0.5rem 1rem;
        }

        @media (max-width: 576px) {
          .workflow-step h4 {
            font-size: 1.1rem;
          }
          
          .service-card .card-body {
            padding: 1rem !important;
          }
          
          .service-card ul li {
            font-size: 0.9rem;
          }
          
          .service-card .card-title {
            font-size: 1.2rem !important;
          }
        }

        /* Workflow Section Styles */
        .workflow-container {
          position: relative;
          padding: 2rem 0;
        }

        .workflow-step {
          position: relative;
          z-index: 1;
          background: white;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .workflow-step:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .workflow-icon-container {
          transition: all 0.3s ease;
        }

        .workflow-step:hover .workflow-icon-container {
          transform: scale(1.1);
        }

        .workflow-connector {
          position: absolute;
          top: 50%;
          left: 10%;
          right: 10%;
          height: 2px;
          background: linear-gradient(to right, rgba(13,110,253,0.1), rgba(13,110,253,0.7), rgba(13,110,253,0.1));
          transform: translateY(-50%);
          z-index: 0;
        }

        @media (max-width: 768px) {
          .workflow-connector {
            display: none;
          }
          
          .workflow-step {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
} 
