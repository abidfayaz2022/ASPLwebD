
import HeroSection from "../components/ui/hero"
import WhyChooseASPL from "../components/ui/whyChoose";
import ServicesSection from "../components/ui/services";
import ToolsSection from "../components/ui/tools";
import CtaSection from "../components/ui/cta";


export default function Home() {
  return (<div>
    <HeroSection></HeroSection>
    <WhyChooseASPL></WhyChooseASPL>
    <ServicesSection></ServicesSection>
    <ToolsSection></ToolsSection>
    <CtaSection></CtaSection>


  </div>
  );
}
