//  usePDF.ts
"use client";

import { useState } from "react";

import { useResume } from "@/hooks/useResume";
import { exportResumeToPDF } from "@/lib/pdf";

// adjust import based on your setup
import { useToast } from "@/components/ui/use-toast";

export function usePDF() {
  const { resume } = useResume();
  const { toast } = useToast();

  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    try {
      setIsExporting(true);

      const fullName = resume.personal?.name || "Resume";

      const region = resume.region;

      const fileName =
        region === "international"
          ? `${fullName.replace(/\s+/g, "-")}-Resume.pdf`
          : `${fullName.replace(/\s+/g, "-")}-CV.pdf`;

      await exportResumeToPDF("resume-preview", fileName);

      toast({
        title: "Success",
        description: "Your CV has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportPDF,
    isExporting,
  };
}