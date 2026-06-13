// PreviewPanel.tsx
"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeRenderer } from "@/components/resume/ResumeRenderer";

export function PreviewPanel() {
  const handleDownload = () => {
    // TODO: hook into PDF generator
    console.log("Download PDF");
  };

  return (
    <div className="h-full flex flex-col">
      {/* TOP BAR */}
      <div className="h-12 border-b flex items-center justify-between px-3">
        <span className="text-sm font-medium">Preview</span>

        <Button size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* PREVIEW AREA */}
      <div className="flex-1 overflow-auto bg-muted/30 p-6 flex justify-center">
        {/* A4 SCALE WRAPPER */}
        <div
          id="resume-preview"
          className="
            origin-top
            bg-white
            shadow-lg
            w-[210mm]
            min-h-[297mm]
            p-8
          "
          style={{
            transform: "scale(0.8)",
          }}
        >
          <ResumeRenderer resume={resume} />
        </div>
      </div>
    </div>
  );
}