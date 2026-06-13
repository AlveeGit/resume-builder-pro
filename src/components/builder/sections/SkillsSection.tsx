"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

import { useResume } from "@/hooks/useResume";

type Skill = {
  id: string;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
};

export function SkillsSection() {
  const { resume, updateSkill, addSkill } = useResume();

  const [skill, setSkill] = useState("");

  const handleAdd = () => {
    if (!skill.trim()) return;

    addSkill({
      id: crypto.randomUUID(),
      name: skill,
      level: "intermediate",
    });

    setSkill("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Add skill"
        />

        <Button onClick={handleAdd}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {resume.skills?.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-2 border px-2 py-1 rounded-full"
          >
            <span className="text-sm">{s.name}</span>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => updateSkill(s.id, {})}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
