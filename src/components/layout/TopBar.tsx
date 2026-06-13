// TopBar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Save, Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegionSwitcher } from "@/components/builder/RegionSwitcher";
import { useResumeStore } from "@/stores/resumeStore";

export function TopBar() {
  const resume = useResumeStore((state) => state.resume);

  // TODO: Replace with real auth state from Supabase
  const user = null;

  // TODO: Wire to actual save action
  const [isSaving] = useState(false);

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log("Export PDF");
  };

  const handleTitleChange = (title: string) => {
    // TODO:
    // Add updateTitle action to store if desired
    console.log(title);
  };

  return (
    <header className="h-14 border-b bg-background px-4">
      <div className="mx-auto flex h-full items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-2 shrink-0">
          <FileText className="h-4 w-4" />

          <span className="text-[13px] font-medium">ResumeBuilder</span>
        </div>

        {/* CENTER (Desktop Only) */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <Input
            defaultValue={resume.title ?? "My Resume"}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="
              max-w-md
              border-0
              shadow-none
              text-center
              font-medium
              focus-visible:ring-0
              bg-transparent
            "
            placeholder="Resume title"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 shrink-0">
          <RegionSwitcher />

          <Button variant="outline" size="sm" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>

          <Button size="sm" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>

          {user ? (
            <button
              className="
                h-8 w-8 rounded-full
                bg-muted
                flex items-center justify-center
                text-sm font-medium
              "
            >
              U
            </button>
          ) : (
            <Link
              href="/login"
              className="
                text-sm
                text-muted-foreground
                hover:text-foreground
                transition-colors
              "
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
