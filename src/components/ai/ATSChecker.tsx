"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useResume } from "@/hooks/useResume";

type ATSResult = {
  score: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
};

export function ATSChecker() {
  const { resume } = useResume();

  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<ATSResult | null>(null);

  const resumeText = JSON.stringify(resume, null, 2);

  const handleCheck = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "ats-check",
          data: {
            resumeText,
            jobDescription,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ATS check failed");
      }

      setResult(JSON.parse(data.result));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "ATS check failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description..."
        className="min-h-[250px]"
      />

      <Button onClick={handleCheck} disabled={loading}>
        {loading ? "Analyzing..." : "Run ATS Check"}
      </Button>

      {result && (
        <div className="space-y-4 border rounded-lg p-4">
          <div>
            <h3 className="font-semibold">ATS Score</h3>
            <p className="text-2xl font-bold">{result.score}/100</p>
          </div>

          <div>
            <h3 className="font-semibold">Matching Keywords</h3>
            <ul className="list-disc pl-5">
              {result.matchingKeywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Missing Keywords</h3>
            <ul className="list-disc pl-5">
              {result.missingKeywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Suggestions</h3>
            <ul className="list-disc pl-5">
              {result.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
