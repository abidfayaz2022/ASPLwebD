'use client';
import Link from 'next/link';
import Image from 'next/image';
import CountryHero from '../components/country-pages/hero';
import WhyCountry from '../components/country-pages/WhyCountry';
import { BsLayers, BsShieldCheck, BsGlobe, BsCreditCard, BsColumnsGap } from 'react-icons/bs';
import WhyAngelServices from '../components/country-pages/WhyAngelServices';
import ToolsAndInsights from '../components/country-pages/ToolsAndInsights';
import CountryContact from '../components/country-pages/CountryContact';
import CountryCTA from '../components/country-pages/CountryCTA';

export default function Singapore() {
  return (
    <>
      {/* Reusable Hero Section */}
      <CountryHero
        title="Doing Business in Singapore"
        subtitle="Ranked among the world’s most business-friendly nations, Singapore is your strategic launchpad into Asia. With no capital gains tax, low corporate rates, and a transparent system—Singapore offers the perfect foundation for regional and global expansion."
        image="https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/singapore-illustration.png"
        cta1Text="Start Your Journey"
        cta2Text="Explore Services"
        cta1Link="#contact"
        cta2Link="/services"
      />
      {/* Why Singapore */}
      <WhyCountry
  title="Why Singapore?"
  intro="Singapore is consistently ranked as one of the most business-friendly countries in the world—offering a stable political environment, transparent regulatory framework, and a world-class financial system. With no capital gains tax, low corporate tax rates, and a strategic location in the heart of Asia, Singapore is the ideal gateway for businesses looking to establish or expand their regional and global presence."
  points={[
    "100% foreign ownership for most sectors",
    "Access to over 90 Double Taxation Avoidance Agreements (DTAs)",
    "Robust infrastructure and digital ecosystem",
    "A reputable jurisdiction for holding companies, fund vehicles, and family offices."
  ]}
/>


      {/* Why Choose Angel Services */}
      <WhyAngelServices
      title="Why Choose Angel Services?"
      subtitle="With over a decade of experience in Singapore, we provide seamless, end-to-end solutions to help international businesses incorporate, scale, and stay compliant."
      features={[
        {
          title: "Integrated Services",
          desc: "From incorporation to fund administration and legacy planning—our offerings are fully integrated and scalable.",
          icon: <BsLayers className="text-warning fs-2" />,
        },
        {
          title: "Compliance Expertise",
          desc: "We ensure your company stays compliant with ACRA, IRAS, and MAS regulations—on time, every time.",
          icon: <BsShieldCheck className="text-warning fs-2" />,
        },
        {
          title: "Cross-Border Structuring",
          desc: "We advise on tax-efficient holding structures, VCCs, and family office setups tailored to global clients.",
          icon: <BsGlobe className="text-warning fs-2" />,
        },
        {
          title: "Banking & Licensing Support",
          desc: "We assist with bank account opening, license applications, financial services approvals, and more.",
          icon: <BsCreditCard className="text-warning fs-2" />,
        },
        {
          title: "Client Dashboard (Coming Soon)",
          desc: "A secure platform to track filings, view deadlines, and manage documents in real-time.",
          icon: <BsColumnsGap className="text-warning fs-2" />,
        }
      ]}
    />

      {/* Tools & Insights */}
      <ToolsAndInsights
  title="Tools & Insights"
  subtitle="Plan your Singapore strategy with curated tools and expert resources."
  tools={[
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
  ]}
/>

      {/* Contact Section */}
      <CountryContact
  title="Speak with Our Singapore Specialist"
  subtitle="Have questions or need personalised advice? Contact our expert:"
  name="Rajat Gupta"
  role="Managing Director, Angel Services Pte. Ltd."
  email="rajat@theangelservices.com"
  phone="+65 9781 1453"
/>

      {/* Final CTA */}
      <CountryCTA
  title="Ready to expand into Singapore?"
  subtitle="Use the contact form to schedule a consultation, request pricing, or ask specific questions about your business needs."
  ctaText="Get in Touch"
  ctaLink="/contact"
  image="https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/singapore-cta.jpg"
/>


    </>
  );
}
