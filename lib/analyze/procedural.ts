import type {
  Assessment,
  AssessmentCategory,
  AssessmentInput,
} from "@/lib/analyze/types";

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `assess-${Date.now()}`;
}

export function proceduralAnalyze(input: AssessmentInput): Assessment {
  const text = `${input.crop} ${input.symptom} ${input.notes ?? ""}`.toLowerCase();

  let category: AssessmentCategory = "advice";
  let disease = `${input.crop} field advice`;
  let confidence = 72;
  let treatment: string[] = [
    `Scout the ${input.crop.toLowerCase()} stand thoroughly this week`,
    "Remove heavily damaged leaves and dispose away from the field",
    "Record input costs after any spray or amendment",
  ];
  let estimatedImpact = "Minor yield drag if the issue spreads without action";
  let fertilizerNote = "Keep balanced NPK; avoid over-applying nitrogen on stressed plants.";
  let weatherNote = `Watch local humidity around ${input.location} before spraying.`;
  let nextActions = ["Scout tomorrow morning", "Log observation", "Recheck in 5 days"];
  let yieldHint = `Maintain expected range for ${input.crop} if action is timely`;

  if (
    /yellow|lesion|blight|spot|fung|rust|leaf/.test(text)
  ) {
    category = "disease";
    disease =
      input.crop.toLowerCase() === "maize"
        ? "Northern Corn Leaf Blight (suspected)"
        : `${input.crop} foliar disease (suspected)`;
    confidence = 88;
    treatment = [
      "Apply a labeled fungicide suited to local crops at recommended rate",
      "Remove badly infected lower leaves",
      "Improve airflow and drainage where water sits after rain",
    ];
    estimatedImpact = "10–25% yield loss if untreated through peak humidity";
    fertilizerNote = "Pause heavy nitrogen until infection stabilizes.";
    weatherNote = "Prefer a dry morning spray window before the next rain.";
    nextActions = ["Spray in the morning", "Scout neighboring rows", "Log spray cost"];
    yieldHint = "Recover toward seasonal norms if treated within a week";
  } else if (/purple|phosph|nutrient|pale|stunt|deficien/.test(text)) {
    category = "nutrient";
    disease = "Nutrient deficiency (phosphorus / general)";
    confidence = 84;
    treatment = [
      "Apply SSP or balanced NPK based on a quick soil check",
      "Mulch to reduce nutrient leaching on sandy patches",
      "Water lightly after amendment if soils are dry",
    ];
    estimatedImpact = "Growth delay 1–2 weeks if uncorrected";
    fertilizerNote = "Split applications; avoid burning roots in dry soil.";
    weatherNote = "Light rains help uptake — avoid heavy storms right after broadcast.";
    nextActions = ["Soil sample", "Apply amendment", "Recheck leaves in 10 days"];
    yieldHint = "Yield trajectory improves once deficiency is corrected";
  } else if (/worm|pest|hole|caterpillar|aphid|insect|bore/.test(text)) {
    category = "pest";
    disease = `${input.crop} pest pressure (suspected)`;
    confidence = 81;
    treatment = [
      "Hand-pick visible larvae where practical",
      "Use a labeled insecticide or biological control for the pest type",
      "Clear crop residue that shelters pests at field edges",
    ];
    estimatedImpact = "Spot damage can expand quickly in warm weeks";
    fertilizerNote = "Do not over-fertilize soft new growth that attracts pests.";
    weatherNote = "Treat in calm weather; avoid spraying before heavy rain.";
    nextActions = ["Scout at dawn", "Treat hotspots", "Monitor for 3 days"];
    yieldHint = "Containment this week protects harvest volume";
  }

  return {
    id: newId(),
    createdAt: new Date().toISOString(),
    input,
    disease,
    category,
    confidence,
    treatment,
    estimatedImpact,
    fertilizerNote,
    weatherNote,
    nextActions,
    yieldHint,
  };
}
