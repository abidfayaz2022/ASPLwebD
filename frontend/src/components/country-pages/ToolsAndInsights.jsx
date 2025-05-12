'use client';
import { motion } from 'framer-motion';

export default function ToolsAndInsights({ title, subtitle, tools = [] }) {
  return (
    <section className="tools-insights-section py-5 position-relative">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Floating Squares */}
      <div className="corner-shapes">
        <div className="shape square top-left"></div>
        <div className="shape square top-right small"></div>
        <div className="shape square bottom-left small"></div>
        <div className="shape square bottom-right"></div>
      </div>

      {/* Gradient Fades */}
      <div className="fade-top"></div>
      <div className="fade-bottom"></div>

      <div className="container text-center position-relative z-1">
        {/* Heading */}
        <motion.h2
          className="fw-bold mb-3 display-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-muted mb-5 lead"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* Tool Cards */}
        <div className="row g-4 justify-content-center">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              className="col-md-6 col-lg-4 d-flex"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card p-4 w-100 rounded-4 shadow-sm text-center d-flex flex-column align-items-center bg-white tool-card">
                <div className="tool-icon mb-3">
                  <i className={`bi bi-${tool.icon}`} />
                </div>
                <h5 className="fw-semibold mb-2">{tool.title}</h5>
                <p className="text-muted small mb-0">{tool.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .tools-insights-section {
          background: #fff;
          overflow: hidden;
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

        .tool-card {
          transition: all 0.3s ease;
        }

        .tool-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .tool-icon {
          width: 64px;
          height: 64px;
          background: #f0f0f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: #fcb900;
          transition: transform 0.3s ease;
        }

        .tool-card:hover .tool-icon {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
