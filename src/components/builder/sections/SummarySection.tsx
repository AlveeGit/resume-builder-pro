"use client";

import { useEffect, useState } from "react";

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

      {/* AI ASSIST PLACEHOLDER */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          ✨ AI Assist (coming soon)
        </Button>
      </div>
    </div>
  );
}
