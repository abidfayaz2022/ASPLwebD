'use client';

import React from 'react';

const TermsAndConditions = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="privacy-hero py-5 bg-light">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Terms and Conditions
          </h1>
          <p className="lead text-muted">Effective Date: 01.05.2025</p>
          <div className="d-inline-block">
            <span className="badge bg-warning text-dark px-3 py-2 mb-3">Official Legal Document</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="privacy-content py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12 px-md-2 px-sm-2">
              <div className="card border-0 shadow-sm p-lg-4 p-md-3 p-sm-2 mb-5">
                <div className="card-body">

                  <h2 className="h4 fw-bold mb-4">1. Introduction</h2>
                  <p>
                    Welcome to the websites and platforms operated by Angel Services Pte. Ltd. ("Angel Services") and its associated companies, including affiliated entities (“we”, “us”, “our”). By accessing or using www.theangelservices.com, and our client platform (the “Platform”), you agree to be bound by these Terms and Conditions (“Terms”). If you do not agree, please do not use our websites, platforms, or services.
                  </p>

                  <h2 className="h4 fw-bold my-4">2. Use of Websites and Platform</h2>
                  <p>
                    You agree to use our websites and platform lawfully. If you create a client account to access services or corporate records, you are responsible for maintaining the confidentiality of your account credentials. Unauthorized access, misuse of client dashboards, or providing false information is prohibited.
                  </p>

                  <h2 className="h4 fw-bold my-4">3. Intellectual Property</h2>
                  <p>
                    All content, materials, trademarks, service marks, and software on our websites and platform are the property of Angel Services and its group companies unless otherwise indicated. Unauthorized use is prohibited.
                  </p>

                  <h2 className="h4 fw-bold my-4">4. Platform Services</h2>
                  <ul className="list-unstyled my-3">
                    {[
                      'Submit incorporation and service requests',
                      'Upload and manage corporate documents',
                      'View statutory information and compliance deadlines',
                      'Communicate with our service teams'
                    ].map((item, idx) => (
                      <li key={idx} className="d-flex align-items-start mb-2">
                        <i className="bi bi-arrow-right-circle text-primary me-2 mt-1" style={{ minWidth: '1rem' }}></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>We reserve the right to monitor, suspend, or terminate Platform access if Terms are breached.</p>

                  <h2 className="h4 fw-bold my-4">5. No Legal Advice</h2>
                  <p>
                    Information provided via websites, emails, or the Platform does not constitute legal or professional advice unless expressly confirmed in writing under a specific engagement.
                  </p>

                  <h2 className="h4 fw-bold my-4">6. Limitation of Liability</h2>
                  <p>
                    We are not liable for any losses arising from use or inability to use our websites, Platform, or services, except where required by applicable laws.
                  </p>

                  <h2 className="h4 fw-bold my-4">7. Governing Law</h2>
                  <p>
                    These Terms are governed by the laws of Singapore. Any disputes shall be subject to the exclusive jurisdiction of Singapore courts.
                  </p>

                  <h2 className="h4 fw-bold my-4">8. Updates to Terms</h2>
                  <p>
                    We may amend these Terms at any time by posting updated versions online.
                  </p>
                </div>
              </div>

              <div className="text-center mb-5">
                <p className="text-muted mb-4">Last updated: May 1, 2025</p>
                <a href="/" className="btn btn-orange rounded-pill px-md-4 py-md-2 px-3 py-2 mt-2">
                  <i className="bi bi-arrow-left me-2"></i> Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
