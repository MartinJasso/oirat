import { readFileSync, writeFileSync } from "node:fs";

type BriefInput = {
  businessName?: string;
  city?: string;
  offer?: string;
  audience?: string[];
  pains?: string[];
  proof?: string[];
  styleWords?: string[];
  cta?: string;
};

const THEME_PRESETS: Record<string, string> = {
  modern: "clean-tech",
  minimal: "minimal-contrast",
  serious: "editorial-dark",
  brutal: "brutalist-mono"
};

function pickTheme(styleWords: string[] = []) {
  for (const word of styleWords.map((w) => w.toLowerCase())) {
    if (THEME_PRESETS[word]) return THEME_PRESETS[word];
  }
  return "minimal-contrast";
}

function safeProof(proof: string[] = []) {
  return proof.filter((item) => item && !/fake|invent|unknown/i.test(item));
}

function run(inputPath: string) {
  const raw = readFileSync(inputPath, "utf8");
  const brief = JSON.parse(raw) as BriefInput;

  const brand = brief.businessName ?? "Your Brand";
  const city = brief.city ?? "Košice";
  const proof = safeProof(brief.proof);

  const spec = {
    brand: {
      name: brand,
      city,
      tone: ["minimal", "direct", "senior", "no-hype"],
      theme: { preset: pickTheme(brief.styleWords), radius: "xl", density: "tight" }
    },
    sections: [
      { type: "hero", enabled: true },
      { type: "valueProps", enabled: true },
      { type: "packages", enabled: true },
      { type: "credibility", enabled: proof.length > 0, hideIfMissingProof: true },
      { type: "useCasesTabs", enabled: true },
      { type: "faq", enabled: true },
      { type: "ctaForm", enabled: true }
    ]
  };

  const seo = {
    meta: {
      title: `AI konzultant ${city} | Senior AI služby`,
      description: `${brand}: AI audit a automatizácia procesov pre firmy v meste ${city}.`
    }
  };

  writeFileSync("content/site.spec.generated.json", JSON.stringify(spec, null, 2));
  writeFileSync("content/seo.generated.json", JSON.stringify(seo, null, 2));
}

const input = process.argv[2];
if (!input) {
  throw new Error("Usage: node scripts/generate-spec.ts <brief.json>");
}
run(input);
