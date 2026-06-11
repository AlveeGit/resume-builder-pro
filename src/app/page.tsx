// page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegionPicker from "@/components/onboarding/RegionPicker";

export default function HomePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedRegion = localStorage.getItem("resume-region");

    if (savedRegion) {
      router.replace("/builder");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  return <RegionPicker />;
}
