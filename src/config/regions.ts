//  regions.ts

export type RegionId = "bd" | "uk" | "eu" | "international";

export type DocumentType = "CV" | "Resume" | "Biodata";

export type RegionConfig = {
  id: RegionId;
  name: string;
  flag: string;
  documentName: DocumentType;

  desc: string; // 👈 ADD THIS

  visibleFields: string[];
  requiredFields: string[];

  maxPages: number;
  photoRequired: boolean;

  showDeclaration: boolean;
  showReferences: boolean;
  showParentsName: boolean;

  pageSize: "A4";
};

export const REGION_CONFIG: Record<RegionId, RegionConfig> = {
  bd: {
    id: "bd",
    name: "Bangladesh",
    flag: "🇧🇩",
    documentName: "Biodata",

    desc: "Biodata format with photo, family details, and declaration",

    visibleFields: [
      "personal",
      "photo",
      "summary",
      "experience",
      "education",
      "skills",
      "languages",
      "certifications",
      "projects",
      "customSections",
      "fathersName",
      "mothersName",
      "religion",
      "nationality",
      "nid",
      "maritalStatus",
      "dob",
      "references",
      "declaration",
    ],

    requiredFields: ["personal", "experience", "education", "skills"],

    maxPages: 5,
    photoRequired: true,

    showDeclaration: true,
    showReferences: true,
    showParentsName: true,

    pageSize: "A4",
  },

  uk: {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    documentName: "CV",

    desc: "Clean CV format, no photo, max 2 pages",

    visibleFields: [
      "personal",
      "summary",
      "experience",
      "education",
      "skills",
      "languages",
      "certifications",
      "projects",
      "customSections",
    ],

    requiredFields: ["personal", "experience", "education"],

    maxPages: 2,
    photoRequired: false,

    showDeclaration: false,
    showReferences: false,
    showParentsName: false,

    pageSize: "A4",
  },

  eu: {
    id: "eu",
    name: "European Union",
    flag: "🇪🇺",
    documentName: "CV",

    desc: "Europass-style CV, structured and formal",

    visibleFields: [
      "personal",
      "photo",
      "summary",
      "experience",
      "education",
      "skills",
      "languages",
      "certifications",
      "projects",
      "customSections",
    ],

    requiredFields: ["personal", "experience", "education", "skills"],

    maxPages: 4,
    photoRequired: false,

    showDeclaration: false,
    showReferences: false,
    showParentsName: false,

    pageSize: "A4",
  },

  international: {
    id: "international",
    name: "International",
    flag: "🌍",
    documentName: "Resume",

    desc: "ATS-optimized one-page resume for global jobs",

    visibleFields: [
      "personal",
      "summary",
      "experience",
      "education",
      "skills",
      "projects",
      "customSections",
    ],

    requiredFields: ["personal", "experience", "skills"],

    maxPages: 1,
    photoRequired: false,

    showDeclaration: false,
    showReferences: false,
    showParentsName: false,

    pageSize: "A4",
  },
};

export const getRegionConfig = (id: RegionId) => REGION_CONFIG[id];
