'use client';
import Link from 'next/link';
import Image from 'next/image';
import CountryHero from '../components/country-pages/hero';
import WhyCountry from '../components/country-pages/WhyCountry';

export default function Singapore() {
  return (
    <>
      {/* Reusable Hero Section */}
      <CountryHero
        title="Doing Business in Singapore"
        subtitle="Ranked among the world’s most business-friendly nations, Singapore is your strategic launchpad into Asia. With no capital gains tax, low corporate rates, and a transparent system—Singapore offers the perfect foundation for regional and global expansion."
        image="/images/singapore-illustration.png"
        cta1Text="Start Your Journey"
        cta2Text="Explore Services"
        cta1Link="#contact"
        cta2Link="/services"
      />
      {/* Why Singapore */}
      <WhyCountry
        title="Why Singapore?"
        subtitle="Singapore is consistently ranked as one of the most business-friendly countries in the world—offering a stable political environment, transparent regulatory framework, and a world-class financial system. With no capital gains tax, low corporate tax rates, and a strategic location in the heart of Asia, Singapore is the ideal gateway for businesses looking to establish or expand their regional and global presence."
        points={[
          "100% foreign ownership for most sectors",
          "Access to over 90 Double Taxation Avoidance Agreements (DTAs)",
          "Robust infrastructure and digital ecosystem",
          "A trusted and reputable jurisdiction for holding companies, fund vehicles, and family offices"
        ]}
      />

      {/* Why Choose Angel Services */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Why Choose Angel Services?</h2>
          <p className="text-muted text-center mb-5">
            With over a decade of experience in Singapore, we provide seamless, end-to-end solutions to help international businesses incorporate, scale, and stay compliant.
          </p>
          <div className="row g-4">
            {[
              {
                title: "Integrated Services",
                desc: "From incorporation to fund administration and legacy planning—our offerings are fully integrated and scalable.",
                icon: "layers"
              },
              {
                title: "Compliance Expertise",
                desc: "We ensure your company stays compliant with ACRA, IRAS, and MAS regulations—on time, every time.",
                icon: "shield-check"
              },
              {
                title: "Cross-Border Structuring",
                desc: "We advise on tax-efficient holding structures, VCCs, and family office setups tailored to global clients.",
                icon: "globe"
              },
              {
                title: "Banking & Licensing Support",
                desc: "We assist with bank account opening, license applications, financial services approvals, and more.",
                icon: "credit-card"
              },
              {
                title: "Client Dashboard (Coming Soon)",
                desc: "A secure platform to track filings, view deadlines, and manage documents in real-time.",
                icon: "columns-gap"
              }
            ].map((item, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="card h-100 shadow-sm p-4">
                  <div className="mb-3">
                    <i className={`bi bi-${item.icon} fs-2 text-warning`} />
                  </div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Insights */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Tools & Insights</h2>
          <p className="text-muted text-center mb-5">Plan your Singapore strategy with curated tools and expert resources.</p>
          <div className="row g-4">
            {[
              {
                title: "Incorporation Cost Estimator",
                desc: "Calculate setup costs based on company type and add-ons.",
                icon: "calculator"
              },
              {
                title: "Tax Comparison Tool",
                desc: "Compare tax rates and compliance requirements across jurisdictions.",
                icon: "bar-chart"
              },
              {
                title: "Knowledge Hub",
                desc: "Access expert guides on choosing the right entity, VCC setup, and compliance timelines.",
                icon: "book"
              }
            ].map((tool, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card shadow-sm p-4 h-100">
                  <i className={`bi bi-${tool.icon} fs-2 text-primary mb-3`} />
                  <h5 className="fw-bold">{tool.title}</h5>
                  <p className="text-muted">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light" id="contact">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Speak with Our Singapore Specialist</h2>
          <p className="text-muted mb-4">Have questions or need personalised advice? Contact our expert:</p>
          <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
            <h5 className="fw-bold mb-2">Rajat Gupta</h5>
            <p className="text-muted mb-2">Managing Director, Angel Services Pte. Ltd.</p>
            <p className="mb-1"><i className="bi bi-envelope-fill me-2 text-warning"></i> rajat@theangelservices.com</p>
            <p><i className="bi bi-telephone-fill me-2 text-warning"></i> +65 9781 1453</p>
            <Link href="/contact" className="btn btn-yellow mt-3 rounded-pill px-4 py-2 fw-semibold">
              Contact Us <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-5 text-white text-center" style={{ background: 'linear-gradient(135deg, #fcb900, #fcb700)' }}>
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Expand into Singapore?</h2>
          <p className="lead mb-4">Let us help you establish a lasting, compliant presence in Asia’s top destination for business.</p>
          <Link href="/contact" className="btn btn-light rounded-pill px-4 py-2 fw-semibold">
            Get in Touch <i className="bi bi-arrow-right ms-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
