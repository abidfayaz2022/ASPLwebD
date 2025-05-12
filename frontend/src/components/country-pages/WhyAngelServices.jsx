'use client';
import { motion } from 'framer-motion';

export default function WhyAngelServices({ title, subtitle, features = [] }) {
  return (
    <section className="why-section position-relative py-5">
      {/* Animated Glow Background */}
      <div className="animated-bg"></div>

      {/* Corner Floating Squares (light grey) */}
      <div className="corner-shapes">
        <div className="shape square top-left"></div>
        <div className="shape square top-right small"></div>
        <div className="shape square bottom-left small"></div>
        <div className="shape square bottom-right"></div>
      </div>

      {/* Top and Bottom Gradient Fades */}
      <div className="fade-top"></div>
      <div className="fade-bottom"></div>

      <div className="container text-center position-relative z-1">
        <motion.h2
          className="fw-bold display-5 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-muted lead mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {subtitle}
        </motion.p>

        <div className="row g-4 justify-content-center">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="col-md-6 col-lg-4 d-flex"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card golden-card p-4 w-100 rounded-4 text-center d-flex flex-column align-items-center bg-white">
                <div className="icon-wrapper mb-4">{item.icon}</div>
                <h5 className="fw-semibold mb-2">{item.title}</h5>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-section {
          background: #fff;
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
            transform: translate(-50px, -30px);
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

        .icon-wrapper {
          width: 64px;
          height: 64px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 8px rgba(252, 185, 0, 0.15), 0 10px 25px rgba(252, 185, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #fcb900;
        }

        .golden-card {
          border: 2px solid #fcb900;
          transition: all 0.3s ease;
        }

        .golden-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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

        @media (min-width: 992px) {
          .row > .col-lg-4:nth-last-child(1):nth-child(odd) {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
