"use client";

import { Eye, Target } from "lucide-react";
import Container from "../Container";
import Reveal from "../motion/Reveal";
import { StaggerGroup, StaggerItem } from "../motion/Stagger";

export default function Values() {
  return (
    <section className="border-t border-black/[0.04] bg-soft page-section">
      <Container>
        <Reveal className="section-head">
          <p className="section-eyebrow">What drives us</p>
          <h2 className="section-title">Our Goal &amp; Vision</h2>
          <p className="section-desc">
            Clear purpose. Clear direction. Built around every customer&apos;s journey.
          </p>
        </Reveal>

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <StaggerItem>
            <article className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.09] text-brand ring-1 ring-brand/12">
                  <Target className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                    Our Goal
                  </p>
                  <h3 className="mt-0.5 text-lg font-extrabold tracking-tight text-navy sm:text-xl">
                    Safe, reliable &amp; hassle-free rides
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-navy/60">
                <p>
                  Our goal is to provide safe, reliable, affordable, and hassle-free
                  transportation for every customer.
                </p>
                <p>
                  We aim to build a trusted cab service brand in Pune by combining
                  professional service with modern technology and a customer-first
                  approach. We continuously work to improve our services, maintain high
                  safety standards, provide timely rides, and make every journey
                  comfortable.
                </p>
              </div>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.09] text-brand ring-1 ring-brand/12">
                  <Eye className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                    Our Vision
                  </p>
                  <h3 className="mt-0.5 text-lg font-extrabold tracking-tight text-navy sm:text-xl">
                    Easier, safer &amp; more convenient travel
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-navy/60">
                <p>
                  Our vision is simple — to make travelling easier, safer, and more
                  convenient for everyone.
                </p>
                <p>
                  We want every customer to reach their destination comfortably and on
                  time — and to choose us again for their next journey.
                </p>
              </div>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </section>
  );
}
