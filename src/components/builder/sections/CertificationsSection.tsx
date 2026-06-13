"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useResume } from "@/hooks/useResume";

type CertForm = {
  items: {
    id: string;
    name: string;
    issuer: string;
    date?: string;
    url?: string;
  }[];
};

export function CertificationsSection() {
  const { resume, updateCertification } = useResume();

  const { control, register, watch } = useForm<CertForm>({
    defaultValues: {
      items: resume.certifications || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const values = watch();

  useEffect(() => {
    values.items?.forEach((cert) => {
      updateCertification(cert.id, cert);
    });
  }, [values]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 space-y-2">
          <Input
            placeholder="Certificate Name *"
            {...register(`items.${index}.name`)}
          />

          <Input
            placeholder="Issuing Organization *"
            {...register(`items.${index}.issuer`)}
          />

          <Input type="date" {...register(`items.${index}.date`)} />

          <Input placeholder="URL" {...register(`items.${index}.url`)} />

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
            issuer: "",
            date: "",
            url: "",
          })
        }
      >
        Add Certification
      </Button>
    </div>
  );
}
