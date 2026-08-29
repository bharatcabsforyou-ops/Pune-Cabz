"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { site } from "@/lib/site";

const spring = { delay: 0.8, type: "spring" as const, stiffness: 320, damping: 22 };

export default function ContactFloats() {
  return (
    <div className="contact-float-stack" aria-label="Quick contact">
      <motion.a
        href={site.phoneHref}
        aria-label={`Call ${site.phone}`}
        initial={{ opacity: 0, scale: 0.6, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...spring, delay: 0.65 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="contact-float-btn call-float group"
      >
        <span className="call-pulse" aria-hidden="true" />
        <Phone className="relative z-10 h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={2.25} />
        <span className="contact-float-tip">Call us</span>
      </motion.a>

      <motion.a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.6, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={spring}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="contact-float-btn whatsapp-float group"
      >
        <span className="whatsapp-pulse" aria-hidden="true" />
        <span className="whatsapp-pulse delay" aria-hidden="true" />
        <WhatsAppIcon className="relative z-10 h-6 w-6 text-white sm:h-7 sm:w-7" />
        <span className="contact-float-tip">Chat on WhatsApp</span>
      </motion.a>
    </div>
  );
}
