'use client';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function WhyCountry({
  title = 'Why This Country?',
  intro = '',
  points = [],
}) {
  return (
    <section className="why-country-section py-5 mt-5">
      <div className="container text-center">
        {/* Section Title */}
        <motion.h2
          className="fw-bold display-5 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>

        {/* Intro Paragraph in Card */}
        <motion.div
          className="intro-card mx-auto mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="lead text-muted mb-0 intro-text">{intro}</p>
        </motion.div>

        {/* Grid of Points */}
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
              <div className="card shadow-sm border-0 h-100 p-4 d-flex align-items-start gap-3 why-box">
                <div className="icon-circle d-flex align-items-center justify-content-center">
                  <FaCheckCircle className="text-white" style={{ fontSize: '2.5rem' }} />
                </div>
                <p className="mb-0 text-start fs-6">{point}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .why-country-section {
          background-color: #fff;
        }

        .intro-card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid #eee;
          max-width: 1100px;
        }

        .why-box {
          background-color: #f9fafa;
          border-radius: 14px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }

        .why-box:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }

        .icon-circle {
          background-color: #fcb900;
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
.intro-text {
  text-align: justify;
}

        @media (max-width: 576px) {
          .why-box {
            text-align: center;
            flex-direction: column;
            align-items: center;
          }

          .icon-circle {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
