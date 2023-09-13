import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import LandingSection1 from "../components/LandingSection1";
import LandingSection2 from "../components/LandingSection2";
import LandingSection3 from "../components/LandingSection3";

const Landing = () => {
  return (
    <div>
      <Carousel />
      <LandingSection3 />
      <LandingSection2 />
      <LandingSection1 />
      <Footer />
    </div>
  );
};

export default Landing;
