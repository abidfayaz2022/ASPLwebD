"use client";

import Image from "next/image";
import Link from "next/link";

const GlobalPresence = () => {
  return (
    <>
      <div style={{ backgroundColor: "#f8f9fa" }}>
      {/* Hero Section */}
      <section
        className="hero position-relative"
        style={{
          backgroundImage: 'url("/images/global-hero.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "60vh",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Elements */}
        <div className="animated-bg">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
        </div>

        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <div className="row min-vh-40 align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-3 fw-bold text-white mb-4 text-shadow">
                Global Business Services
              </h1>
              <p className="lead text-white mb-5 fs-4">
                Expert guidance and comprehensive solutions for your global
                business expansion
              </p>
   <a
                                    href="/contact"
                                    className="btn btn-yellow btn-lg rounded-pill px-4 py-3 fw-semibold me-2 mb-2 mb-md-0 shadow-sm"
                                >
                                    Get Started <i className="bi bi-arrow-right-circle ms-2"></i>
                                </a>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="wave-separator text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              fill="#f8f9fa"
              fillOpacity="1"
              d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark">
              Our Global Jurisdictions
            </h2>
          </div>
          <div className="text-center mb-4">
            <h2 className="display-7 fw-bold text-dark">Global Presence</h2>
            <p className="lead fs-4 fw-light">
              We operate as Angel Services in these locations
            </p>
          </div>
          <div className="row g-4">
            <JurisdictionCard
              flag="/images/flags/singapore.svg"
              image="/images/corporate/singapore.jpg"
              title="Singapore"
              features={[
                "Attractive Tax Regime",
                "World-Class Business Environment",
                "Gateway to Asia with Robust Infrastructure",
              ]}
            />
            <JurisdictionCard
              flag="/images/flags/uae.svg"
              image="/images/corporate/uae.jpg"
              title="United Arab Emirates"
              features={[
                "100% Foreign Ownership & Free Zones",
                "Tax-Efficient & Business-Friendly Jurisdiction",
                "Strategic Location with Global Connectivity",
              ]}
            />
            <div className="col-md-6 col-lg-4">
              <a
                href="https://asplconsultancy.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card border-0 shadow-sm h-100">
                  <div
                    className="position-relative"
                    style={{ height: "180px", overflow: "hidden" }}
                  >
                    <Image
                      src="/images/corporate/india.jpg"
                      alt="India"
                      width={400}
                      height={180}
                      className="object-fit-cover w-100 h-100"
                    />
                    <div className="position-absolute bottom-0 start-0 p-3 bg-dark bg-opacity-50 w-100">
                      <div className="d-flex align-items-center">
                        <Image
                          src="/images/flags/india.svg"
                          alt="flag"
                          width={28}
                          height={20}
                          className="me-2"
                        />
                        <h5 className="text-white mb-0 fw-bold">India</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex align-items-start mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                        <span>Diverse Entry Structures</span>
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                        <span>Regulatory Approvals & Tax Incentives</span>
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                        <span>Growing Market with Skilled Talent</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </a>
            </div>

            <div className="text-center mb-3 mt-5">
              <h2 className="display-7 fw-bold text-dark">Global Support</h2>
              <p className="lead fs-4 fw-light">
                We operate in these locations together with our trusted partners
              </p>
            </div>
            <JurisdictionCard
              flag="/images/flags/indonesia.svg"
              image="/images/corporate/indonesia.png"
              title="Indonesia"
              features={[
                "Manufacturing base",
                "Young workforce",
                "Economic growth",
              ]}
            />
            <JurisdictionCard
              flag="/images/flags/vietnam.svg"
              image="/images/corporate/vietnam.jpg"
              title="Vietnam"
              features={["Growing market", "Trade agreements", "Skilled labor"]}
            />
            <JurisdictionCard
              flag="/images/flags/hong-kong.svg"
              image="/images/corporate/hong-kong.jpg"
              title="Hong Kong"
              features={[
                "Gateway to China",
                "Common law system",
                "Business-friendly",
              ]}
            />
            <JurisdictionCard
              flag="/images/flags/bvi.svg"
              image="/images/corporate/BVI-2.jpg"
              title="British Virgin Islands"
              features={["Tax neutral", "Asset protection", "Offshore entity"]}
            />
            <JurisdictionCard
              flag="/images/flags/cayman.svg"
              image="/images/corporate/cayman-islands.jpg"
              title="Cayman Islands"
              features={[
                "Investment hub",
                "Regulatory strength",
                "Offshore structures",
              ]}
            />
            <JurisdictionCard
              flag="/images/flags/Nigeria-flag.png"
              image="/images/corporate/nigeria.jpg"
              title="Nigeria"
              features={[
                "Investment incentives",
                "Emerging start-up ecosystem",
                "Africa's largest consumer market",
              ]}
            />
          </div>
        </div>
      </section></div>

      <style jsx>{`
        :root {
          --primary-color: #fcb900;
        }
        .hero {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
          min-height: 500px;
          color: #fff;
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
          0%,
          100% {
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
      <div
        className="position-relative"
        style={{ height: "180px", overflow: "hidden" }}
      >
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
              <Image
                src={flag}
                alt="flag"
                width={28}
                height={20}
                className="me-2"
              />
            )}
            {flagGroup &&
              flagGroup.map((f, i) => (
                <Image
                  key={i}
                  src={f}
                  alt="flag"
                  width={24}
                  height={20}
                  className="me-1"
                />
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