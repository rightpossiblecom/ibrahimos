export const demoFlow = {
  hardcodeVisionDemo: true,
  pipelineSteps: [
    { id: "evidence", label: "Reading field evidence and scout notes" },
    { id: "threat", label: "Classifying the threat and confidence" },
    { id: "response", label: "Sizing affected hectares and response cost" },
    { id: "command", label: "Assembling crew, deadline, and recovery" },
  ],
  analysisMs: 90000,
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
