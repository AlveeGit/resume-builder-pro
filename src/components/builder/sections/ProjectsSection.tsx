"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useResume } from "@/hooks/useResume";

type ProjectForm = {
  items: {
    id: string;
    name: string;
    description: string;
    url?: string;
    technologies: string[];
  }[];
};

export function ProjectsSection() {
  const { resume, updateProject } = useResume();

  const [techInput, setTechInput] = useState<Record<string, string>>({});

  const { control, register, watch, setValue } = useForm<ProjectForm>({
    defaultValues: {
      items: resume.projects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const values = watch();

  useEffect(() => {
    values.items?.forEach((proj) => {
      updateProject(proj.id, proj);
    });
  }, [values]);

  const addTech = (id: string, value: string) => {
    if (!value.trim()) return;

    const current = values.items.find((p) => p.id === id);
    const updated = [...(current?.technologies || []), value.trim()];

    setValue(
      `items.${fields.findIndex((f) => f.id === id)}.technologies`,
      updated,
    );

    setTechInput((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 space-y-2">
          <Input
            placeholder="Project Name *"
            {...register(`items.${index}.name`)}
          />

          <Textarea
            placeholder="Description"
            {...register(`items.${index}.description`)}
          />

          <Input
            placeholder="Project URL"
            {...register(`items.${index}.url`)}
          />

          {/* TECHNOLOGIES */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Add technology"
                value={techInput[field.id] || ""}
                onChange={(e) =>
                  setTechInput((prev) => ({
                    ...prev,
                    [field.id]: e.target.value,
                  }))
                }
              />

              <Button
                type="button"
                onClick={() => addTech(field.id, techInput[field.id])}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-1">
              {(values.items[index]?.technologies || []).map((tech, i) => (
                <span key={i} className="text-xs px-2 py-1 border rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Button size="sm" variant="destructive" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}

      <Button
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            name: "",
            description: "",
            url: "",
            technologies: [],
          })
        }
      >
        Add Project
      </Button>
    </div>
  );
}
