"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

import { useResume } from "@/hooks/useResume";

type LanguageForm = {
  items: {
    id: string;
    language: string;
    proficiency: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
  }[];
};

export function LanguagesSection() {
  const { resume, updateLanguage } = useResume();

  const { control, register, watch } = useForm<LanguageForm>({
    defaultValues: {
      items: resume.languages || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const values = watch();

  useEffect(() => {
    values.items?.forEach((lang) => {
      updateLanguage?.(lang.id, lang);
    });
  }, [values]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 space-y-2">
          <Input
            placeholder="Language"
            {...register(`items.${index}.language`)}
          />

          <Input
            placeholder="Proficiency (A1 - Native)"
            {...register(`items.${index}.proficiency`)}
          />

          <Button size="sm" variant="destructive" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}

      <Button
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            language: "",
            proficiency: "B1",
          })
        }
      >
        Add Language
      </Button>
    </div>
  );
}
