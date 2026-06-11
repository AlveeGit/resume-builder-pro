// src/app/page.tsx
"use client";
import RegionPicker from "@/components/onboarding/RegionPicker";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("resume-region");
    if (saved) {
      router.replace("/builder");
      return null;
    }
  }

  return <RegionPicker />;
}
