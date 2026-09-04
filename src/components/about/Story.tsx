"use client";

import Container from "../Container";
import PhotoCard from "../PhotoCard";
import Reveal from "../motion/Reveal";
import { images } from "@/lib/images";

export default function Story() {
  return (
    <section className="bg-white page-section">
      <Container>
        <div className="grid grid-cols-1 items-center page-grid page-grid-2">
          <Reveal direction="left">
            <PhotoCard src={images.travelScenicRoad} alt="Pune Cabz journey across Maharashtra" />
          </Reveal>

          <Reveal direction="right">
            <p className="section-eyebrow">About Us</p>
            <h2 className="section-title mt-2 text-left">
              Your trusted cab service in Pune
            </h2>
            <div className="mt-4 max-w-xl space-y-4 text-[15px] leading-relaxed text-navy/60">
              <p>
                Welcome to PuneCabz, your trusted cab service in Pune. We are committed
                to making every journey safe, comfortable, reliable, and convenient.
              </p>
              <p>
                Whether you need a cab for daily travel, airport transfers, business
                trips, local sightseeing, outstation journeys, or special occasions, we
                are here to serve you with dependable transportation solutions.
              </p>
              <p>
                Our team focuses on providing well-maintained vehicles, professional
                drivers, timely pickups, transparent service, and a comfortable travel
                experience. We understand that every customer has different travel
                needs, which is why we aim to provide flexible and customer-friendly cab
                services across Pune and beyond.
              </p>
              <p>
                With a strong focus on safety, punctuality, and customer satisfaction,
                we strive to become a cab service that people can confidently rely on
                for every journey.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
