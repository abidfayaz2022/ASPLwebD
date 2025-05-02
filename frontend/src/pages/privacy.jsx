'use client'; // Optional: only if interactivity is needed

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="privacy-hero py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="display-4 fw-bold mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                Privacy Policy
              </h1>
              <p className="lead text-muted">Effective Date: 01.05.2025</p>
              <div className="d-inline-block">
                <span className="badge bg-warning text-dark px-3 py-2 mb-3">Official Legal Document</span>
              </div>
            </div>
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
                  {/* Section 1 */}
                  <h2 className="h4 fw-bold mb-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>1. Introduction</h2>
                  <p>Angel Services Pte. Ltd. and its associated companies ("we", "us", "our") are committed to protecting your privacy...</p>

                  {/* Section 2 */}
                  <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>2. Information We Collect</h2>
                  <p>We collect personal and corporate information when you:</p>
                  <ul className="list-unstyled my-3">
                    {[
                      'Browse our websites',
                      'Submit forms or inquiries',
                      'Create a client account on our Platform',
                      'Upload or access documents via your dashboard'
                    ].map((item, index) => (
                      <li key={index} className="d-flex align-items-start mb-3 flex-wrap">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1" style={{ minWidth: '1rem' }}></i>
                        <span style={{ flex: 1, minWidth: '200px' }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p>Collected information may include:</p>
                  <ul className="list-unstyled my-3">
                    {[
                      'Personal identity details (e.g., name, contact info, ID documents)',
                      'Corporate entity information (e.g., shareholder details, company records)',
                      'Financial, tax, and compliance data',
                      'Platform usage data (via cookies and analytics)'
                    ].map((item, index) => (
                      <li key={index} className="d-flex align-items-start mb-3 flex-wrap">
                        <i className="bi bi-circle-fill text-primary me-2 mt-1" style={{ fontSize: '0.5rem', minWidth: '0.5rem' }}></i>
                        <span style={{ flex: 1, minWidth: '200px' }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Section 3 */}
                  <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>3. How We Use Your Information</h2>
                  <p>We use your information to:</p>
                  <ul className="list-unstyled my-3">
                    {[
                      'Provide services requested (e.g., company incorporation, compliance)',
                      'Create and manage your client account and dashboard access',
                      'Communicate service updates and alerts',
                      'Comply with legal and regulatory obligations',
                      'Improve our services and user experience'
                    ].map((item, index) => (
                      <li key={index} className="d-flex align-items-start mb-3 flex-wrap">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1" style={{ minWidth: '1rem' }}></i>
                        <span style={{ flex: 1, minWidth: '200px' }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Section 4 */}
                  <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>4. Platform and Dashboard Data</h2>
                  <p>When you use our Platform:</p>
                  <ul className="list-unstyled my-3">
                    {[
                      'You control your submitted data and document uploads.',
                      'We store your corporate documents securely in data centers with adequate safeguards.',
                      'We will not share your confidential corporate data without your authorization unless legally required.'
                    ].map((item, index) => (
                      <li key={index} className="d-flex align-items-start mb-3 flex-wrap">
                        <i className="bi bi-shield-check text-primary me-2 mt-1" style={{ minWidth: '1rem' }}></i>
                        <span style={{ flex: 1, minWidth: '200px' }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Section 5-8 */}
                  <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>5. Security of Your Information</h2>
                  <p>We implement strong administrative, technical, and physical security measures to protect your information.</p>

                  <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>6. Cross-Border Transfers</h2>
                  <p>We may transfer your data between Singapore, India, UAE, and other jurisdictions...</p>

                  <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>7. Your Rights</h2>
                  <p>You may request access to, correction of, or deletion of your personal data. Contact: <strong>contact@theangelservices.com</strong>.</p>

                  <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }} >8. Cookies and Analytics</h2>
                        <p>We use cookies and analytics tools to understand how users interact with our websites and Platform. See our Cookies Policy for details.</p>
                        
                        <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>9. Changes to this Policy</h2>
                        <p>We may update this Policy from time to time. Updates will be posted online.</p>
                        
                        <h2 className="h4 fw-bold my-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>10. Contact Us</h2>
                        <p><strong>contact@theangelservices.com</strong> | Angel Services Pte. Ltd., Singapore</p>

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

export default PrivacyPolicy;
