"use client";

import { useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useResume } from "@/hooks/useResume";
import { useRegion } from "@/hooks/useRegion";

export function DeclarationSection() {
  const { resume, updateDeclaration } = useResume();
  const { activeRegion } = useRegion();

  const isBD = activeRegion.id === "bd";

  const defaultText =
    "I hereby declare that all the information given above is true and correct to the best of my knowledge and belief.";

  const [text, setText] = useState(resume.declaration || defaultText);

  useEffect(() => {
    updateDeclaration(text);
  }, [text]);

  if (!isBD) return null;

  return (
    <div className="space-y-2">
      <Label>Declaration</Label>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[120px]"
      />

      <p className="text-xs text-muted-foreground">
        A declaration is a formal statement confirming the accuracy of your CV
        information. It is commonly required in Bangladesh-style biodata
        formats.
      </p>
    </div>
  );
}
