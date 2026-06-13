// EditorPanel.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { useResumeStore } from "@/stores/resumeStore";
import { useRegion } from "@/hooks/useRegion";

type SectionKey = string;

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b py-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium text-sm">{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

export function EditorPanel() {
  const { activeRegion, isFieldVisible } = useRegion();

  const resume = useResumeStore((state) => state.resume);
  const sectionOrder = resume.sectionOrder;

  const isBD = activeRegion.id === "bd";

  return (
    <div className="h-full overflow-y-auto px-4 py-3 space-y-2">
      {/* ===================== */}
      {/* PERSONAL INFO */}
      {/* ===================== */}
      {isFieldVisible("personal") && (
        <Section title="Personal Info">
          <p className="text-xs text-muted-foreground">
            Name, Email, Phone, Location, Website, LinkedIn, GitHub
          </p>
        </Section>
      )}

      {/* ===================== */}
      {/* SUMMARY */}
      {/* ===================== */}
      {isFieldVisible("summary") && (
        <Section title="Profile Summary">
          <p className="text-xs text-muted-foreground">
            Short professional overview
          </p>
        </Section>
      )}

      {/* ===================== */}
      {/* EXPERIENCE */}
      {/* ===================== */}
      {isFieldVisible("experience") && (
        <Section title="Work Experience">
          <p className="text-xs text-muted-foreground">
            Job history with bullet achievements
          </p>
        </Section>
      )}

      {/* ===================== */}
      {/* EDUCATION */}
      {/* ===================== */}
      {isFieldVisible("education") && (
        <Section title="Education">
          <p className="text-xs text-muted-foreground">Academic background</p>
        </Section>
      )}

      {/* ===================== */}
      {/* SKILLS */}
      {/* ===================== */}
      {isFieldVisible("skills") && (
        <Section title="Skills">
          <p className="text-xs text-muted-foreground">
            Technical and soft skills
          </p>
        </Section>
      )}

      {/* ===================== */}
      {/* LANGUAGES */}
      {/* ===================== */}
      {isFieldVisible("languages") && (
        <Section title="Languages">
          <p className="text-xs text-muted-foreground">
            Language proficiency levels
          </p>
        </Section>
      )}

      {/* ===================== */}
      {/* CERTIFICATIONS */}
      {/* ===================== */}
      {isFieldVisible("certifications") && (
        <Section title="Certifications">
          <p className="text-xs text-muted-foreground">
            Professional certifications and courses
          </p>
        </Section>
      )}

      {/* ===================== */}
      {/* PROJECTS */}
      {/* ===================== */}
      {isFieldVisible("projects") && (
        <Section title="Projects">
          <p className="text-xs text-muted-foreground">
            Personal and professional projects
          </p>
        </Section>
      )}

      {/* ===================== */}
      {/* CUSTOM SECTIONS */}
      {/* ===================== */}
      {isFieldVisible("customSections") && (
        <Section title="Custom Sections">
          <p className="text-xs text-muted-foreground">
            Add custom content blocks
          </p>
        </Section>
      )}

      {/* ===================== */}
      {/* BD ONLY SECTIONS */}
      {/* ===================== */}
      {isBD && (
        <>
          <Section title="Additional Information">
            <p className="text-xs text-muted-foreground">
              Father/Mother name, DOB, Religion, NID, Nationality, Marital
              Status
            </p>
          </Section>

          <Section title="References">
            <p className="text-xs text-muted-foreground">
              Professional references
            </p>
          </Section>

          <Section title="Declaration">
            <p className="text-xs text-muted-foreground">
              Formal declaration statement
            </p>
          </Section>
        </>
      )}
    </div>
  );
}
