
import HeroSection from "./home/hero"
import WhyChooseASPL from "./home/whyChoose";
import ServicesSection from "./home/services";
import ToolsSection from "./home/tools";
import CtaSection from "./home/cta";


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
