// TODO: implement regions.ts
export type RegionFieldConfig = {
  show: string[];
  hide: string[];
};

export type RegionConfig = {
  id: "BD" | "UK" | "EU" | "INTL";
  name: string;
  flag: string;
  documentName: string;
  fields: RegionFieldConfig;
};

export const REGIONS: RegionConfig[] = [
  {
    id: "BD",
    name: "Bangladesh",
    flag: "🇧🇩",
    documentName: "CV - Bangladesh Format",
    fields: {
      show: ["personalInfo", "education", "experience", "skills", "photo"],
      hide: ["drivingLicense", "workAuthorization"],
    },
  },
  {
    id: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    documentName: "CV - UK Standard",
    fields: {
      show: ["personalInfo", "education", "experience", "skills"],
      hide: ["photo", "nationalId", "maritalStatus"],
    },
  },
  {
    id: "EU",
    name: "European Union",
    flag: "🇪🇺",
    documentName: "CV - Europass Style",
    fields: {
      show: ["personalInfo", "education", "experience", "skills", "languages"],
      hide: ["photo"],
    },
  },
  {
    id: "INTL",
    name: "International",
    flag: "🌍",
    documentName: "Resume - International Format",
    fields: {
      show: [
        "personalInfo",
        "summary",
        "education",
        "experience",
        "skills",
        "projects",
      ],
      hide: [],
    },
  },
];

export const getRegionById = (id: RegionConfig["id"]) =>
  REGIONS.find((r) => r.id === id);
