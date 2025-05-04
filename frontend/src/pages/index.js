import HeroSection from "../components/ui/hero"
import WhyChooseASPL from "../components/ui/whyChoose";
import ServicesSection from "../components/ui/services";
import ToolsSection from "../components/ui/tools";
import CtaSection from "../components/ui/cta";
import { useEffect } from 'react';
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const consentPopup = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');

    if (!localStorage.getItem('cookiesAccepted')) {
      consentPopup?.classList.remove('d-none');
    }

    acceptBtn?.addEventListener('click', function () {
      localStorage.setItem('cookiesAccepted', 'true');
      consentPopup?.classList.add('d-none');
    });
  }, []); // Empty dependency array means this runs once on mount

  return (<div>
    <div id="cookieConsent" className="cookie-consent-popup d-none">
      <div className="cookie-box">
        <p>
          We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies and privacy policy.
          <Link href="/privacy">Learn more</Link>.
        </p>
        <button id="acceptCookies" className="btn btn-orange btn-sm mt-2">Got it!</button>
      </div>
    </div>
    <HeroSection></HeroSection>
    <WhyChooseASPL></WhyChooseASPL>
    <ServicesSection></ServicesSection>
    <ToolsSection></ToolsSection>
    <CtaSection></CtaSection>



    <style jsx>
      {`
       .cookie-consent-popup {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #ddd;
        padding: 1rem 1.5rem;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transition: opacity 0.3s ease;
    }

    .cookie-consent-popup.d-none {
        display: none;
    }

    .cookie-consent-popup .cookie-box {
        max-width: 1140px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    @media (min-width: 768px) {
        .cookie-consent-popup .cookie-box {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
        }
    }

    .cookie-consent-popup p {
        margin: 0;
        color: #333;
        font-size: 0.9rem;
    }
        `}
    </style>


  </div>
  );
}
