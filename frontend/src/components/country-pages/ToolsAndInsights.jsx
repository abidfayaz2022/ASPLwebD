'use client';
import { motion } from 'framer-motion';

export default function ToolsAndInsights({ title, subtitle, tools = [] }) {
  return (
    <section className="tools-insights-section py-5 bg-white">
      <div className="container text-center">
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
        <div className="row g-4">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              className="col-md-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card shadow-sm p-4 h-100 tool-card text-start">
                <i className={`bi bi-${tool.icon} fs-2 text-primary mb-3`} />
                <h5 className="fw-bold">{tool.title}</h5>
                <p className="text-muted">{tool.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .tool-card {
          border-radius: 14px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #ffffff;
        }

        .tool-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        }

        .tool-card i {
          transition: transform 0.3s ease;
        }

        .tool-card:hover i {
          transform: scale(1);
        }
      `}</style>
    </section>
  );
}
