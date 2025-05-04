"use client";

import Image from 'next/image';
import Link from 'next/link';
import ServicesOffered from '../../components/incorporation/serviceoffered';
import WhyUs from '../../components/incorporation/whyUs';
import ContactCTA from '../../components/incorporation/contactCta';

const ServicesIncorporation = () => {
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
                                    Global Business Solutions
                                </span>
                            </div>
                            <h1 className="display-3 fw-bold text-white mb-4 text-shadow">
                                Incorporation Services Across Strategic Global Jurisdictions
                            </h1>
                            <p className="lead text-white mb-5 fs-4 fw-light">
                                Set up your business with confidence – from Asia to offshore destinations
                            </p>
                            <div className="hero-buttons">
                                <a
                                    href="#jurisdictions"
                                    className="btn btn-light btn-lg rounded-pill px-4 py-3 fw-semibold me-2 mb-2 mb-md-0 shadow-sm"
                                >
                                    Explore Jurisdictions <i className="bi bi-arrow-down-circle ms-2"></i>
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
                                            <div className="intro-icon p-4 rounded-circle bg-primary bg-opacity-10 d-inline-flex">
                                                <i
                                                    className="bi bi-globe-americas text-primary"
                                                    style={{ fontSize: '4rem' }}
                                                ></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <h2 className="fw-bold text-dark mb-3">Global Incorporation Experts</h2>
                                            <p className="lead text-dark mb-0">
                                                At Angel Services, we provide comprehensive business incorporation
                                                solutions designed to support entrepreneurs, SMEs, and multinational
                                                companies across diverse industries. Whether you're expanding
                                                internationally or setting up your first venture, our team ensures a
                                                seamless experience from start to finish.
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

            {/* Jurisdictions Section */}
            <section id="jurisdictions" className="jurisdictions py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold text-dark mb-2">Our Incorporation Jurisdictions</h2>
                        <div className="divider-center mb-4"><span className="bg-primary"></span></div>
                        <p className="lead col-md-8 mx-auto text-dark">Strategic global locations tailored to your business needs</p>
                    </div>

                    <div className="row g-4">
                        {/* Singapore Card */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 jurisdiction-card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="card-img-top-container position-relative">
                                    <div className="img-wrapper">
                                        <Image
                                            src="/images/corporate/singapore.jpg"
                                            alt="Singapore Business District"
                                            width={400}
                                            height={180}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
                                    <div className="card-img-content position-absolute bottom-0 start-0 p-4 w-100">
                                        <div className="d-flex align-items-center">
                                            <Image
                                                src="/images/flags/singapore.svg"
                                                alt="Singapore Flag"
                                                width={30}
                                                height={30}
                                                className="me-3 flag-icon"
                                            />
                                            <h3 className="card-title text-white fw-bold m-0">Singapore</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="card-content-wrapper">
                                        <p className="card-text text-dark mb-3">Asia's leading financial and innovation hub with robust governance and tax advantages.</p>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Financial hub status</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Robust legal framework</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Attractive tax incentives</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hong Kong Card */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 jurisdiction-card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="card-img-top-container position-relative">
                                    <div className="img-wrapper">
                                        <Image
                                            src="/images/corporate/hong-kong.jpg"
                                            alt="Hong Kong Business District"
                                            width={400}
                                            height={180}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
                                    <div className="card-img-content position-absolute bottom-0 start-0 p-4 w-100">
                                        <div className="d-flex align-items-center">
                                            <Image
                                                src="/images/flags/hong-kong.svg"
                                                alt="Hong Kong Flag"
                                                width={30}
                                                height={30}
                                                className="me-3 flag-icon"
                                            />
                                            <h3 className="card-title text-white fw-bold m-0">Hong Kong</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="card-content-wrapper">
                                        <p className="card-text text-dark mb-3">A global financial gateway with a simple tax regime, ideal for trade and international structuring.</p>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Simple tax structure</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">International trade hub</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Efficient business setup</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Indonesia & Vietnam Card */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 jurisdiction-card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="card-img-top-container position-relative">
                                    <div className="img-wrapper">
                                        <Image
                                            src="/images/corporate/indonesia.jpg"
                                            alt="Indonesia Business District"
                                            width={400}
                                            height={180}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
                                    <div className="card-img-content position-absolute bottom-0 start-0 p-4 w-100">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex">
                                                <Image
                                                    src="/images/flags/indonesia.svg"
                                                    alt="Indonesia Flag"
                                                    width={25}
                                                    height={25}
                                                    className="me-1 flag-icon"
                                                />
                                                <Image
                                                    src="/images/flags/vietnam.svg"
                                                    alt="Vietnam Flag"
                                                    width={25}
                                                    height={25}
                                                    className="me-2 flag-icon"
                                                />
                                            </div>
                                            <h3 className="card-title text-white fw-bold m-0">Indonesia & Vietnam</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="card-content-wrapper">
                                        <p className="card-text text-dark mb-3">High-growth Southeast Asian markets ideal for manufacturing, trading, and regional expansion.</p>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Manufacturing hubs</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Growing consumer markets</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Regional expansion base</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* UAE Card */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 jurisdiction-card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="card-img-top-container position-relative">
                                    <div className="img-wrapper">
                                        <Image
                                            src="/images/corporate/uae.jpg"
                                            alt="UAE Business District"
                                            width={400}
                                            height={180}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
                                    <div className="card-img-content position-absolute bottom-0 start-0 p-4 w-100">
                                        <div className="d-flex align-items-center">
                                            <Image
                                                src="/images/flags/uae.svg"
                                                alt="UAE Flag"
                                                width={30}
                                                height={30}
                                                className="me-3 flag-icon"
                                            />
                                            <h3 className="card-title text-white fw-bold m-0">United Arab Emirates</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="card-content-wrapper">
                                        <p className="card-text text-dark mb-3">Gateway to the Middle East, offering free zone, mainland, and offshore company structures.</p>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Free zone advantages</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">0% corporate tax options</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Strategic location</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BVI Card */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 jurisdiction-card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="card-img-top-container position-relative">
                                    <div className="img-wrapper">
                                        <Image
                                            src="/images/corporate/BVI-2.jpg"
                                            alt="BVI Business District"
                                            width={400}
                                            height={180}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
                                    <div className="card-img-content position-absolute bottom-0 start-0 p-4 w-100">
                                        <div className="d-flex align-items-center">
                                            <Image
                                                src="/images/flags/bvi.svg"
                                                alt="BVI Flag"
                                                width={30}
                                                height={30}
                                                className="me-3 flag-icon"
                                            />
                                            <h3 className="card-title text-white fw-bold m-0">British Virgin Islands</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="card-content-wrapper">
                                        <p className="card-text text-dark mb-3">Leading offshore jurisdiction for international business and investment holding structures.</p>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Tax-neutral jurisdiction</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">Asset protection</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-center">
                                                <span className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                                <span className="text-dark">International recognition</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Cayman island card */}

                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 jurisdiction-card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="card-img-top-container position-relative" style={{ height: '180px' }}>
                                    <Image
                                        src="/images/corporate/cayman-islands.jpg"
                                        alt="Cayman Islands Business Center"
                                        fill
                                        className="object-fit-cover w-100 h-100"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div
                                        className="overlay position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))',
                                        }}
                                    ></div>
                                    <div className="card-img-content position-absolute bottom-0 start-0 p-4 w-100">
                                        <div className="d-flex align-items-center">
                                            <Image
                                                src="/images/flags/cayman.svg"
                                                alt="Cayman Islands Flag"
                                                width={30}
                                                height={20}
                                                className="me-3 flag-icon"
                                            />
                                            <h3 className="card-title text-white fw-bold m-0">Cayman Islands</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="card-content-wrapper">
                                        <p className="card-text text-dark mb-3">
                                            Premium offshore jurisdiction for sophisticated investment structures and financial operations.
                                        </p>
                                        <ul className="list-unstyled mb-0">
                                            {[
                                                'Investment funds',
                                                'Tax neutrality',
                                                'Strong regulatory framework',
                                            ].map((item, index) => (
                                                <li key={index} className="mb-2 d-flex align-items-center">
                                                    <span
                                                        className="feature-check me-2 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                                                        style={{ width: '24px', height: '24px' }}
                                                    >
                                                        <i className="bi bi-check text-white"></i>
                                                    </span>
                                                    <span className="text-dark">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <ServicesOffered></ServicesOffered>
            <WhyUs></WhyUs>
            <ContactCTA></ContactCTA>


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

        .jurisdictions {
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

        .card-img-top-container {
          height: 180px;
          overflow: hidden;
        }

        .img-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7));
        }

        .feature-check {
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .flag-icon {
          object-fit: contain;
        }

        .jurisdiction-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .jurisdiction-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.175) !important;
        }

        .card-img-top-container img {
          transition: transform 0.3s ease;
        }

        .jurisdiction-card:hover .card-img-top-container img {
          transform: scale(1.05);
        }

        .btn {
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn-outline-light:hover {
          background-color: rgba(255, 255, 255, 0.1);
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

export default ServicesIncorporation; 