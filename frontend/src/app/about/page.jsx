'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutUs = () => {
    return (
        <div>
            {/* About Header */}
            <section className="about-header py-5 bg-light">
                <div className="container">
                    <h1 className="text-center text-dark">About ASPL Consultancy</h1>
                    <p className="lead text-center text-dark">
                        Your trusted partner in finance and business solutions
                    </p>
                </div>
            </section>

            {/* About Content */}
            <section className="about-content py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2>Who We Are</h2>
                            <p>
                                At ASPL Consultancy, we enable businesses to start, grow, and scale with confidence.
                                As an independent brand operating under the Angel Services umbrella, we bring together
                                the agility of a dedicated consultancy with the expertise of a global corporate services provider.
                            </p>
                            <p>
                                We specialize in incorporation, accounting, tax compliance, and financial outsourcing services across
                                Asia and beyond—including Singapore, Indonesia, Vietnam, UAE, Hong Kong, BVI, and the Cayman Islands.
                                Whether you're launching a startup or expanding internationally, we provide tailored support to help you
                                navigate jurisdictional regulations, structure your operations efficiently, and stay compliant.
                            </p>
                            <p>
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
            <section className="mission-vision py-5 bg-light">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="me-3 bg-primary-subtle p-3 rounded-circle">
                                            <i className="bi bi-rocket-takeoff fs-3 text-primary"></i>
                                        </div>
                                        <h3 className="card-title mb-0">Our Mission</h3>
                                    </div>
                                    <p className="card-text">
                                        Our mission is to provide agile, client-focused corporate and financial services—ranging from
                                        incorporation and licensing to accounting and regulatory compliance—helping businesses launch confidently
                                        and grow sustainably in diverse markets.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="me-3 bg-primary-subtle p-3 rounded-circle">
                                            <i className="bi bi-eye fs-3 text-primary"></i>
                                        </div>
                                        <h3 className="card-title mb-0">Our Vision</h3>
                                    </div>
                                    <p className="card-text">
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
                    <h2 className="text-center mb-5">Our Core Values</h2>
                    <div className="row g-4">
                        {/* Core Value Card - Client-Centricity */}
                        <div className="col-md-4">
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
            <section className="team py-4 py-md-5 bg-light">
                <div className="container">
                    <h2
                        className="text-center mb-4 mb-md-5 text-dark"
                        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
                    >
                        Our Team
                    </h2>
                    <div className="row g-3 g-md-4">

                        {/* Reusable team member card */}
                        {[{
                            name: 'Monika Jain',
                            role: 'Director',
                            img: '/images/Monika Jain.jpeg',
                            linkedin: 'https://in.linkedin.com/in/monika-jain-ab545914',
                            email: 'monika.jain@theangelservices.com',
                            description: `Monika Jain is a Chartered Accountant with 15+ years of experience in finance,
                                compliance, and BPO. A former PwC specialist, she excels in statutory audits, IFRS, US
                                GAAP, and financial advisory. Monika drives global business expansion by facilitating
                                regulatory compliance, and scalable finance outsourcing from an India-based back office,
                                streamlining processes and empowering growth.`,
                        }, {
                            name: 'Gaurav Bansal',
                            role: 'Advisor',
                            img: '/images/Gaurav Bansal.jpeg',
                            linkedin: 'https://in.linkedin.com/in/gaurav-bansal-91a5228b',
                            email: 'gaurav.bansal@theangelservices.com',
                            description: `
                            Gaurav Bansal is a Fellow Chartered
                                Accountant with 20+ years of experience in consulting, auditing, taxation, and financial
                                management. A trusted advisor to multinationals, banks, and startups, he excels in
                                guiding local setups and international expansion. As an expert in indirect
                                taxation—including GST, excise, and customs—Gaurav delivers strategic solutions for
                                regulatory compliance and operational efficiency, empowering businesses to scale
                                globally through effective finance and accounting outsourcing.
                            `,
                        }, {
                            name: 'Gaurav Agarwal',
                            role: 'Senior Associate',
                            img: '/images/Gaurav Agarwal.jpeg',
                            linkedin: 'https://in.linkedin.com/in/gaurav-agarwal-374a49114',
                            email: 'gaurav.agarwal@theangelservices.com',
                            description: `With over 13 years of experience in
                                accounting, finance, and operational strategy, Gaurav Agarwal specializes in optimizing
                                financial processes and ensuring compliance excellence. As a key contributor to our
                                finance & accounting outsourcing and overseas business setup solutions, he streamlines
                                financial operations and drives regulatory adherence. His collaborative approach and
                                problem-solving mindset empower businesses to scale sustainably and achieve long-term
                                success`,
                        }, {
                            name: 'Mohammad Samad',
                            role: 'Associate',
                            img: '/images/Samad.jpeg',
                            linkedin: 'https://in.linkedin.com/in/mohd-samad-99368125b',
                            email: 'mohd.samad@theangelservices.com',
                            description: `Samad is a Chartered Accountant specializing
                                in financial reporting under Ind AS and SFRS, tax advisory, and process improvement. His
                                technical expertise and leadership ensure compliance and accurate corporate financial
                                management. By optimizing financial processes and navigating complex tax landscapes,
                                Samad empowers businesses to achieve sustainable growth and operational efficiency.`,
                        }, {
                            name: 'Pinak Pani Dixit',
                            role: 'Associate',
                            img: '/images/Pinak.svg',
                            linkedin: 'https://in.linkedin.com/in/pinakpanidixit',
                            email: 'pinak.dixit@theangelservices.com',
                            description: `Pinak Pani Dixit drives the development of
                                scalable technology solutions by aligning engineering innovation with business goals. As
                                Manager, Product Engineering, he leads cross-functional teams to deliver robust,
                                future-ready platforms that support organizational growth. His expertise in managing
                                product lifecycles, optimizing technical operations, and fostering collaboration ensures
                                the company's technology initiatives are executed with precision and impact.`,
                        }].map((member, index) => (
                            <div className={`col-md-${index < 2 ? '6' : '4'}`} key={member.name}>
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
                                        <div className="team-member-description">
                                            <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{member.description}</p>
                                            <div className="d-flex justify-content-center gap-3 mb-3">
                                                <Link href={member.linkedin}
                                                    target="_blank" title="LinkedIn" style={{ color: '#0A66C2', fontSize: '1.2rem' }}>
                                                    <i className="bi bi-linkedin"></i>

                                                </Link>
                                                <a href={`mailto:${member.email}`} title="Email" style={{ color: '#D44638', fontSize: '1.2rem' }}>
                                                    <i className="bi bi-envelope-fill"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Inline CSS */}
            <style jsx>{`
        .bg-primary-subtle {
          background-color: #f4f4f4 !important;
        }
        .team-member-img {
          max-width: 100%;
          height: auto;
          border-radius: 50%;
        }
      `}</style>
        </div>
    );
};

export default AboutUs;
