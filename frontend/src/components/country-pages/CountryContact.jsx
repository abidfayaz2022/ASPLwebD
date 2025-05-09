'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CountryContact({
  title,
  subtitle,
  name,
  role,
  email,
  phone,
  ctaText = 'Contact Us',
  ctaLink = '/contact'
}) {
  return (
    <section className="py-5 bg-light" id="contact">
      <div className="container text-center">
        {/* Heading (no animation) */}
        <h2 className="fw-bold mb-3 display-5">{title}</h2>

        {/* Subtitle (no animation) */}
        <p className="text-muted mb-4 lead">{subtitle}</p>

        {/* Contact Card */}
        <motion.div
          className="card p-4 mx-auto contact-card"
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
          <p className="mb-3 d-flex justify-content-center align-items-center gap-2">
            <i className="bi bi-telephone-fill text-warning"></i>
            <span>{phone}</span>
          </p>

         {/* <Link
            href={ctaLink}
            className="btn contact-btn mt-2 rounded-pill px-4 fw-semibold d-inline-flex align-items-center gap-2"
          >
            {ctaText} <i className="bi bi-arrow-right" />
          </Link>*/}
        </motion.div>
      </div>

      <style jsx>{`
        .contact-card {
          border-radius: 16px;
          background-color: #fff;
          border: 1px solid #eee;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
        }

        .contact-btn {
          background-color: #fcb900;
          color: #000;
          border: none;
        }

        .contact-btn:hover {
          background-color: #e6a800;
          color: #000;
        }
      `}</style>
    </section>
  );
}
