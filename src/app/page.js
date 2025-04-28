
import HeroSection from "./hero"
import WhyChooseASPL from "./whyChoose";
import ServicesSection from "./services";
import ToolsSection from "./tools";
import CtaSection from "./cta";


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
