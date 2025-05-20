'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function CountryHero({
  title = 'Your Title Here',
  subtitle = 'Your subtitle goes here.',
  cta1Text = 'Get Started',
  cta2Text = 'Explore Services',
  cta1Link = '/contact',
  cta2Link = '/services',
  image = 'placeholder-country.jpg'
}) {
  return (
    <section className="country-hero-section position-relative d-flex align-items-center overflow-hidden">
      {/* Diagonal Background Image */}
      <div className="diagonal-image-wrapper">
        <Image
          src={image}
          alt={title}
          fill
          className="diagonal-image"
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
        />
      </div>

      {/* Left Dotted Pattern */}
      <div className="dot-pattern" />

      {/* Text Content */}
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row min-vh-75 align-items-center py-3">
          <div className="col-lg-6 col-xl-5">
            <div className="hero-box bg-white p-4 p-md-5 rounded-4">
              <h1 className="display-4 fw-bold mb-3">{title}</h1>
              <p className="lead mb-4 text-muted">{subtitle}</p>
              <div className="d-flex flex-wrap gap-3">
                <Link href={cta1Link} className="btn btn-warning rounded-pill px-4 py-2 fw-semibold">
                  {cta1Text} <i className="bi bi-arrow-right ms-2" />
                </Link>
                <Link href={cta2Link} className="btn btn-dark rounded-pill px-4 py-2 fw-semibold text-white">
                  {cta2Text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .country-hero-section {
          background-color: #fff;
          min-height: 100vh;
          position: relative;
        }

        .diagonal-image-wrapper {
          position: absolute;
          top:0;
          right: 0;
          bottom: 0;
          width: 100%;
          aspect-ratio: 16/9;
          z-index: 1;
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 15% 100%);
          transform: translateX(27%);
          overflow:hidden;
        }

        .diagonal-image {
          object-fit: cover;
          object-position: center;
        }

        .dot-pattern {
          position: absolute;
          left: 0;
          top: 0;
          width: 140px;
          height: 100%;
          background-image: radial-gradient(#fcb900 2.8px, transparent 2.8px);
          background-size: 30px 30px;
          opacity: 0.75;
          z-index: 0;
        }

        .hero-box {
          max-width: 580px;
          background: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 991px) {
          .country-hero-section {
            min-height: auto;
            padding: 80px 0;
          }

          .diagonal-image-wrapper {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            width: 100%;
            height: 100%;
            opacity: 0.15;
          }

          .hero-box {
            text-align: center;
            margin: 0 auto;
            max-width: 100%;
          }

          .dot-pattern {
            display: none;
          }
        }

        @media (max-width: 576px) {
          .country-hero-section {
            padding: 60px 0;
          }

          .hero-box {
            padding: 1.5rem !important;
          }

          .display-4 {
            font-size: 2rem;
          }

          .lead {
            font-size: 1rem;
          }

          .btn {
            width: 100%;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
