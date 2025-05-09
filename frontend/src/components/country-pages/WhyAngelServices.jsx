'use client';
import { motion } from 'framer-motion';

export default function WhyAngelServices({ title, subtitle, features = [] }) {
  return (
    <section className="why-angel-section py-5 bg-light">
      <div className="container text-center">
        {/* Title */}
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

        {/* Feature Cards */}
        <div className="row g-4">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 service-card p-4">
                <div className="mb-3">{item.icon}</div>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted mb-0">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .service-card {
          border: none;
          border-radius: 14px;
          background-color: #fff;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 30px rgba(0, 0, 0, 0.08);
        }

        .service-card i {
          transition: transform 0.3s ease;
        }

        .service-card:hover i {
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
}
