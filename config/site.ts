import type { Assessment } from "@/lib/analyze/types";

export const siteConfig = {
  brandName: "IbrahimOS",
  shortName: "ibrahim",
  tagline: "The AI Operating System for African Agriculture.",
  description:
    "One intelligent farm assistant for crops, weather, records, and market insight — built for African farmers first.",
  mission: "Help farmers produce more, lose less, and earn more through AI.",
  supportEmail: "hello@ibrahimos.top",
  foundedYear: 2025,
  legalEntity: "Ibrahim's Agricultural Enterprise",
  cacNumber: "9563561",
  tin: "2623736292415",
  businessAddress:
    "53, Behind Yoruba Chief Palace Gwako, Gwagwalada, Abuja, Agatu, FCT, Nigeria",
  natureOfBusiness: "Agriculture & Agribusiness",
  domain: "ibrahimos.top",
  locale: "en-NG",
  currency: "NGN",
  nav: [
    { label: "Product", href: "/product" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Season notes", href: "/season-notes" },
    { label: "Pricing", href: "/pricing" },
    { label: "The farm", href: "/the-farm" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
  ],
  footerNav: [
    { label: "Help", href: "/help" },
    { label: "Journal", href: "/blog" },
    { label: "Security", href: "/security" },
  ],
  solutions: [
    {
      title: "Smallholder plots",
      body: "Photo a leaf, get a spray plan, and keep planting dates without a notebook. Built for a first smartphone.",
    },
    {
      title: "Commercial farm managers",
      body: "Disease confidence, weather windows, and labour timing across fields — one assistant instead of scattered WhatsApp threads.",
    },
    {
      title: "Cooperatives",
      body: "Shared records and market prices so members sell with the same numbers, not rumours from the last market day.",
    },
  ],
  resources: [
    { title: "Help center", href: "/help", body: "Answers on crops, languages, offline use, and getting started." },
    { title: "Product features", href: "/features", body: "Assistant, disease checks, records, weather, and market prices." },
    { title: "Blog", href: "/blog", body: "Season notes from the field — blight, fertilizer, and market timing." },
    { title: "Security", href: "/security", body: "How farm photos, records, and accounts are handled." },
    { title: "Team", href: "/team", body: "The people building IbrahimOS in Abuja and across the farms." },
    { title: "Talk to sales", href: "/demo", body: "Multi-farm and cooperative walkthroughs." },
  ],
  blogPosts: [
    {
      slug: "northern-blight-before-the-rains",
      title: "Catch northern blight before the rains lock in",
      date: "12 Aug 2026",
      excerpt:
        "Humid nights in Kaduna and Kano are when maize lesions spread. A same-morning photo check beats waiting for an extension visit.",
      body: "Northern corn leaf blight likes wet nights and crowded stands. If lower leaves show long grey-brown lesions, treat before the next rain window — mancozeb or propiconazole at label rate, then strip the worst leaves. IbrahimOS scores the photo, names the disease, and tells you whether Thursday rain is a spray-or-wait call. Hold heavy nitrogen until the infection settles, then side-dress. Untreated, you can give up 10–25% of the season.",
    },
    {
      slug: "when-to-sell-maize-this-month",
      title: "When to sell maize this month",
      date: "4 Aug 2026",
      excerpt:
        "Market prices move faster than village talk. Compare Kaduna, Lagos, and Enugu before you load the bags.",
      body: "Selling on the first offer from the nearest aggregator is how cooperatives leave money on the floor. Open market prices in IbrahimOS, set the crop to maize, and read the spread across the cities you can actually reach. If Lagos is paying a real premium after transport, move. If the gap is thinner than diesel, hold and watch the next week. Records from the last sale sit next to the quote so you are not guessing from memory.",
    },
    {
      slug: "offline-habits-for-the-field",
      title: "Offline habits that still keep a farm record",
      date: "22 Jul 2026",
      excerpt:
        "You do not need a signal in the far plot. Capture the field, sync when you hit the road.",
      body: "Field work happens where bars drop. Log the crop, planting date, and what you see while you are standing in the row. Photos queue on the phone. When you reach the junction or the house Wi-Fi, IbrahimOS syncs the assessment and pulls weather plus market updates. The point is a record you can open next week — not a chatbot that dies when MTN drops.",
    },
  ],
  security: {
    intro:
      "Farm photos, field records, and account details stay in your IbrahimOS workspace. We collect what you submit to run disease checks and keep the season in one place.",
    points: [
      {
        title: "Accounts",
        body: "Sign in with your email. You are responsible for activity on that account. Sign out on shared phones.",
      },
      {
        title: "Field photos",
        body: "Leaf and plot photos are used to return a diagnosis and treatment steps. Only upload images from fields you manage.",
      },
      {
        title: "Records",
        body: "Crops, planting dates, and assessments stay in your workspace on this device. Treat a shared handset as a shared farm book.",
      },
      {
        title: "Questions",
        body: "Privacy and data questions go to hello@ibrahimos.top.",
      },
    ],
  },
  ctas: {
    primary: { label: "Log in", href: "/login" },
    secondary: { label: "Create account", href: "/signup" },
    tertiary: { label: "Talk to sales", href: "/demo" },
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
    eyebrow: "Farms across",
    places: ["Kaduna", "Kano", "Oyo", "Lagos", "Enugu", "Abuja"],
    note: "Used by smallholders, cooperatives, and commercial farm managers.",
  },
  audiences: [
    "Smallholder farmers managing a few plots",
    "Commercial farms and farm managers",
    "Cooperatives coordinating many growers",
  ],
  testimonials: [
    {
      quote:
        "I used to wait days for someone to look at a yellow leaf. IbrahimOS gave me a spray plan the same morning.",
      name: "Amina Yusuf",
      role: "Maize grower · Kaduna",
    },
    {
      quote:
        "Records and market prices in one place is what our members kept asking for. We run the season from here now.",
      name: "Chinedu Okeke",
      role: "Cooperative secretary · Enugu",
    },
    {
      quote:
        "For our managers, disease confidence plus weather timing is the difference between guessing and scheduling labour.",
      name: "Fatima Bello",
      role: "Farm operations · Kano",
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
      a: "Staples like maize, rice, cassava, tomato, pepper, yam, and beans — with advice in English, Pidgin, Hausa, Yoruba, and Igbo.",
    },
    {
      q: "How do I start?",
      a: "Log in or create an account on ibrahimos.top. Free covers chat, records, and weather. Premium unlocks unlimited AI, disease scans, and yield tools.",
    },
    {
      q: "How does disease detection work?",
      a: "Upload a leaf photo or describe symptoms. IbrahimOS returns a diagnosis, treatment steps, and weather timing you can act on the same day.",
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
      bio: "Co-founder helping shape IbrahimOS product and farmer workflows — disease intake, seasonal guidance, and practical tools cooperatives can run every season.",
      linkedin: "https://www.linkedin.com/in/ifeoluwajohz/",
    },
  ],
  pricing: [
    {
      name: "Free",
      priceLabel: "₦0",
      blurb: "Basic AI chat, farm records, and weather for getting started.",
      cta: { label: "Log in", href: "/login" },
    },
    {
      name: "Premium",
      priceLabel: "₦4,500/mo",
      blurb: "Unlimited AI, disease detection, yield prediction, and priority support.",
      cta: { label: "Create account", href: "/signup" },
    },
    {
      name: "Enterprise",
      priceLabel: "Custom",
      blurb: "Multi-farm ops, roles, and reporting for commercial farms and cooperatives.",
      cta: { label: "Talk to sales", href: "/demo" },
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
