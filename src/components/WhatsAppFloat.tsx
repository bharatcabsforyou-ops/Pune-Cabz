"use client";

import { motion } from "framer-motion";
import WhatsAppIcon from "./WhatsAppIcon";
import { site } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 320, damping: 22 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="whatsapp-float group"
    >
      <span className="whatsapp-pulse" aria-hidden="true" />
      <span className="whatsapp-pulse delay" aria-hidden="true" />
      <WhatsAppIcon className="relative z-10 h-7 w-7 text-white" />
      <span className="whatsapp-tip">Chat on WhatsApp</span>
    </motion.a>
  );
}
