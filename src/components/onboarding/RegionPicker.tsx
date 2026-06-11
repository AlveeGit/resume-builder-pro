// RegionPicker.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/stores/resumeStore";

const REGIONS = [
  {
    id: "bd",
    flag: "🇧🇩",
    name: "Bangladesh",
    desc: "CV / Biodata · photo · declaration",
    info: "Bangladesh format: photo required, include father/mother name, religion, NID. Declaration at the end.",
  },
  {
    id: "uk",
    flag: "🇬🇧",
    name: "United Kingdom",
    desc: "CV · no photo · 2 pages",
    info: "UK format: no photo, no personal details. Clean 2-page CV, strong profile summary at top.",
  },
  {
    id: "eu",
    flag: "🇪🇺",
    name: "Europe (EU)",
    desc: "CV · Europass style · photo optional",
    info: "EU format: photo optional, Europass header supported. Personal info varies by country.",
  },
  {
    id: "international",
    flag: "🌐",
    name: "International",
    desc: "Resume · ATS-first · 1 page",
    info: "International format: ATS-first 1-page resume. No photo, keyword-rich bullet points.",
  },
] as const;

type RegionId = (typeof REGIONS)[number]["id"];

export default function RegionPicker() {
  const router = useRouter();
  const setRegion = useResumeStore((s) => s.setRegion);

  const [selected, setSelected] = useState<RegionId | null>(null);

  const activeRegion = REGIONS.find((r) => r.id === selected);

  const handleStart = () => {
    if (!selected) return;

    localStorage.setItem("resume-region", selected);
    setRegion(selected);

    router.push("/builder");
  };

  const label = selected === "international" ? "my Resume" : "my CV";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-medium tracking-tight">ResumeBuilder</h1>
          <p className="text-muted-foreground">
            Build the perfect CV for your market
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REGIONS.map((region) => {
            const isSelected = selected === region.id;

            return (
              <Card
                key={region.id}
                onClick={() => setSelected(region.id)}
                className={`p-4 cursor-pointer transition border-2 ${
                  isSelected ? "border-blue-500" : "border-transparent"
                }`}
              >
                <div className="text-2xl">{region.flag}</div>

                <div className="font-medium mt-2">{region.name}</div>

                <div className="text-sm text-muted-foreground">
                  {region.desc}
                </div>
              </Card>
            );
          })}
        </div>

        {/* INFO BOX */}
        {activeRegion && (
          <div className="text-sm text-muted-foreground text-center px-2">
            {activeRegion.info}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center">
          <Button onClick={handleStart} disabled={!selected} className="px-6">
            Start building {label}
          </Button>
        </div>

        {/* FOOTER */}
        <p className="text-xs text-center text-muted-foreground">
          You can switch your target market at any time inside the editor.
        </p>
      </div>
    </div>
  );
}
