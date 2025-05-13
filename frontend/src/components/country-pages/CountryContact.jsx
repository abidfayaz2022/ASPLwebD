'use client';
import { motion } from 'framer-motion';

export default function CountryContact({
  title,
  subtitle,
  name,
  role,
  email,
  phone
}) {
  return (
    <section className="py-5 position-relative contact-section" id="contact">
      {/* Background glow */}
      <div className="animated-bg"></div>

      {/* Corner floating squares */}
      <div className="corner-shapes">
        <div className="shape square top-left"></div>
        <div className="shape square top-right small"></div>
        <div className="shape square bottom-left small"></div>
        <div className="shape square bottom-right"></div>
      </div>

      {/* Top and Bottom Fades */}
      <div className="fade-top"></div>
      <div className="fade-bottom"></div>

      <div className="container text-center position-relative z-1">
        <h2 className="fw-bold mb-3 display-5">{title}</h2>
        <p className="text-muted mb-4 lead">{subtitle}</p>

        <motion.div
          className="card contact-card p-4 mx-auto"
          style={{ maxWidth: '500px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h5 className="fw-bold mb-2">{name}</h5>
          <p className="text-muted mb-3">{role}</p>
          <p className="mb-2 d-flex justify-content-center align-items-center gap-2">
            <i className="bi bi-envelope-fill text-warning"></i>
            <span>{email}</span>
          </p>
          <p className="mb-0 d-flex justify-content-center align-items-center gap-2">
            <i className="bi bi-telephone-fill text-warning"></i>
            <span>{phone}</span>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .contact-section {
          background: #fdfdfd;
          overflow: hidden;
          position: relative;
        }

        .animated-bg {
          position: absolute;
          top: -100px;
          left: -100px;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 30%, #f5f5f5, #fff 60%);
          animation: moveBg 15s ease-in-out infinite;
          z-index: 0;
        }

        @keyframes moveBg {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-40px, -25px);
          }
        }

        .corner-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .shape.square {
          position: absolute;
          width: 60px;
          height: 60px;
          background: rgba(0, 0, 0, 0.05);
          transform: rotate(45deg);
          border-radius: 6px;
          animation: floatSquare 10s ease-in-out infinite;
        }

        .shape.small {
          width: 30px;
          height: 30px;
        }

        .top-left {
          top: 30px;
          left: 30px;
          animation-delay: 0s;
        }

        .top-right {
          top: 40px;
          right: 40px;
          animation-delay: 2s;
        }

        .bottom-left {
          bottom: 30px;
          left: 30px;
          animation-delay: 3s;
        }

        .bottom-right {
          bottom: 30px;
          right: 30px;
          animation-delay: 4s;
        }

        @keyframes floatSquare {
          0%, 100% {
            transform: rotate(45deg) translateY(0);
          }
          50% {
            transform: rotate(45deg) translateY(-10px);
          }
        }

        .contact-card {
          border-radius: 20px;
          background-color: #fff;
          border: 2px solid #fcb900;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
        }

        .contact-card i {
          font-size: 1rem;
        }

        .z-1 {
          z-index: 1;
        }

        .fade-top,
        .fade-bottom {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 60px;
          z-index: 1;
        }

        .fade-top {
          top: 0;
          background: linear-gradient(to bottom, #fdfdfd, transparent);
        }

        .fade-bottom {
          bottom: 0;
          background: linear-gradient(to top, #fdfdfd, transparent);
        }
      `}</style>
    </section>
  );
}
