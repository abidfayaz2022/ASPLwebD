'use client';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function WhyCountry({
  title = 'Why This Country?',
  intro = '',
  points = [],
}) {
  return (
    <section className="why-country-section py-5 position-relative">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Corner Floating Squares */}
      <div className="corner-shapes">
        <div className="shape square top-left"></div>
        <div className="shape square top-right small"></div>
        <div className="shape square bottom-left small"></div>
        <div className="shape square bottom-right"></div>
      </div>

      {/* Fades */}
      <div className="fade-top"></div>
      <div className="fade-bottom"></div>

      <div className="container text-center position-relative z-1">
        {/* Title */}
        <motion.h2
          className="fw-bold display-5 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>

        {/* Intro */}
        <motion.div
          className="intro-card mx-auto mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="lead text-muted mb-0 intro-text">{intro}</p>
        </motion.div>

        {/* Points Grid */}
        <div className="row g-4 justify-content-center">
          {points.slice(0, 4).map((point, index) => (
            <motion.div
              key={index}
              className="col-md-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card why-box p-4 d-flex align-items-center gap-3 h-100 text-start">
                <div className="icon-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <FaCheckCircle className="text-white" style={{ fontSize: '1.5rem' }} />
                </div>
                <span className="fs-6 fw-medium">{point}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .why-country-section {
          background-color: #fff;
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

        .top-left { top: 30px; left: 30px; animation-delay: 0s; }
        .top-right { top: 40px; right: 40px; animation-delay: 2s; }
        .bottom-left { bottom: 30px; left: 30px; animation-delay: 3s; }
        .bottom-right { bottom: 30px; right: 30px; animation-delay: 4s; }

        @keyframes floatSquare {
          0%, 100% {
            transform: rotate(45deg) translateY(0);
          }
          50% {
            transform: rotate(45deg) translateY(-10px);
          }
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
          background: linear-gradient(to bottom, #fff, transparent);
        }

        .fade-bottom {
          bottom: 0;
          background: linear-gradient(to top, #fff, transparent);
        }

        .intro-card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid #eee;
          max-width: 1100px;
        }

        .intro-text {
          text-align: justify;
        }

        .why-box {
          background-color: #fff;
          border-radius: 16px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .why-box:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
        }

        .icon-circle {
          width: 48px;
          height: 48px;
          background-color: #fcb900;
          border-radius: 50%;
        }

        @media (max-width: 576px) {
          .why-box {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
