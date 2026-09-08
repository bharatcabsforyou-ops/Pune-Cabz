import type { CareerOpening } from "@/lib/career";

export function getCareerSeedOpenings(): CareerOpening[] {
  return [
    {
      id: "seed-career-support",
      title: "Customer support executive",
      type: "Full-time",
      location: "Pune",
      department: "Support",
      description:
        "Be the first voice riders and drivers hear when they need help. You will handle live trip queries on WhatsApp, phone, and email — clarifying fares, sharing ETAs, coordinating with ops, and making sure every journey feels safe and clear. Ideal if you stay calm under pressure and enjoy helping people in real time.",
      responsibilities:
        "Respond to rider and driver messages on WhatsApp, phone, and email during active trips\nShare ETAs, route updates, and fare clarifications with clear language\nLog issues and escalate delays, no-shows, or safety concerns to operations\nFollow booking status and update customers until the trip is complete\nMaintain polite, brand-consistent communication in English and Hindi\nSupport weekend and peak-hour shifts when demand is high",
      requirements:
        "Clear written and spoken English and Hindi\nComfortable with WhatsApp Business, phone support, and basic CRM tools\nCalm under time pressure; can handle multiple chats without losing detail\nWillingness to work rotating shifts including evenings and weekends\n0–2 years in customer support, BPO, hospitality, or travel preferred",
      benefits:
        "Fixed monthly salary + performance incentives\nOn-the-job training for cab ops and fare scripts\nWeekly offs as per roster\nGrowth path into team lead / ops coordinator\nWork from our Pune operations desk with a small, supportive team",
      experience: "0–2 years",
      salary: "₹18,000 – ₹25,000 / month",
      imageUrl: "/image1.jpeg",
      published: true,
      sortOrder: 1,
      createdAt: "2025-06-01T10:00:00.000Z",
      isSeed: true,
    },
    {
      id: "seed-career-ops",
      title: "Operations associate",
      type: "Full-time",
      location: "Pune",
      department: "Operations",
      description:
        "Keep bookings moving smoothly across local, airport, and outstation trips. You will coordinate drivers, verify vehicle readiness, watch live routes, and step in when a trip needs a backup plan. This role suits someone who likes systems, phones, and solving problems before the customer notices.",
      responsibilities:
        "Assign and confirm drivers for bookings from the admin / WhatsApp queue\nVerify driver documents, vehicle cleanliness, and on-time pickup readiness\nMonitor live trips and arrange replacements for delays or cancellations\nCoordinate airport and outstation handovers with clear SOPs\nUpdate the support desk with accurate ETAs and status notes\nMaintain daily ops logs for trips completed, issues, and feedback",
      requirements:
        "Strong phone and WhatsApp communication in Hindi / English / Marathi\nBasic comfort with Google Maps, spreadsheets, and chat tools\nAbility to take decisions quickly during peak hours\nPrior experience in fleet, logistics, travel desk, or cab ops is a plus\nReady for early mornings and late evenings on roster",
      benefits:
        "Competitive salary + attendance and performance incentives\nHands-on exposure to full cab operations across Maharashtra\nClear growth to senior ops / fleet coordinator\nTeam meals on long shift days\nPune office base with field coordination as needed",
      experience: "1–3 years",
      salary: "₹22,000 – ₹32,000 / month",
      imageUrl: "/image3.png",
      published: true,
      sortOrder: 2,
      createdAt: "2025-06-15T10:00:00.000Z",
      isSeed: true,
    },
  ];
}
