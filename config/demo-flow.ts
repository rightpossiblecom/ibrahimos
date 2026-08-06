export const demoFlow = {
  hardcodeVisionDemo: true,
  pipelineSteps: [
    { id: "ingest", label: "Reading leaf image & farm context" },
    { id: "vision", label: "Matching local crop disease patterns" },
    { id: "agronomy", label: "Drafting treatment & timing" },
    { id: "risk", label: "Estimating yield impact" },
  ],
  conversion: {
    premium: {
      title: "Unlock Premium AI",
      body: "Unlimited disease scans, yield prediction, and priority agronomy tips.",
      ctaLabel: "Request Premium access",
    },
    financing: {
      title: "Input financing",
      body: "Get seeds and fertilizer now; repay after harvest with trusted farm data.",
      ctaLabel: "Express interest",
    },
    buyers: {
      title: "Find buyers",
      body: "Match your expected harvest with nearby aggregators and markets.",
      ctaLabel: "Notify me when marketplace opens",
    },
  },
} as const;

export type DemoFlow = typeof demoFlow;
