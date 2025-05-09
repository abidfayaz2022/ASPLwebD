'use client';
import React from 'react';

// components/FeaturesSection.js
import { Fragment } from 'react'

export default function WhyChooseASPL() {
    const features = [
        {
            icon: 'bi-buildings',
            title: 'Setup to Expansion',
            description:
                'Complete assistance from setting up your business to compliant scaling.',
        },
        {
            icon: 'bi-geo-alt',
            title: 'Regional Expertise',
            description:
                'We blend local market insight with skilled jurisdictional execution.',
        },
        {
            icon: 'bi-link',
            title: 'Global Network',
            description:
                'Angel Services offers boutique flexibility with strong global connections.',
        },
        {
            icon: 'bi-speedometer2',
            title: 'Responsive & Reliable',
            description:
                'Fast responses, on-time delivery, and customized solutions from our team.',
        },
    ];


    return (<>
        <section className="features-section py-5">
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-7 text-center">
                        <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--text-dark)', fontSize: 'var( --font-size-main-heading)' }}>
                            Why Choose Us
                        </h2>
                        <div className="underline-center mx-auto mb-4"></div>
                        <p className="lead text-muted" style={{ fontSize: 'var( --font-size-subheading)' }}>
                            We deliver excellence through expertise, innovation, and commitment to your success
                        </p>
                    </div>
                </div>

                <div className="row g-4 justify-content-center">
                    {features.map((feature, idx) => (
                        <div className="col-md-6 col-lg-3" key={idx}>
                            <div className="feature-card p-4 text-center shadow-sm rounded-4 h-100">
                                <div className="feature-icon mb-4">
                                    <i className={`bi ${feature.icon}`} style={{ fontSize: 'var(--font-size-icon)', color: 'var(--primary-color)' }} />
                                </div>
                                <h4 className="mb-3 fw-bold" style={{ fontSize: 'var(--font-size-feature-title)', color: 'var(--text-dark)' }}>
                                    {feature.title}
                                </h4>
                                <p className="text-muted" style={{ fontSize: 'var(--font-size-feature-desc)' }}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        <style jsx>
            {`
            .underline-center {
  height: 4px;
  width: 80px;
  background-color: #fcb900;
  border-radius: 4px;
}
.yellow-glow-border {
  border: 2px solid #fcb900;
  box-shadow: 0 0 10px rgba(252, 185, 0, 0.4);
  transition: all 0.3s ease-in-out;
}

.yellow-glow-border:hover {
  box-shadow: 0 0 20px rgba(252, 185, 0, 0.6);
}
                .feature-card p {display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;}

            `}
        </style>
    </>
    )
}



