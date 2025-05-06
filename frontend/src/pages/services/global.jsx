'use client';

import Image from 'next/image';
import Link from 'next/link';

const GlobalPresence = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative text-white">
        <div className="animated-bg">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>

        <div className="container py-5 position-relative z-2">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 text-center">
              <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-semibold mb-3">
                Global
              </span>
              <h1 className="display-4 fw-bold text-shadow">
                Global Support Across Strategic Jurisdictions
              </h1>
              <p className="lead fs-4 fw-light">
                Supporting businesses in Asia, the Middle East, and offshore territories
              </p>
              <div className="mt-4">
                <a href="#locations" className="btn btn-light btn-lg rounded-pill me-2 shadow-sm">
                  Explore Locations <i className="bi bi-arrow-down-circle ms-2"></i>
                </a>
                <Link href="/contact" className="btn btn-outline-light btn-lg rounded-pill">
                  Contact Us <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SVG Separator */}
        <div className="wave-separator">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64V100H0Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark">Our Global Jurisdictions</h2>
          </div>
          <div className="text-center mb-4">
            <h2 className="display-7 fw-bold text-dark">Global Presence</h2>
          </div>
          <div className="row g-4">
            <JurisdictionCard
              flag="/images/flags/singapore.svg"
              image="/images/corporate/singapore.jpg"
              title="Singapore"
              features={['Financial hub', 'Robust legal system', 'Tax incentives']}
            />
            <JurisdictionCard
              flag="/images/flags/uae.svg"
              image="/images/corporate/uae.jpg"
              title="United Arab Emirates"
              features={['Free zones', 'Strategic Gateway']}
            />
           <div className="col-md-6 col-lg-4">
  <a
    href="https://asplconsultancy.com/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <div className="card border-0 shadow-sm h-100">
      <div className="position-relative" style={{ height: '180px', overflow: 'hidden' }}>
        <Image
          src="/images/corporate/india.jpg"
          alt="India"
          width={400}
          height={180}
          className="object-fit-cover w-100 h-100"
        />
        <div className="position-absolute bottom-0 start-0 p-3 bg-dark bg-opacity-50 w-100">
          <div className="d-flex align-items-center">
            <Image src="/images/flags/india.svg" alt="flag" width={28} height={20} className="me-2" />
            <h5 className="text-white mb-0 fw-bold">India</h5>
          </div>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-unstyled mb-0">
          <li className="d-flex align-items-start mb-2">
            <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
            <span>NRI Services</span>
          </li>
          <li className="d-flex align-items-start mb-2">
            <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
            <span>Compliance Tools</span>
          </li>
          <li className="d-flex align-items-start mb-2">
            <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
            <span>Regional Experts</span>
          </li>
        </ul>
      </div>
    </div>
  </a>
</div>

            <div className="text-center mb-3 mt-5">
            <h2 className="display-7 fw-bold text-dark">Global Support</h2>
          </div>
            <JurisdictionCard
              flag="/images/flags/indonesia.svg"
              image="/images/corporate/indonesia.png"
              title="Indonesia"
              features={['Manufacturing base', 'Young workforce', 'Economic growth']}
            />
            <JurisdictionCard
              flag="/images/flags/vietnam.svg"
              image="/images/corporate/vietnam.jpg"
              title="Vietnam"
              features={['Growing market', 'Trade agreements', 'Skilled labor']}
            />
            <JurisdictionCard
              flag="/images/flags/hong-kong.svg"
              image="/images/corporate/hong-kong.jpg"
              title="Hong Kong"
              features={['Gateway to China', 'Common law system', 'Business-friendly']}
            />
            <JurisdictionCard
              flag="/images/flags/bvi.svg"
              image="/images/corporate/BVI-2.jpg"
              title="British Virgin Islands"
              features={['Tax neutral', 'Asset protection', 'Offshore entity']}
            />
            <JurisdictionCard
              flag="/images/flags/cayman.svg"
              image="/images/corporate/cayman-islands.jpg"
              title="Cayman Islands"
              features={['Investment hub', 'Regulatory strength', 'Offshore structures']}
            />
            <JurisdictionCard
              flag="/images/flags/nigeria-flag.png"
              image="/images/corporate/nigeria.jpg"
              title="Nigeria"
              features={['NRI Services', 'Compliance Tools', 'Regional Experts']}
            />
 
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        :root {
          --primary-color: #fcb900;
        }
        .hero-section {
          background: linear-gradient(90deg, var(--primary-color), #e59b00);
          overflow: hidden;
        }
        .animated-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }
        .circle {
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          position: absolute;
          animation: float 6s ease-in-out infinite;
        }
        .circle-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -150px;
        }
        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: -100px;
          left: -120px;
          animation-delay: 2s;
        }
        .circle-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          right: 15%;
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
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
        }
        .wave-separator {
          position: absolute;
          bottom: 0;
          width: 100%;
          line-height: 0;
        }
      `}</style>
    </>
  );
};

const JurisdictionCard = ({ flag, flagGroup, image, title, features }) => (
  <div className="col-md-6 col-lg-4">
    <div className="card border-0 shadow-sm h-100">
      <div className="position-relative" style={{ height: '180px', overflow: 'hidden' }}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={180}
          className="object-fit-cover w-100 h-100"
        />
        <div className="position-absolute bottom-0 start-0 p-3 bg-dark bg-opacity-50 w-100">
          <div className="d-flex align-items-center">
            {flag && (
              <Image src={flag} alt="flag" width={28} height={20} className="me-2" />
            )}
            {flagGroup &&
              flagGroup.map((f, i) => (
                <Image key={i} src={f} alt="flag" width={24} height={20} className="me-1" />
              ))}
            <h5 className="text-white mb-0 fw-bold">{title}</h5>
          </div>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-unstyled mb-0">
          {features.map((f, i) => (
            <li key={i} className="d-flex align-items-start mb-2">
              <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default GlobalPresence;
