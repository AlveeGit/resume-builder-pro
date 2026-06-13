"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/hooks/useResume";
import { useRegion } from "@/hooks/useRegion";

type PersonalForm = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;

  fathersName?: string;
  mothersName?: string;
  dob?: string;
  gender?: string;
  nationality?: string;
  religion?: string;
  nid?: string;
  maritalStatus?: string;
  photo?: string;
};

export function PersonalInfoSection() {
  const { resume, updatePersonal, setPhoto, updateBDFields } = useResume();
  const { isFieldVisible, activeRegion } = useRegion();

  const isBD = activeRegion.id === "bd";

  const { register, watch, setValue } = useForm<PersonalForm>({
    defaultValues: {
      fullName: resume.personal?.name || "",
      email: resume.personal?.email || "",
      phone: resume.personal?.phone || "",
      location: resume.personal?.location || "",
      website: resume.personal?.website || "",
      linkedin: resume.personal?.linkedin || "",
      github: resume.personal?.github || "",
    },
  });

  const values = watch();

  // 🔥 LIVE SYNC → Zustand (no submit needed)
  useEffect(() => {
    updatePersonal({
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      location: values.location,
      website: values.website,
      linkedin: values.linkedin,
      github: values.github,
    });
  }, [values]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <Label>Full Name *</Label>
          <Input {...register("fullName")} />
        </div>

        <div>
          <Label>Email *</Label>
          <Input {...register("email")} />
        </div>

        <div>
          <Label>Phone *</Label>
          <Input {...register("phone")} />
        </div>

        <div>
          <Label>Location *</Label>
          <Input {...register("location")} />
        </div>

        <div>
          <Label>Website</Label>
          <Input {...register("website")} />
        </div>

        <div>
          <Label>LinkedIn</Label>
          <Input {...register("linkedin")} />
        </div>

        <div>
          <Label>GitHub</Label>
          <Input {...register("github")} />
        </div>
      </div>

      {/* ===================== */}
      {/* BD EXTRA FIELDS */}
      {/* ===================== */}
      {isBD && (
        <div className="pt-4 border-t space-y-3">
          <div>
            <Label>Father&apos;s Name *</Label>
            <Input
              onChange={(e) => updateBDFields({ fathersName: e.target.value })}
            />
          </div>

          <div>
            <Label>Mother&apos;s Name *</Label>
            <Input
              onChange={(e) => updateBDFields({ mothersName: e.target.value })}
            />
          </div>

          <div>
            <Label>Date of Birth *</Label>
            <Input type="date" />
          </div>

          <div>
            <Label>Nationality</Label>
            <Input />
          </div>

          <div>
            <Label>Religion</Label>
            <Input />
          </div>

          <div>
            <Label>NID Number</Label>
            <Input />
          </div>

          <div>
            <Label>Marital Status</Label>
            <Input />
          </div>

          {/* PHOTO (BD + EU ONLY) */}
          {(isFieldVisible("photo") || activeRegion.id === "eu") && (
            <div>
              <Label>Photo</Label>
              <Input type="file" accept="image/*" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
