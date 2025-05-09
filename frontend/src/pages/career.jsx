'use client';

import Link from 'next/link';

const CareerPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="career-hero-section position-relative">
  <div className="container py-5 position-relative z-2">
    <div className="row justify-content-center align-items-center text-center py-5">
      <div className="col-lg-10">
        <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-medium mb-3 shadow-sm">
          Join Our Team
        </span>
        <h1 className="display-4 fw-bold mb-3 text-dark">
          Careers at Angel Services
        </h1>
        <p className="lead text-muted mb-4 fs-5">
          Help global businesses and NRIs grow with integrity, precision, and professionalism.
        </p>
        <Link href="#openings" className="btn btn-warning rounded-pill px-4 py-2 fw-semibold shadow-sm transition-hover">
          View Open Positions <i className="bi bi-arrow-down ms-2" />
        </Link>
      </div>
    </div>
  </div>

  {/* Floating Gradient Circles */}
  <div className="career-bg-circles">
    <div className="orb orb-1" />
    <div className="orb orb-2" />
    <div className="orb orb-3" />
  </div>


        {/* Elegant Gradient Circles */}
        <div className="career-bg-decor">
          <div className="circle circle-1" />
          <div className="circle circle-2" />
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark display-6">Current Openings</h2>
            <p className="text-muted col-md-8 mx-auto">
              We’re hiring passionate professionals in consulting, client service, operations, and more.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                title: 'Client Success Associate',
                location: 'Agra Office / Hybrid',
                type: 'Full-Time',
                description: 'Support NRI and business clients through compliance, incorporation, and documentation processes.',
              },
              {
                title: 'Company Secretary Intern',
                location: 'Agra Office',
                type: 'Internship',
                description: 'Assist with ROC filings, corporate governance tasks, and client onboarding compliance.',
              },
              {
                title: 'Business Operations Executive',
                location: 'Remote / India',
                type: 'Contract',
                description: 'Coordinate between legal, finance, and onboarding teams to ensure smooth client experience.',
              },
            ].map((role, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="job-card p-4 h-100 bg-white rounded-3">
                  <h5 className="fw-bold text-dark">{role.title}</h5>
                  <p className="text-muted small mb-2">{role.type} | {role.location}</p>
                  <p className="text-secondary">{role.description}</p>
                  <Link href="/contact" className="btn btn-outline-dark rounded-pill mt-3 px-3 py-2">
                    Apply Now <i className="bi bi-arrow-right ms-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold display-6 mb-4 text-dark">
            Why Choose a Career at Angel Services?
          </h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                icon: 'bi-people',
                title: 'Client-Centric Culture',
                text: 'We place client trust and satisfaction at the core of everything we do.',
              },
              {
                icon: 'bi-briefcase',
                title: 'Professional Development',
                text: 'Build your domain expertise through real-world consulting assignments.',
              },
              {
                icon: 'bi-globe',
                title: 'Global Exposure',
                text: 'Work with clients from Singapore, UAE, India, and other international markets.',
              },
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="p-4 h-100 border rounded-3 bg-light-subtle">
                  <i className={`bi ${item.icon} fs-1 mb-3 text-warning`} />
                  <h6 className="fw-semibold text-dark">{item.title}</h6>
                  <p className="text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-5 bg-light">
        <div className="container">
          <h3 className="fw-bold mb-3 text-dark">Didn’t find the right role?</h3>
          <p className="text-muted mb-4">We’re always open to proactive, driven professionals.</p>
          <Link href="/contact" className="btn btn-warning rounded-pill px-4 py-2 fw-semibold">
            Send Your Resume <i className="bi bi-send ms-2" />
          </Link>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .career-hero-section {
      background: linear-gradient(90deg, #fff, #fdf9e6);
      overflow: hidden;
      position: relative;
    }

    .career-bg-circles {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(252, 185, 0, 0.15), transparent);
      animation: float 8s ease-in-out infinite;
      filter: blur(10px);
    }

    .orb-1 {
      width: 300px;
      height: 300px;
      top: -80px;
      left: -100px;
    }

    .orb-2 {
      width: 200px;
      height: 200px;
      bottom: -100px;
      right: -80px;
      animation-delay: 2s;
    }

    .orb-3 {
      width: 160px;
      height: 160px;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0) scale(1);
      }
      50% {
        transform: translateY(-10px) scale(1.03);
      }
    }

    .btn-warning {
      background-color: #fcb900;
      border: none;
      color: #000;
      transition: all 0.2s ease-in-out;
    }

    .btn-warning:hover {
      background-color: #e2a700;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
        .career-hero {
          background: linear-gradient(90deg, #ffffff, #fdfaf2);
          position: relative;
        }

        .career-bg-decor .circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(252, 185, 0, 0.15), transparent);
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          left: -100px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: -80px;
          right: -60px;
        }

        .job-card {
          border-left: 4px solid #fcb900;
          transition: box-shadow 0.3s ease;
        }

        .job-card:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }

        .btn-warning {
          background-color: #fcb900;
          color: #000;
          border: none;
          transition: transform 0.2s ease;
        }

        .btn-warning:hover {
          background-color: #e2a700;
          transform: translateY(-2px);
        }

        .btn-outline-dark:hover {
          background-color: #000;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default CareerPage;
