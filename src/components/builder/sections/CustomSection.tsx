"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useResume } from "@/hooks/useResume";

type CustomForm = {
  sections: {
    id: string;
    title: string;
    items: string[];
  }[];
};

export function CustomSection() {
  const { resume, updateCustomSection } = useResume();

  const { control, register, watch } = useForm<CustomForm>({
    defaultValues: {
      sections: resume.customSections || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const values = watch();

  useEffect(() => {
    values.sections?.forEach((section) => {
      updateCustomSection(section.id, section);
    });
  }, [values]);

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 space-y-3">
          {/* SECTION TITLE */}
          <Input
            placeholder="Section Title (e.g. Volunteer Work, Achievements)"
            {...register(`sections.${index}.title`)}
          />

          {/* ITEMS */}
          <div className="space-y-2">
            <Input
              placeholder="Add item and press enter (comma separated supported)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  const value = (e.target as HTMLInputElement).value;

                  if (!value.trim()) return;

                  const current = values.sections[index]?.items || [];

                  const updated = [...current, value.trim()];

                  (e.target as HTMLInputElement).value = "";

                  // manual sync into RHF
                  values.sections[index].items = updated;
                }
              }}
            />

            <div className="flex flex-wrap gap-1">
              {(values.sections[index]?.items || []).map((item, i) => (
                <span key={i} className="text-xs px-2 py-1 border rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Button size="sm" variant="destructive" onClick={() => remove(index)}>
            Remove Section
          </Button>
        </div>
      ))}

      <Button
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            title: "",
            items: [],
          })
        }
      >
        Add Custom Section
      </Button>
    </div>
  );
}
