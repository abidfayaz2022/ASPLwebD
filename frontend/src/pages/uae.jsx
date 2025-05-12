'use client';
import Link from 'next/link';
import Image from 'next/image';
import CountryHero from '../components/country-pages/hero';
import WhyCountry from '../components/country-pages/WhyCountry';
import { BsGlobe2, BsGearFill, BsBank2, BsLayersHalf, BsFileEarmarkCheck } from 'react-icons/bs';
import WhyAngelServices from '../components/country-pages/WhyAngelServices';
import ToolsAndInsights from '../components/country-pages/ToolsAndInsights';
import CountryContact from '../components/country-pages/CountryContact';
import CountryCTA from '../components/country-pages/CountryCTA';

export default function UAE() {
  return (
    <>
      {/* Hero Section */}
      <CountryHero
        title="Doing Business in the UAE"
        subtitle="UAE is a global business gateway—offering zero personal income tax, strategic connectivity, and over 40 free zones. Its world-class infrastructure, innovation hubs, and ease of doing business make it the preferred destination for Middle East and global expansion."
        image="/images/uae-illustration.png"
        cta1Text="Start Your Journey"
        cta2Text="Explore Services"
        cta1Link="#contact"
        cta2Link="/services"
      />

      {/* Why UAE */}
      <WhyCountry
        title="Why UAE?"
        intro="As a global hub for trade, finance, and innovation, the UAE offers one of the most business-friendly environments in the world. From free zones to flexible setup models, it supports a diverse range of industries and investor profiles."
        points={[
          "100% foreign ownership in free zones and many mainland sectors",
          "No personal income tax and 9% corporate tax (with exemptions)",
          "Quick and flexible business setup procedures",
          "World-class infrastructure, banking, and residency pathways",
        ]}
      />

      {/* Why Angel Services in UAE */}
      <WhyAngelServices
        title="Why Choose Angel Services in UAE?"
        subtitle="With trusted UAE-based partners and global expertise, we simplify cross-border setup, structuring, and compliance—tailored to your business vision."
        features={[
          {
            title: "Free Zone & Mainland Advisory",
            desc: "We help you choose the ideal setup based on activity, visa needs, and long-term costs.",
            icon: <BsGlobe2 className="text-warning fs-2" />,
          },
          {
            title: "License & PRO Services",
            desc: "Our team manages all business licenses, documentation, and local approvals for smooth onboarding.",
            icon: <BsFileEarmarkCheck className="text-warning fs-2" />,
          },
          {
            title: "Compliance & Tax Readiness",
            desc: "We assist with UAE corporate tax, ESR, UBO, VAT registration, and ongoing compliance.",
            icon: <BsGearFill className="text-warning fs-2" />,
          },
          {
            title: "Corporate Structuring",
            desc: "From SPVs to holding companies, we provide regional structuring with tax optimization in mind.",
            icon: <BsLayersHalf className="text-warning fs-2" />,
          },
          {
            title: "Banking Support",
            desc: "Guidance on opening and maintaining corporate accounts with UAE’s top banks.",
            icon: <BsBank2 className="text-warning fs-2" />,
          }
        ]}
      />

      {/* Tools & Insights */}
      <ToolsAndInsights
        title="Tools & Insights"
        subtitle="Make informed decisions with UAE-specific tools and expert content."
        tools={[
          {
            title: "Free Zone Comparison Tool",
            desc: "Evaluate UAE free zones based on industry, visa, and cost benefits.",
            icon: "sliders"
          },
          {
            title: "Guide to Corporate Tax & ESR",
            desc: "Understand UAE’s new tax regime and substance requirements.",
            icon: "file-earmark-bar-graph"
          },
          {
            title: "Residency & Setup FAQs",
            desc: "Answers to key questions about UAE visas, structures, and processes.",
            icon: "question-circle"
          },
          {
            title: "Bank Account Setup Checklist",
            desc: "A step-by-step guide to opening business accounts in the UAE.",
            icon: "clipboard-check"
          }
        ]}
      />

      {/* Contact Section */}
      <CountryContact
        title="Speak with Our UAE Advisor"
        subtitle="Have questions or want to explore setup options? Connect with our UAE desk:"
        name="Sriniwas Nandiraju"
        role="Business Head, UAE"
        email="sriniwas.nandiraju@theangelservices.com"
        phone="+971-508506581"
      />

      {/* Final CTA */}
      <CountryCTA
        title="Ready to launch in the UAE?"
        subtitle="Use our contact form to start your UAE journey or book a tailored consultation."
        ctaText="Get in Touch"
        ctaLink="/contact"
        image="/images/uae-cta.jpg"
      />
    </>
  );
}
