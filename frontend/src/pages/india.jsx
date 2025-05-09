'use client';
import Link from 'next/link';
import Image from 'next/image';
import CountryHero from '../components/country-pages/hero';
import WhyCountry from '../components/country-pages/WhyCountry';
import { BsLayers, BsShieldCheck, BsGlobe, BsBuildingCheck, BsHouseGear } from 'react-icons/bs';
import WhyAngelServices from '../components/country-pages/WhyAngelServices';
import ToolsAndInsights from '../components/country-pages/ToolsAndInsights';
import CountryContact from '../components/country-pages/CountryContact';
import CountryCTA from '../components/country-pages/CountryCTA';

export default function India() {
  return (
    <>
      {/* Hero Section */}
      <CountryHero
        title="Doing Business in India"
        subtitle="India is one of the fastest-growing major economies—offering vast market potential, skilled talent, and a pro-business environment. With economic liberalisation, digital transformation, and strong government support for entrepreneurship, India is the ideal destination for long-term expansion."
        image="/images/india-illustration.png"
        cta1Text="Start Your Journey"
        cta2Text="Explore Services"
        cta1Link="#contact"
        cta2Link="/services"
      />

      {/* Why India */}
      <WhyCountry
        title="Why India?"
        intro="India presents a compelling opportunity for companies looking to manufacture, source, or serve the South Asian market. Its massive consumer base, skilled workforce, and improving ease of doing business make it a strategic choice for global firms."
        points={[
          "Access to a 1.4 billion population market",
          "100% FDI allowed in most sectors under automatic route",
          "Startup-friendly tax regimes and incentive schemes",
          "Robust digital infrastructure and emerging tech hubs"
        ]}
      />

      {/* Why Choose Angel Services */}
      <WhyAngelServices
        title="Why Choose Angel Services in India?"
        subtitle="Through our India-based firm, ASPL Consultancy Pvt. Ltd., we deliver compliant, efficient, and tailored corporate services for international businesses entering India."
        features={[
          {
            title: "Company Formation Expertise",
            desc: "We assist with the incorporation of Private Limited Companies, LLPs, and Wholly-Owned Subsidiaries.",
            icon: <BsBuildingCheck className="text-warning fs-2" />,
          },
          {
            title: "Regulatory Compliance",
            desc: "Our in-house experts manage all MCA, RBI, FEMA, and income tax filings on your behalf.",
            icon: <BsShieldCheck className="text-warning fs-2" />,
          },
          {
            title: "Finance Outsourcing",
            desc: "We offer complete support for bookkeeping, payroll, GST, and TDS compliance.",
            icon: <BsLayers className="text-warning fs-2" />,
          },
          {
            title: "Entity Structuring",
            desc: "We help you choose the right state, business structure, and ownership model.",
            icon: <BsGlobe className="text-warning fs-2" />,
          },
          {
            title: "Local Representation",
            desc: "Physical address, director, and admin support services available where required.",
            icon: <BsHouseGear className="text-warning fs-2" />,
          }
        ]}
      />

      {/* Tools & Insights */}
      <ToolsAndInsights
        title="Tools & Insights"
        subtitle="Get practical guidance for entering and operating in the Indian market."
        tools={[
          {
            title: "Incorporation Checklist",
            desc: "Step-by-step guide for setting up an entity in India as a foreign company.",
            icon: "checklist"
          },
          {
            title: "India Tax Calendar",
            desc: "Track annual deadlines for income tax, GST, and compliance filings.",
            icon: "calendar"
          },
          {
            title: "FEMA & FDI Guidelines",
            desc: "Understand the dos and don’ts for foreign investors and founders.",
            icon: "info-circle"
          },
          {
            title: "Finance Outsourcing Guide",
            desc: "Learn how to manage accounting and payroll efficiently from overseas.",
            icon: "file-earmark-text"
          }
        ]}
      />

      {/* Contact Section */}
      <CountryContact
        title="Speak with Our India Specialist"
        subtitle="Have questions or need personalised advice? Contact our expert:"
        name="Monika Jain"
        role="Strategic Advisor, ASPL Consultancy Pvt. Ltd."
        email="monika@asplconsultancy.com"
        phone="+91 98100 84734"
      />

      {/* Final CTA */}
      <CountryCTA
        title="Ready to expand into India?"
        subtitle="Use the contact form to schedule a consultation or request a proposal tailored to your business goals."
        ctaText="Get in Touch"
        ctaLink="/contact"
        image="/images/india-cta.jpg"
      />
    </>
  );
}
