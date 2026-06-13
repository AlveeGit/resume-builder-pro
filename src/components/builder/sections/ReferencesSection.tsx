"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useResume } from "@/hooks/useResume";
import { useRegion } from "@/hooks/useRegion";

type RefForm = {
  items: {
    id: string;
    name: string;
    title: string;
    organization: string;
    email: string;
    phone: string;
  }[];
};

export function ReferencesSection() {
  const { resume, updateReference } = useResume();
  const { activeRegion } = useRegion();

  const isBD = activeRegion.id === "bd";

  const { control, register, watch } = useForm<RefForm>({
    defaultValues: {
      items: resume.references || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const values = watch();

  useEffect(() => {
    values.items?.forEach((ref) => {
      updateReference(ref.id, ref);
    });
  }, [values]);

  if (!isBD) return null;

  const canAddMore = fields.length < 2;

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        References will appear at the end of your CV.
      </p>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 space-y-2">
          <Input placeholder="Name *" {...register(`items.${index}.name`)} />

          <Input placeholder="Title *" {...register(`items.${index}.title`)} />

          <Input
            placeholder="Organization *"
            {...register(`items.${index}.organization`)}
          />

          <Input placeholder="Email" {...register(`items.${index}.email`)} />

          <Input placeholder="Phone" {...register(`items.${index}.phone`)} />

          <Button size="sm" variant="destructive" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}

      {canAddMore && (
        <Button
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              name: "",
              title: "",
              organization: "",
              email: "",
              phone: "",
            })
          }
        >
          Add Reference
        </Button>
      )}
    </div>
  );
}
