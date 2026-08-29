import Hero from "@/components/Hero";
import TopRides from "@/components/TopRides";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import HomeExplore from "@/components/HomeExplore";
import WhyTravelWithUs from "@/components/WhyTravelWithUs";
import Testimonial from "@/components/Testimonial";
import HomeCta from "@/components/HomeCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TopRides />
      <TrustBar />
      <HowItWorks className="bg-surface" />
      <WhyChoose />
      <HomeExplore />
      <WhyTravelWithUs />
      <Testimonial />
      <HomeCta />
    </>
  );
}
