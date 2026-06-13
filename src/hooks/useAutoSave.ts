"use client";

import { useEffect, useRef, useState } from "react";

import { useResume } from "@/hooks/useResume";

type SaveStatus = "idle" | "saving" | "saved" | "error";

import { saveResume, createVersion } from "@/lib/supabase/resumeService";

export function useAutoSave() {
  const { resume } = useResume();

  const [status, setStatus] = useState<SaveStatus>("idle");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resumeIdRef = useRef<string | null>(null);

  const lastSavedRef = useRef<string>("");

  const saveCountRef = useRef(0);

  const saveToLocal = () => {
    localStorage.setItem("resume-data", JSON.stringify(resume));
    localStorage.setItem("resume-region", resume.region);
  };

  const saveToServer = async () => {
    try {
      setStatus("saving");

      // const res = await fetch("/api/resume", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: resumeIdRef.current,
      //     title: resume.personal?.name || "My Resume",
      //     region: resume.region,
      //     data: resume,
      //     templateId: resume.templateId || "default",
      //   }),
      // });

      const res = await saveResume(
        "", // userId will be injected from auth layer later
        resume,
        resumeIdRef.current,
        resume.personal?.name || "My Resume",
        resume.region,
        resume.templateId || "default",
      );

      resumeIdRef.current = res.id;

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      resumeIdRef.current = data.id;

      setStatus("saved");
      lastSavedRef.current = JSON.stringify(resume);

      // ersion trigger logic After successful save
      saveCountRef.current += 1;

      const shouldSnapshot = saveCountRef.current % 10 === 0;

      if (shouldSnapshot) {
        await createVersion(resumeIdRef.current!, resume, "Auto-save");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const isGuest = async () => {
    // simple heuristic: no auth token = guest
    const token = localStorage.getItem("sb-access-token");

    return !token;
  };

  useEffect(() => {
    const run = async () => {
      const guest = await isGuest();

      // Always persist locally
      saveToLocal();

      // Guest mode → instant local save only
      if (guest) {
        setStatus("saved");
        return;
      }

      // Avoid unnecessary saves
      const serialized = JSON.stringify(resume);

      if (serialized === lastSavedRef.current) return;

      setStatus("saving");

      // Debounce server save
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        saveToServer();
      }, 3000);
    };

    run();
  }, [resume]);

  return {
    status,
  };
}
