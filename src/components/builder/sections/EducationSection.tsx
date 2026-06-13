"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useResume } from "@/hooks/useResume";

type EducationForm = {
  items: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear?: string;
    grade?: string;
  }[];
};

export function EducationSection() {
  const { resume, updateEducation } = useResume();

  const { control, register, watch } = useForm<EducationForm>({
    defaultValues: {
      items: resume.education || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const values = watch();

  useEffect(() => {
    values.items?.forEach((edu) => {
      updateEducation(edu.id, edu);
    });
  }, [values]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 space-y-2">
          <Input
            placeholder="Institution *"
            {...register(`items.${index}.institution`)}
          />

          <Input
            placeholder="Degree *"
            {...register(`items.${index}.degree`)}
          />

          <Input
            placeholder="Field of Study *"
            {...register(`items.${index}.field`)}
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Start Year"
              {...register(`items.${index}.startYear`)}
            />
            <Input
              placeholder="End Year"
              {...register(`items.${index}.endYear`)}
            />
          </div>

          <Input
            placeholder="Grade / GPA"
            {...register(`items.${index}.grade`)}
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
            institution: "",
            degree: "",
            field: "",
            startYear: "",
            endYear: "",
            grade: "",
          })
        }
      >
        Add Education
      </Button>
    </div>
  );
}
