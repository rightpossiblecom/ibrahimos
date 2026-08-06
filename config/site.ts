import type { Assessment } from "@/lib/analyze/types";

export const siteConfig = {
  brandName: "IbrahimOS",
  shortName: "ibrahim",
  tagline: "The AI Operating System for African Agriculture.",
  description:
    "One intelligent farm assistant for crops, weather, records, and market insight — built for African farmers first.",
  mission: "Help farmers produce more, lose less, and earn more through AI.",
  supportEmail: "hello@ibrahimos.africa",
  foundedYear: 2025,
  legalEntity: "Ibrahim's Agricultural Enterprise",
  cacNumber: "9563561",
  tin: "2623736292415",
  businessAddress:
    "53, Behind Yoruba Chief Palace Gwako, Gwagwalada, Abuja, Agatu, FCT, Nigeria",
  natureOfBusiness: "Agriculture & Agribusiness",
  domain: "ibrahimos.africa",
  locale: "en-NG",
  currency: "NGN",
  nav: [
    { label: "Product", href: "/product" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Pricing", href: "/pricing" },
  ],
  ctas: {
    primary: { label: "Join waitlist", href: "/waitlist" },
    secondary: { label: "Book a demo", href: "/demo" },
    tertiary: { label: "Early access", href: "/early-access" },
  },
  problems: [
    "Late disease and pest detection cuts yields.",
    "Farm records and finances are scattered or missing.",
    "Trusted local-language expert advice is hard to reach on demand.",
  ],
  /** Exactly 4 capability metrics — product capability, not fake traction */
  capabilityStats: [
    { label: "AI field assistant", value: "Chat + photo" },
    { label: "Staple crops covered", value: "7+" },
    { label: "Local languages", value: "5" },
    { label: "Season tools", value: "Weather · market · tasks" },
  ],
  launchStrip: {
    eyebrow: "Launching across",
    places: ["Kaduna", "Kano", "Oyo", "Lagos", "Enugu", "Abuja"],
    note: "Early access for farmers, cooperatives, and commercial farm managers.",
  },
  audiences: [
    "Smallholder farmers managing a few plots",
    "Commercial farms and farm managers",
    "Cooperatives coordinating many growers",
  ],
  testimonials: [
    {
      quote:
        "I used to wait days for someone to look at a yellow leaf. The pilot walkthrough showed me a spray plan the same morning.",
      name: "Amina Yusuf",
      role: "Maize grower · Kaduna (pilot)",
    },
    {
      quote:
        "Records and market prices in one place is what our members keep asking for. We are lining up for early seats.",
      name: "Chinedu Okeke",
      role: "Cooperative secretary · Enugu (pilot)",
    },
    {
      quote:
        "For our managers, disease confidence plus weather timing is the difference between guessing and scheduling labour.",
      name: "Fatima Bello",
      role: "Farm operations · Kano (pilot)",
    },
  ],
  faqs: [
    {
      q: "Is IbrahimOS only for large commercial farms?",
      a: "No. It is designed for smallholder plots and commercial ops — simple enough for a first smartphone, dense enough for managers.",
    },
    {
      q: "Do I need an internet connection every minute?",
      a: "The product is designed offline-friendly for field habits. Online sync powers AI analysis and market updates when you are connected.",
    },
    {
      q: "Which crops and languages are supported?",
      a: "Staples like maize, rice, cassava, tomato, pepper, yam, and beans — with English, Pidgin, Hausa, Yoruba, and Igbo on the roadmap for advice.",
    },
    {
      q: "Is billing live today?",
      a: "No. Pricing on this site is early-stage intent. Join waitlist, book a demo, or request early access — we are not taking card payments on the marketing site.",
    },
    {
      q: "How does disease detection work in the demo?",
      a: "Upload a photo or describe symptoms. The demo runs a choreographed pipeline and returns a full assessment you can act on — even without an API key.",
    },
  ],
  howItWorks: [
    {
      title: "Describe the field",
      body: "Upload a leaf photo or type what you see — crop, location, and symptoms in plain language.",
    },
    {
      title: "Get practical advice",
      body: "IbrahimOS returns a diagnosis, treatment steps, fertilizer notes, and weather timing you can act on.",
    },
    {
      title: "Run the season",
      body: "Track fields, market prices, and weather in one place — then move into financing and buyers as you grow.",
    },
  ],
  capabilities: [
    {
      title: "AI farm assistant",
      body: "Ask about planting, fertilizer, pests, and market timing in practical language built for African farms.",
    },
    {
      title: "Disease & nutrient checks",
      body: "Photo or symptom intake with confidence, treatment steps, and estimated yield impact.",
    },
    {
      title: "Fields & records",
      body: "Keep crops, planting dates, and field status together instead of scattered notebooks.",
    },
    {
      title: "Weather intelligence",
      body: "Localized forecasts with spray windows, rain risk, and harvest timing cues.",
    },
    {
      title: "Market prices",
      body: "Compare staple crop prices across major markets so you know when to sell.",
    },
    {
      title: "Tasks & yield hints",
      body: "Seasonal reminders and yield guidance tied to the crops you actually grow.",
    },
  ],
  team: [
    {
      name: "Adisa Abdulrazaq Kehinde",
      role: "Founder & CEO",
      bio: "Founder and CEO of IbrahimOS. Leading the vision for an AI farm operating system that helps African farmers produce more, lose less, and earn more each season.",
      linkedin: "https://www.linkedin.com/in/abdulrazaqme/",
    },
    {
      name: "Ibrahim Nurudeen",
      role: "Co-founder",
      bio: "Co-founder of IbrahimOS and Ibrahim's Agricultural Enterprise. Focused on building an AI farm assistant that helps African farmers catch crop problems earlier, keep better records, and earn more each season.",
      linkedin: "https://www.linkedin.com/in/ibrahim-nurudeen-375b55267/",
    },
    {
      name: "Ifeoluwa Johz",
      role: "Co-founder",
      bio: "Co-founder helping shape IbrahimOS product and farmer workflows — disease intake, seasonal guidance, and practical tools cooperatives can demo and adopt.",
      linkedin: "https://www.linkedin.com/in/ifeoluwajohz/",
    },
  ],
  pricing: [
    {
      name: "Free",
      priceLabel: "₦0",
      blurb: "Basic AI chat, farm records, and weather for getting started.",
      cta: { label: "Join waitlist", href: "/waitlist" },
    },
    {
      name: "Premium",
      priceLabel: "₦4,500/mo",
      blurb: "Unlimited AI, disease detection, yield prediction, and priority support.",
      cta: { label: "Request early access", href: "/early-access" },
    },
    {
      name: "Enterprise",
      priceLabel: "Custom",
      blurb: "Multi-farm ops, roles, and reporting for commercial farms and cooperatives.",
      cta: { label: "Book a demo", href: "/demo" },
    },
  ],
  demoResults: [
    {
      id: "demo-maize-blight",
      createdAt: "2026-07-28T09:15:00.000Z",
      input: {
        mode: "upload",
        crop: "Maize",
        symptom: "Yellowing leaves with brown lesions",
        location: "Kaduna, NG",
        farmSizeHa: 2.5,
        imageName: "maize-leaf.jpg",
      },
      disease: "Northern Corn Leaf Blight",
      category: "disease",
      confidence: 91,
      treatment: [
        "Apply fungicide with mancozeb or propiconazole at label rate",
        "Remove heavily infected lower leaves",
        "Improve field drainage before the next rain window",
      ],
      estimatedImpact: "10–25% yield loss if untreated this season",
      fertilizerNote:
        "Hold high nitrogen until infection stabilizes; side-dress after treatment.",
      weatherNote: "Humid nights forecast — spray before Thursday rain.",
      nextActions: [
        "Spray tomorrow morning",
        "Scout adjacent rows",
        "Log input cost",
      ],
      yieldHint: "Estimated 3.1–3.6 t/ha if treated within 5 days",
    },
    {
      id: "demo-tomato-deficit",
      createdAt: "2026-07-20T14:40:00.000Z",
      input: {
        mode: "manual",
        crop: "Tomato",
        symptom: "Purple leaf undersides, slow growth",
        location: "Oyo, NG",
        farmSizeHa: 0.8,
      },
      disease: "Phosphorus deficiency",
      category: "nutrient",
      confidence: 86,
      treatment: [
        "Apply SSP or NPK 15-15-15 based on soil test",
        "Mulch to reduce leaching in sandy spots",
      ],
      estimatedImpact: "Fruit set delay 1–2 weeks if uncorrected",
      fertilizerNote: "Split application; avoid burning roots in dry soil.",
      weatherNote: "Light rains mid-week help nutrient uptake.",
      nextActions: [
        "Soil sample",
        "Apply amendment",
        "Recheck leaves in 10 days",
      ],
      yieldHint: "Recover toward 18–22 kg per plant with correction",
    },
  ] satisfies Assessment[],
};

export type SiteConfig = typeof siteConfig;
