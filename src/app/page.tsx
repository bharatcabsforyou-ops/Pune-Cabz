import Hero from "@/components/Hero";
import HomePopularRoutesStrip from "@/components/HomePopularRoutesStrip";
import TopRides from "@/components/TopRides";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import WhyTravelWithUs from "@/components/WhyTravelWithUs";
import Testimonial from "@/components/Testimonial";
import HomeCta from "@/components/HomeCta";

export default function Home() {
  return (
    <>
      <Hero />
      <HomePopularRoutesStrip />
      <TrustBar />
      <HowItWorks className="bg-white" />
      <WhyChoose />
      <WhyTravelWithUs />
      <Testimonial />
      <HomeCta />
      <TopRides />
    </>
  );
}
