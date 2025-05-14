'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CareerPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const jobCategories = [
    { id: 'all', name: 'All Roles', icon: 'bi-grid' },
    { id: 'finance', name: 'Finance & Accounting', icon: 'bi-cash-stack' },
    { id: 'compliance', name: 'Compliance & Legal', icon: 'bi-shield-check' },
    { id: 'operations', name: 'Operations', icon: 'bi-gear' },
    { id: 'technology', name: 'Technology', icon: 'bi-code-slash' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Assistant Manager - Accounts',
      category: 'finance',
      location: 'Singapore',
      type: 'Full-Time',
      department: 'Finance & Compliance',
      experience: '3-5 years',
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Senior Tax Consultant',
      category: 'compliance',
      location: 'Dubai',
      type: 'Full-Time',
      department: 'Tax Advisory',
      experience: '5-8 years',
      postedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Corporate Legal Associate',
      category: 'compliance',
      location: 'Hong Kong',
      type: 'Full-Time',
      department: 'Legal',
      experience: '2-4 years',
      postedDate: '3 days ago'
    },
    {
      id: 4,
      title: 'Senior Frontend Developer',
      category: 'technology',
      location: 'Singapore',
      type: 'Full-Time',
      department: 'Technology',
      experience: '4-6 years',
      postedDate: '1 day ago'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      category: 'technology',
      location: 'Dubai',
      type: 'Full-Time',
      department: 'Technology',
      experience: '3-5 years',
      postedDate: '4 days ago'
    }
  ];

  const filteredJobs = selectedCategory === 'all'
    ? jobs
    : jobs.filter(job => job.category === selectedCategory);

  return (
    <div className="careers-page bg-white text-dark">
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden bg-white">
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="container py-8 position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <div className="badge-wrapper mb-4">
                  <span className="badge bg-warning text-dark px-4 py-2 rounded-pill animate-pulse">
                    <i className="bi bi-lightning-charge-fill me-2"></i>We're Hiring!
                  </span>
                </div>
                <h1 className="display-3 fw-bold mb-4 text-black">
                  Join Our Team of
                  <span className="gradient-text d-block mt-2">Global Innovators</span>
                </h1>
                <p className="lead fs-4 text-gray-600 mb-5">
                  Be part of a dynamic team shaping the future of global business services.
                  We're looking for exceptional talent to drive innovation forward.
                </p>
                <a
                  href="#open-positions"
                  className="cta-button btn btn-lg px-5 py-3 fw-semibold"
                >
                  View Open Positions
                  <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-illustration">
                <Image
                  src="/images/team-illus.png"
                  alt="Team Collaboration Illustration"
                  width={600}
                  height={300}
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
         .hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding-top: 0rem;
  padding-bottom: 4rem;
}


          .animated-shapes .shape {
            position: absolute;
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
          }

          .shape-1 {
            width: 100px;
            height: 100px;
            background: #fcb900;
            top: 10%;
            right: 10%;
            opacity: 0.1;
          }

          .shape-2 {
            width: 150px;
            height: 150px;
            background: #000;
            bottom: 20%;
            left: 5%;
            opacity: 0.05;
          }

          .shape-3 {
            width: 70px;
            height: 70px;
            background: #fcb900;
            top: 50%;
            left: 50%;
            opacity: 0.1;
          }

          .shape-4 {
            width: 120px;
            height: 120px;
            background: #000;
            top: 30%;
            left: 30%;
            opacity: 0.05;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          .gradient-text {
            background: linear-gradient(45deg, #fcb900, #ff9500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .animate-pulse {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }

          .cta-button {
            background: #fcb900;
            color: #000;
            border: none;
            transition: all 0.3s ease;
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(252, 185, 0, 0.2);
            background: #ffd700;
          }

          .py-8 {
  padding-top: 2rem;  /* instead of 6rem */
  padding-bottom: 4rem;
}


          .bg-yellow {
            background-color: #fcb900;
          }

          .text-gray-600 {
            color: #666666;
          }

          .text-gray-500 {
            color: #999;
          }

          .job-card {
            background: #fff;
            border: 1px solid #eee;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .job-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 24px rgba(252, 185, 0, 0.1);
            border-color: #fcb900;
          }

          .job-card h3 {
            font-size: 1.25rem;
          }

          .job-card ul li i {
            font-size: 1.1rem;
          }

          .border-hover:hover {
            border-color: #fcb900;
          }

          .hover-lift:hover {
            transform: translateY(-5px);
          }

          .hover-scale {
            transition: all 0.3s ease;
          }

          .hover-scale:hover {
            transform: scale(1.02);
          }

          .fs-sm {
            font-size: 0.875rem;
          }
.active-filter,
.inactive-filter {
  cursor: pointer;
}

.active-filter {
  background-color: #fcb900;
  color: #000;
  border: none;
  box-shadow: 0 4px 12px rgba(252, 185, 0, 0.25);
  transform: scale(1.05);
}

.inactive-filter {
  background-color: #fffbe6;
  color: #000;
  border: 2px solid #fcb900;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(252, 185, 0, 0.1);
}

.inactive-filter:hover {
  background-color: #fcb900;
  color: #000;
}


          @media (max-width: 991px) {
            .hero-illustration {
              margin-top: 3rem;
            }
          }
        `}</style>
      </section>

      {/* Job Categories Filter */}
      <section className="py-8 bg-white" id="open-positions">
        <div className="container text-center">
          <h2 className="display-6 fw-bold mb-4">Open Positions</h2>
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            {jobCategories.map(category => (
              <button
                key={category.id}
                className={`d-flex align-items-center gap-2 rounded-pill px-4 py-2 fw-semibold ${selectedCategory === category.id ? 'active-filter' : 'inactive-filter'}`}

                onClick={() => setSelectedCategory(category.id)}
              >
                <i className={`bi ${category.icon}`}></i> {category.name}
              </button>
            ))}
          </div>
          <div className="row g-4">
            {filteredJobs.map(job => (
              <div key={job.id} className="col-md-6 col-lg-4">
                <div className="job-card h-100 rounded-4 p-5 bg-white shadow border-hover hover-lift">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-yellow text-black rounded-pill px-3 py-2 fw-semibold">
                      <i className="bi bi-briefcase me-1"></i> {job.department}
                    </span>
                    <small className="text-muted">{job.postedDate}</small>
                  </div>

                  <h3 className="h5 fw-bold text-black mb-3">{job.title}</h3>
                  <hr className="text-light my-3" />

                  <ul className="list-unstyled mb-4 text-gray-600">
                    <li className="mb-2 d-flex align-items-center">
                      <i className="bi bi-geo-alt me-2 text-warning"></i> {job.location}
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <i className="bi bi-clock me-2 text-warning"></i> {job.experience}
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-calendar-check me-2 text-warning"></i> {job.type}
                    </li>
                  </ul>

                  <Link 
                    href={`/apply?job=${encodeURIComponent(job.title)}`}
                    className="btn d-flex justify-content-center align-items-center w-100 rounded-pill py-3 fw-semibold hover-scale"
                    style={{ backgroundColor: '#fcb900', color: '#000' }}
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
