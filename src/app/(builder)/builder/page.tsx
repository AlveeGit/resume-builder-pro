// page.tsx
"use client";

import { useState } from "react";
import { EditorPanel } from "@/components/builder/EditorPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";

export default function BuilderPage() {
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");

  return (
    <div className="h-full w-full flex">
      {/* ===================== */}
      {/* DESKTOP LAYOUT */}
      {/* ===================== */}
      <div className="hidden md:flex h-full w-full">
        {/* LEFT: EDITOR (45%) */}
        <div className="w-[45%] border-r overflow-hidden">
          <EditorPanel />
        </div>

        {/* RIGHT: PREVIEW (55%) */}
        <div className="w-[55%] bg-muted/30 overflow-hidden">
          <PreviewPanel />
        </div>
      </div>

      {/* ===================== */}
      {/* MOBILE LAYOUT */}
      {/* ===================== */}
      <div className="md:hidden h-full w-full">
        {mobileView === "edit" ? <EditorPanel /> : <PreviewPanel />}
      </div>
    </div>
  );
}