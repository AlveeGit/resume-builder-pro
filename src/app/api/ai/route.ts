// route.ts
import { NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
type ImproveBulletPayload = {
  bullet: string;
  jobTitle: string;
  region: string;
};
type GenerateSummaryPayload = {
  name: string;
  experience: Array<{
    jobTitle?: string;
    company?: string;
    bullets?: string[];
  }>;
  region: string;
  targetRole: string;
};
type AtsCheckPayload = { resumeText: string; jobDescription: string };
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, data } = body;
    if (!action) {
      return NextResponse.json({ error: "Missing action" }, { status: 400 });
    }
    let prompt = "";
    switch (action) {
      case "improve-bullet": {
        const { bullet, jobTitle } = data as ImproveBulletPayload;
        prompt =
          ` Rewrite this resume bullet point to be stronger, more achievement-focused, and ATS-friendly for a ${jobTitle} role. Use strong action verbs. Keep it concise (1-2 lines). Original: ${bullet} Return only the improved bullet. No explanation. `.trim();
        break;
      }
      case "generate-summary": {
        const { name, experience, region, targetRole } =
          data as GenerateSummaryPayload;
        const summarizedExperience = experience
          .map((exp) => {
            const bullets = exp.bullets?.slice(0, 3).join("; ") || "";
            return `${exp.jobTitle ?? ""} at ${exp.company ?? ""}: ${bullets}`;
          })
          .join("\n");
        const sentenceGuide = region === "bd" ? "4-5 sentence" : "2-3 sentence";
        prompt =
          ` Write a professional ${sentenceGuide} profile summary for a resume. The person is ${name}. They are targeting a ${targetRole} role. Their experience includes: ${summarizedExperience} Match the tone and expectations of the ${region} job market. Return only the summary text. `.trim();
        break;
      }
      case "ats-check": {
        const { resumeText, jobDescription } = data as AtsCheckPayload;
        prompt =
          ` Compare this resume against this job description. Provide: 1. Matching keywords found 2. Important missing keywords 3. ATS match score out of 100 4. Top 3 improvement suggestions Resume: ${resumeText} Job Description: ${jobDescription} Return ONLY valid JSON in this format: { "score": 0, "matchingKeywords": [], "missingKeywords": [], "suggestions": [] } `.trim();
        break;
      }
      default:
        return NextResponse.json(
          { error: `Unsupported action: ${action}` },
          { status: 400 },
        );
    }
    const result = await callGemini(prompt);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}