//  src/components/builder/sections/SummarySection.tsx

"use client";

import { useEffect, useState } from "react";
import { AIAssistButton } from "@/components/ai/AIAssistButton";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useResume } from "@/hooks/useResume";
import { useRegion } from "@/hooks/useRegion";

export function SummarySection() {
  const { resume, updateSummary } = useResume();
  const { activeRegion } = useRegion();

  const [text, setText] = useState(resume.summary || "");

  const isBD = activeRegion.id === "bd";

  const label = isBD ? "Career Objective" : "Profile Summary";

  const maxChars = 500;

  // 🔥 live sync to store
  useEffect(() => {
    updateSummary(text);
  }, [text]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>

        <span className="text-xs text-muted-foreground">
          {text.length}/{maxChars}
        </span>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxChars}
        placeholder={
          isBD
            ? "Write your career objective..."
            : "Write a professional summary..."
        }
        className="min-h-[120px]"
      />

      {/* AI ASSIST  */}
      <div className="flex justify-end">

        <AIAssistButton
          action="generate-summary"
          label="Generate with AI"
          data={{
            name: resume.personal.name,
            experience: resume.experience,
            region: resume.region,
            targetRole: resume.experience?.[0]?.jobTitle || "Professional",
          }}
          onResult={(summary) => {
            setText(summary);
            updateSummary(summary);
          }}
        />{" "}
      </div>
    </div>
  );
}
