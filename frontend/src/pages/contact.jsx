'use client';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isClient, setIsClient] = useState(false); // used to prevent hydration issue

  useEffect(() => {
    setIsClient(true); // ensures content runs only on the client
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage('Thank you for contacting us. We will get back to you as soon as possible.');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
        });
      } else {
        setStatusMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('There was an error sending your message.');
    }

    setIsSubmitting(false);
  };

  if (!isClient) return null; // avoid mismatch by rendering nothing on server

  return (
    <>
      <section className="connect-section py-5" style={{ backgroundColor: '#f4f4f4' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark">Connect With Us</h2>
            <div className="divider-center mb-4">
              <span className="bg-primary"></span>
            </div>
            <p className="lead text-muted col-md-8 mx-auto">
              Contact our team directly through your preferred communication channel
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="connect-options-card bg-white shadow-sm rounded-4 p-5">
                <div className="row g-4">
                  <div className="col-md-6">
                    <a
                      href="https://wa.me/6583308396"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="connect-link d-flex flex-column align-items-center text-decoration-none"
                    >
                      <div
                        className="connect-icon-wrapper bg-success text-white rounded-circle d-flex align-items-center justify-content-center mb-3"
                        style={{ width: '90px', height: '90px' }}
                      >
                        <i className="bi bi-whatsapp fs-1"></i>
                      </div>
                      <h4 className="mb-2 text-center">WhatsApp</h4>
                      <p className="text-muted text-center mb-0">Chat with our team</p>
                    </a>
                  </div>

                  <div className="col-md-6">
                    <a
                      href="mailto:contact@theangelservices.com"
                      className="connect-link d-flex flex-column align-items-center text-decoration-none"
                    >
                      <div
                        className="connect-icon-wrapper bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3"
                        style={{ width: '90px', height: '90px' }}
                      >
                        <i className="bi bi-envelope fs-1"></i>
                      </div>
                      <h4 className="mb-2 text-center">Email</h4>
                      <p className="text-muted text-center mb-0">Send us a message</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5 justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="business-hours">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-clock-fill me-3 fs-3 text-primary"></i>
                  <h5 className="mb-0">Monday - Friday: 9:00 AM - 6:00 PM</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark">Send Us a Message</h2>
            <div className="divider-center mb-4">
              <span className="bg-primary"></span>
            </div>
            <p className="lead text-muted col-md-8 mx-auto">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="form-card">
                <form onSubmit={handleSubmit} className="needs-validation">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="company" className="form-label">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="form-control"
                        placeholder="Your company name (optional)"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="+1 (123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="service" className="form-label">Service Required</label>
                    <select
                      id="service"
                      name="service"
                      className="form-select"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      {/* <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="ui-ux">UI/UX Design</option> */}
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="consultation">Business Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg d-inline-flex align-items-center px-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm d-inline-block" role="status" aria-hidden="true"></span>
                          <span className="ms-2">Sending...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {statusMessage && (
                  <div className="alert mt-4" role="alert">
                    {statusMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
