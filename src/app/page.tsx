import Hero from "@/components/Hero";
import HomeRoutesCarousel from "@/components/HomeRoutesCarousel";
import TrustBar from "@/components/TrustBar";
import BookingProcess from "@/components/BookingProcess";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import WhyTravelWithUs from "@/components/WhyTravelWithUs";
import HomePromiseMarquee from "@/components/HomePromiseMarquee";
import Testimonial from "@/components/Testimonial";
import HomeCta from "@/components/HomeCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HomeRoutesCarousel autoPlay />
      <BookingProcess />
      <HowItWorks className="bg-white" />
      <WhyChoose />
      <WhyTravelWithUs />
      <HomePromiseMarquee />
      <Testimonial />
      <HomeCta />
    </>
  );
}
