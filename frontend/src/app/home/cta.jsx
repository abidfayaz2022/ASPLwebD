'use client';
import React from 'react';

const CtaSection = () => {
  return (
    <section className="cta-section py-5 bg-light mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-6 p-5 d-flex flex-column justify-content-center" style={{ backgroundColor: 'var(--secondary-color)' }}>
                    <h2 className="text-white fw-bold mb-4">
                      Ready to accelerate your business growth?
                    </h2>
                    <p className="text-white-50 mb-4">
                      Schedule a consultation with our experts to discuss your specific needs and goals.
                    </p>
                    <div>
                      <a href="/contact" className="cta-primary">
                        Get Started Now
                        <i className="bi bi-arrow-right ms-2"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <img
                      src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                      alt="Business Consultation"
                      className="img-fluid h-100 object-fit-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .cta-section {
          background-color: #f8f9fa;
        }

        .cta-primary {
          background-color: #fcb900;
          color: black;
          padding: 10px 25px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .cta-primary:hover {
          background-color: #0056b3;
        }

        .card {
          border-radius: 16px;
        }

        .text-white-50 {
          color: rgba(255, 255, 255, 0.5);
        }

        .object-fit-cover {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .img-fluid {
          max-width: 100%;
          height: auto;
        }

        .shadow-lg {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

export default CtaSection;
