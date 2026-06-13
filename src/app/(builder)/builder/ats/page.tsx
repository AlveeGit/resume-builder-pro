import { ATSChecker } from "@/components/ai/ATSChecker";

export default function ATSPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">ATS Resume Checker</h1>

      <ATSChecker />
    </div>
  );
}
