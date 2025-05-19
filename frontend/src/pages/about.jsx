'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FaUserFriends, FaGlobe, FaStar } from 'react-icons/fa';

const TeamCard = ({ member }) => (
  <div className="card team-card h-100 shadow-sm">
    <div className="card-body text-center p-3 p-md-4">
      <Image
        src={member.img}
        alt={member.name}
        width={150}
        height={150}
        className="team-member-img mb-3 rounded-circle"
        style={{ objectFit: 'cover', width: 'clamp(120px, 30vw, 150px)', height: 'clamp(120px, 30vw, 150px)' }}
      />
      <h4 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>{member.name}</h4>
      <p className="text-muted" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{member.role}</p>

      {/* 🔽 Wrap this section in a.team-member-description div */}
      <div className="team-member-description">
        <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', textAlign: 'justify' }}>{member.description}</p>
        {(member.linkedin || member.email) && (
          <div className="d-flex justify-content-center gap-3 mb-3">
            {member.linkedin && (
              <Link href={member.linkedin} target="_blank" title="LinkedIn" style={{ color: '#0A66C2', fontSize: '1.2rem' }}>
                <i className="bi bi-linkedin"></i>
              </Link>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} title="Email" style={{ color: '#D44638', fontSize: '1.2rem' }}>
                <i className="bi bi-envelope-fill"></i>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

const WhyChooseStats = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="why-choose-section py-5 bg-light" ref={ref}>
      <div className="container text-center">
        <h2
          className="text-center mb-3 mb-md-4 text-dark"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          Why choose Angel Services?
        </h2>
        <div className="underline-center mx-auto mb-4" style={{ color: '#fcb900' }}></div>


        <p className="text-muted mb-5">Our track record speaks for itself</p>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="mb-3" style={{ color: '#fcb900' }}>
              <FaUserFriends size={40} />
            </div>
            <h3 className="fw-bold" style={{ color: '#000' }}>
              {inView ? <CountUp end={125} duration={2} /> : 125}
            </h3>
            <p className="fw-bold">Clients Served</p>
          </div>

          <div className="col-md-4">
            <div className="mb-3" style={{ color: '#fcb900' }}>
              <FaGlobe size={40} />
            </div>
            <h3 className="fw-bold">
              <span style={{ color: '#000' }}>
                {inView ? <CountUp end={9} duration={2} /> : 9}
              </span>{' '}

            </h3>
            <p className="fw-bold">Countries</p>
          </div>

          <div className="col-md-4">
            <div className="mb-3" style={{ color: '#fcb900' }}>
              <FaStar size={40} />
            </div>
            <h3 className="fw-bold" style={{ color: '#000' }}>2010</h3>
            <p className="fw-bold">Serving Clients Globally Since</p>
          </div>
        </div>
      </div>
    </section>
  );
};


const AboutUs = () => {
  return (
    <div>
      {/* About Header */}

      <section
        className="about-hero position-relative text-white"
        style={{
          background:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/about-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          minHeight: '500px',
        }}
      >
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <div className="row py-5 min-vh-40">
            <div className="col-lg-10 mx-auto text-center">
              <h1 className="display-3 fw-bold text-white mb-4 text-shadow">About Us</h1>
              <p className="lead text-white mb-5 fs-4 fw-light">
              Angel Services supports businesses and NRIs with strategic, reliable solutions in finance, compliance, and incorporation across Asia and offshore jurisdictions.
              </p>


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

      {/* About Content */}
      <section className="about-content py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Who We Are</h2>
              <p style={{ textAlign: 'justify' }}>
                At Angel Services, we enable businesses to start, grow, and scale with confidence.
                We bring together the agility of a dedicated consultancy with the expertise of a global corporate services provider.
                We specialize in incorporation, accounting, tax compliance, and financial outsourcing services across Asia and beyond—including Singapore, Indonesia, Vietnam, UAE, Hong Kong, BVI, and the Cayman Islands.
                Whether you're launching a startup or expanding internationally, we provide tailored support to help you
                navigate jurisdictional regulations, structure your operations efficiently, and stay compliant.
              </p>
              <p style={{ textAlign: 'justify' }}>
                With a collaborative team, regional presence, and technology-driven processes, we are committed to
                delivering timely, reliable, and strategic solutions—so that you can focus on what matters most: your business.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="/images/professional_team.jpg"
                alt="Professional team"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm yellow-glow-border">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3 bg-primary-subtle p-3 rounded-circle">
                      <i className="bi bi-rocket-takeoff fs-3 text-primary"></i>
                    </div>
                    <h3 className="card-title mb-0">Our Mission</h3>
                  </div>
                  <p className="card-text" style={{ textAlign: 'justify' }}>
                    Our mission is to provide agile, client-focused corporate and financial services—ranging from
                    incorporation and licensing to accounting and regulatory compliance—helping businesses launch confidently
                    and grow sustainably in diverse markets.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm yellow-glow-border">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3 bg-primary-subtle p-3 rounded-circle">
                      <i className="bi bi-eye fs-3 text-primary"></i>
                    </div>
                    <h3 className="card-title mb-0">Our Vision</h3>
                  </div>
                  <p className="card-text" style={{ textAlign: 'justify' }}>
                    To be the trusted partner for businesses across the globe, empowering them to start, structure, and scale
                    through seamless incorporation, compliance, and financial solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>Our Core Values</h2>
          <div className="underline-center mx-auto mb-5"></div>
          <div className="row g-4">
            {/* Core Value Card - Client-Centricity */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div
                    className="mb-3 d-inline-flex justify-content-center align-items-center bg-primary-subtle rounded-circle"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <i className="bi bi-people-fill fs-2 text-primary"></i>
                  </div>
                  <h4 className="fw-bold">Client-Centricity</h4>
                  <p className="text-primary mb-3">Your business is our priority.</p>
                  <p>We listen, understand, and tailor our solutions to support your goals—every step of the way.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div
                    className="mb-3 d-inline-flex justify-content-center align-items-center bg-primary-subtle rounded-circle"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <i className="bi bi-shield-check fs-2 text-primary"></i>
                  </div>
                  <h4 className="fw-bold">Integrity & Compliance</h4>
                  <p className="text-primary mb-3">Do it right, always.</p>
                  <p>
                    We maintain the highest standards of ethics, transparency, and adherence to regulations across jurisdictions.
                  </p>
                </div>
              </div>
            </div>

            {/* Repeat similar blocks for other cards */}
            {/* Card 2 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div
                    className="mb-3 d-inline-flex justify-content-center align-items-center bg-primary-subtle rounded-circle"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <i className="bi bi-rocket-takeoff fs-2 text-primary"></i>
                  </div>
                  <h4 className="fw-bold">Agility & Adaptability</h4>
                  <p className="text-primary mb-3">Solutions that evolve with you.</p>
                  <p>
                    We move quickly and adapt to changing regulations, markets, and client needs with flexible, reliable support.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div
                    className="mb-3 d-inline-flex justify-content-center align-items-center bg-primary-subtle rounded-circle"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <i className="bi bi-bullseye fs-2 text-primary"></i>
                  </div>
                  <h4 className="fw-bold">Expertise with Accountability</h4>
                  <p className="text-primary mb-3">Led by professionals, driven by results.</p>
                  <p>
                    Our experienced team delivers with precision, taking full ownership of client outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div
                    className="mb-3 d-inline-flex justify-content-center align-items-center bg-primary-subtle rounded-circle"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <i className="bi bi-hand-thumbs-up fs-2 text-primary"></i>
                  </div>
                  <h4 className="fw-bold">Collaboration & Independence</h4>
                  <p className="text-primary mb-3">Rooted in partnership, built with focus.</p>
                  <p>
                    Aligned with the Angel Services Group, we maintain operational independence to serve clients with personal attention.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div
                    className="mb-3 d-inline-flex justify-content-center align-items-center bg-primary-subtle rounded-circle"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <i className="bi bi-globe fs-2 text-primary"></i>
                  </div>
                  <h4 className="fw-bold">Cross-Border Mindset</h4>
                  <p className="text-primary mb-3">Local knowledge, global reach.</p>
                  <p>
                    From Singapore to BVI, we help you navigate international expansion with clarity and confidence.
                  </p>
                </div>
              </div>
            </div>




            {/* Add more core value cards here as needed */}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team py-4 py-md-5 bg-light" id="team">
        <div className="container">
          <h2
            className="text-center mb-3 mb-md-4 text-dark"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Our Team
          </h2>
          <div className="underline-center mx-auto mb-4"></div>

                {/* Leadership Section */}
<h3 className="text-center mb-3 mb-md-4 text-dark">Leadership</h3>
<div className="row g-4 justify-content-center">
  {[
    {
      name: 'Rajat Gupta',
      role: 'Managing Director',
      img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Rajat.jpg',
      linkedin: 'https://www.linkedin.com/in/guptarajat13/',
      email: 'rajat.gupta@theangelservices.com',
      description: 'Rajat is an accomplished professional with over 18 years of experience in finance and business administration across multiple industries. His expertise includes financial management, capital raising, accounting, taxation, secretarial, and human resources with a strong understanding of regional laws and regulations.',
    },
    {
      name: "Malcolm D'souza",
      role: 'Director',
      img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Malcolm.jpg',
      linkedin: 'https://www.linkedin.com/in/malcolmdsouza/',
      email: 'malcolmd.dsouza@gmail.com',
      description: 'Malcolm brings over 14 years of deep knowledge and experience in Enterprise Risk Management and Structured Trade Finance across global Commodity Trade Houses and International Banks in Singapore, Dubai and Abu Dhabi. His expertise includes Credit and Operational Risk Management, Counterpart Due Diligence, and Sanctions/Compliance Risk Management.',
    },
    {
      name: 'Monika Jain',
      role: 'Director – India Operations',
      img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Monika.jpg',
      linkedin: 'https://in.linkedin.com/in/monika-jain-ab545914',
      email: 'monika.jain@theangelservices.com',
      description: `Monika Jain is a Chartered Accountant with 15+ years of experience in finance, compliance, and BPO. A former PwC specialist, she excels in statutory audits, IFRS, US GAAP, and financial advisory. Monika drives global business expansion by facilitating regulatory compliance, and scalable finance outsourcing from an India-based back office, streamlining processes and empowering growth.`,
    },
    {
      name: 'Sriniwas Nandiraju',
      role: 'Director – UAE Operations',
      img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Sriniwas.jpg', // Ensure this image exists in your /public/images folder
      linkedin: '', // Add LinkedIn if available
      email: 'sriniwas.nandiraju@theangelservices.com',
      description: `Sriniwas Nandiraju brings over 20 years of global experience in private banking, wealth tech, and regulatory consulting. As a strategic partner to Angel Services, he supports clients in cross-border structuring, DIFC-based setups, and family office advisory—combining deep regulatory insight with practical expertise in wealth management and institutional engagement across the GCC.`,
    }
  ].map(member => (
    <div className="col-md-6" key={member.name}>
      <TeamCard member={member} />
    </div>
  ))}
</div>


          {/* Advisors Section */}
          <h3 className="text-center text-dark mt-5 mb-4">Advisors</h3>
          <div className="row g-4 justify-content-center">
            {[
              {
                name: 'Rahul Saxena',
                role: 'Advisor',
                img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Rahul.jpg',
                linkedin: 'https://www.linkedin.com/in/rahul-s-saxena/',
                email: 'r@theangelservices.com',
                description: "Rahul has 20 years of experience driving Digital Capabilities across Technology, Services, Consumer Goods, Beverages, Healthcare and Pharma industries. His strategic advisory and digital expertise guide the company's technology innovation and expansion.",
              },
                            {
                name: 'Willie Tan',
                role: 'Advisor',
                img: '',
                linkedin: 'https://www.linkedin.com/in/willie-t-7140561/',
                email: 'will.tgif@gmail.com',
                description: `Willie Tan is a seasoned advisor with over 20 years' experience in FDI, public-private partnerships, and strategic market development across Asia.
He has held senior roles for business growth, stakeholder engagement, and regional investment promotion.`,
              },
              {
                name: 'Navin Bafna',
                role: 'Advisor',
                img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Navin.jpg',
                linkedin: 'https://www.linkedin.com/in/navin-bafna-9ba68915/',
                email: '',
                description: 'Navin has 15 years of experience managing Corporate Finance across Consulting, Food & Real-Estate industries. His financial expertise and strategic insights help shape Angel Services business direction and financial strategy.',
              }

            ].map(member => (
              <div className="col-md-4" key={member.name}>
                <TeamCard member={member} />
              </div>
            ))}
          </div>

          {/* Operations Section */}
          <h3 className="text-center text-dark mt-5 mb-4">Operations</h3>
          <div className="row g-4 justify-content-center">
            {[
              {
                name: 'Gaurav Agarwal',
                role: 'Senior Associate',
                img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Gaurav Agarwal.jpg',
                linkedin: 'https://in.linkedin.com/in/gaurav-agarwal-374a49114',
                email: 'gaurav.agarwal@theangelservices.com',
                description: `With 13+ years of experience in accounting, finance, and operational strategy, Gaurav Agarwal specializes in streamlining financial processes and ensuring compliance. A key contributor to our outsourcing and overseas setup services, he drives efficiency and regulatory adherence to support sustainable growth.`,
              },
              {
                name: 'Mohd. Samad',
                role: 'Associate',
                img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Samad.jpg',
                linkedin: 'https://in.linkedin.com/in/mohd-samad-99368125b',
                email: 'mohd.samad@theangelservices.com',
                description: `Samad, a Chartered Accountant, specializes in financial reporting under Ind AS and SFRS, tax advisory, and process improvement. His expertise ensures compliance and accurate financial management, helping businesses optimize processes and navigate complex tax landscapes for sustainable growth.`,
              },
              {
                name: 'Pinak Pani Dixit',
                role: 'Associate',
                img: 'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/Pinak.jpg',
                linkedin: 'https://in.linkedin.com/in/pinakpanidixit',
                email: 'pinak.dixit@theangelservices.com',
                description: `Pinak Pani Dixit drives scalable tech development by aligning engineering with business goals. As Product Engineering Manager, he leads cross-functional teams to build robust, future-ready platforms that support growth. His expertise ensures precise, high-impact execution across product lifecycles and technical operations.`,
              }
            ].map(member => (
              <div className="col-md-4" key={member.name}>
                <TeamCard member={member} />
              </div>
            ))}
          </div>

        </div>
      </section>
      <WhyChooseStats />


      {/* Inline CSS */}
      <style jsx>{`
 .text-shadow {
      text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
    }

    .btn-yellow {
      background-color: #fcb900;
      border: none;
      color: #000;
      font-weight: 600;
      transition: all 0.3s ease;
    }
   .btn-yellow-dark {
      background-color: #fcb900;
      border: none;
      color: #000;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-yellow-dark:hover {
      background-color: #e0a800;
      transform: translateY(-2px);
      box-shadow: 0 0 12px rgba(252, 185, 0, 0.5);
    }

    .btn-yellow:hover {
      background-color: #e0a800;
      color: #000;
      transform: translateY(-2px);
      box-shadow: 0 0 10px rgba(252, 185, 0, 0.5);
    }

    .animated-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .circle-1,
    .circle-2,
    .circle-3 {
      position: absolute;
      border-radius: 50%;
      background: rgba(244, 200, 67, 0.5);
      animation: float 6s ease-in-out infinite;
    }

    .circle-1 {
      width: 300px;
      height: 300px;
      top: -150px;
      right: -150px;
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
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    .wave-separator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      line-height: 0;
      z-index: 1;
    }

    .min-vh-40 {
      min-height: 40vh;
    }

.why-choose-section {
  background-color: #f9fafb;
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

.team-member-description p {
  text-align: justify;
}

        .bg-primary-subtle {
          background-color: #f4f4f4 !important;
        }
        .team-member-img {
          max-width: 100%;
          height: auto;
          border-radius: 50%;
        }
           .bg-primary-subtle {
    background-color: #f4f4f4 !important;
  }
  .team-member-img {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
  }

  .team-member-description {
    opacity: 0;
    visibility: hidden;
    max-height: 0;
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .team-card:hover .team-member-description {
    opacity: 1;
    visibility: visible;
    max-height: 500px;
  }
    .underline-center {
  height: 4px;
  width: 80px;
  background: linear-gradient(to right, #fcb900, rgba(252, 185, 0, 0.5));
  border-radius: 4px;
}

      `}</style>
    </div>
  );
};

export default AboutUs;
