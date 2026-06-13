// ResumeRenderer.tsx
"use client";

import { ResumeData } from "@/types/resume";

import { TemplateUK } from "./templates/TemplateUK";
// future imports
// import { TemplateBD } from "./templates/TemplateBD";
// import { TemplateEU } from "./templates/TemplateEU";
// import { TemplateInternational } from "./templates/TemplateInternational";

export function ResumeRenderer({ resume }: { resume: ResumeData }) {
  const { region, templateId } = resume;

  // 🔥 fallback logic
  const key = `${region}-${templateId}`;

  switch (key) {
    case "uk-default":
    case "uk":
      return <TemplateUK data={resume} />;

    // case "bd-default":
    //   return <TemplateBD data={resume} />;

    // case "eu-default":
    //   return <TemplateEU data={resume} />;

    // case "international-default":
    //   return <TemplateInternational data={resume} />;

    default:
      return <TemplateUK data={resume} />;
  }
}