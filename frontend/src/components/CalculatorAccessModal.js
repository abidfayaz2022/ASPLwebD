'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CalculatorAccessModal({ onSuccess }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = form.name.trim() && form.email.trim();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return setError('Name and Email are required.');

    setLoading(true);
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: 'User accessed Corporate Tax Calculator',
          sendUserConfirmation: false
        }),
      });

      if (!res.ok) throw new Error('Failed to send email');

      onSuccess(); // unlock calculator
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={() => router.back()}>&times;</button>
        <h2>Access Calculator</h2>
        <p>Please enter your details to proceed.</p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name*"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address*"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone Number (optional)"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            name="company"
            placeholder="Company Name (optional)"
            value={form.company}
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Continue to Calculator'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .modal-box {
          position: relative;
          background: white;
          padding: 30px;
          border-radius: 12px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .close-button {
          position: absolute;
          top: 14px;
          right: 16px;
          font-size: 26px;
          color: #444;
          background: none;
          border: none;
          cursor: pointer;
        }

        h2 {
          margin-bottom: 10px;
        }

        input {
          width: 100%;
          margin: 10px 0;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        button {
          background: #fcb900;
          color: black;
          font-weight: bold;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error {
          color: red;
          font-size: 14px;
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}
