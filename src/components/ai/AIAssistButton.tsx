// AIAssistButton.tsx

"use client";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
type AIAssistButtonProps = {
  action: "improve-bullet" | "generate-summary" | "ats-check";
  data: unknown;
  onResult: (result: string) => void;
  label?: string;
};
export function AIAssistButton({
  action,
  data,
  onResult,
  label = "AI Assist",
}: AIAssistButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "AI request failed");
      }
      onResult(payload.result);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "AI request failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={loading}
      onClick={handleClick}
      className="gap-2"
    >
      {" "}
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}{" "}
      {label}{" "}
    </Button>
  );
}