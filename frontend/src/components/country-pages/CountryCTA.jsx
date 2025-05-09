'use client';
import Link from 'next/link';

export default function CountryCTA({ title, subtitle, ctaText, ctaLink, image }) {
  return (
    <section className="cta-section py-5 bg-light mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-6 p-5 d-flex flex-column justify-content-center" style={{ backgroundColor: '#000000' }}>
                    <h2 className="text-white fw-bold mb-4">{title}</h2>
                    <p className="text-white-50 mb-4">{subtitle}</p>
                    <Link href={ctaLink} className="cta-primary">
                      {ctaText} <i className="bi bi-arrow-right ms-2" />
                    </Link>
                  </div>
                  <div className="col-lg-6">
                    <img
                      src={image}
                      alt="CTA Visual"
                      className="img-fluid object-fit-cover w-100 h-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-primary {
          background-color: #fcb900;
          color: #000;
          padding: 10px 25px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: background-color 0.3s ease;
        }

        .cta-primary:hover {
          background-color: #e0aa00;
        }

        .text-white-50 {
          color: rgba(255, 255, 255, 0.8);
        }

        .object-fit-cover {
          object-fit: cover;
        }
      `}</style>
    </section>
  );
}
