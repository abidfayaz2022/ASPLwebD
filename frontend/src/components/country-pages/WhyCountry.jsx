'use client';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function WhyCountry({ title, subtitle, points = [] }) {
  return (
    <section className="why-country-section py-5">
      <div className="container text-center">
        <motion.h2
          className="fw-bold mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-muted mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>

        <div className="row g-4 justify-content-center">
          {points.slice(0, 6).map((point, index) => (
            <motion.div
              key={index}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card shadow-sm border-0 h-100 p-3 d-flex align-items-start gap-3 why-box">
                <FaCheckCircle className="text-warning fs-3 mt-1" />
                <p className="mb-0 text-start">{point}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-country-section {
          background-color: #fff;
        }

        .why-box {
          background-color: #f9fafa;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .why-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 576px) {
          .why-box {
            text-align: center;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
