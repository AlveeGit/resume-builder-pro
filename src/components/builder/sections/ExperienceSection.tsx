"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useResume } from "@/hooks/useResume";

type ExperienceForm = {
  items: {
    id: string;
    jobTitle: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    bullets: { text: string }[];
  }[];
};

export function ExperienceSection() {
  const { resume, updateExperience, addExperience } = useResume();

  const { control, register, watch, setValue } = useForm<ExperienceForm>({
    defaultValues: {
      items: resume.experience || [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "items",
  });

  const values = watch();

  useEffect(() => {
    values.items?.forEach((exp, index) => {
      updateExperience(exp.id, exp);
    });
  }, [values]);

  return (
    <div className="space-y-6">
      {fields.map((field, index) => {
        const isCurrent = watch(`items.${index}.current`);

        return (
          <div key={field.id} className="border rounded-md p-3 space-y-3">
            {/* Drag handle placeholder */}
            <div className="text-xs text-muted-foreground cursor-move">
              ☰ Drag
            </div>

            <div className="grid gap-2">
              <Input
                placeholder="Job Title *"
                {...register(`items.${index}.jobTitle`)}
              />

              <Input
                placeholder="Company *"
                {...register(`items.${index}.company`)}
              />

              <Input
                placeholder="Location"
                {...register(`items.${index}.location`)}
              />

              <div className="grid grid-cols-2 gap-2">
                <Input type="date" {...register(`items.${index}.startDate`)} />

                <Input
                  type="date"
                  {...register(`items.${index}.endDate`)}
                  disabled={isCurrent}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isCurrent}
                  onCheckedChange={(val) =>
                    setValue(`items.${index}.current`, Boolean(val))
                  }
                />
                <Label>Currently working here</Label>
              </div>

              <Textarea
                placeholder="Bullet points (one per line)"
                {...register(`items.${index}.bullets.0.text`)}
              />
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        );
      })}

      <Button
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            jobTitle: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            bullets: [],
          })
        }
      >
        Add Experience
      </Button>
    </div>
  );
}
