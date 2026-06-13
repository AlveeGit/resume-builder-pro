# ResumeBuilder Pro

A modern AI-powered resume builder with real-time editing, region-based CV formats, AI writing assistant, and PDF export.

---

## 🚀 Tech Stack

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Zustand (state management)
- Supabase (auth + database)
- Gemini API (AI assistant)
- React Hook Form + Zod
- html2pdf.js (PDF export)
- shadcn/ui

---

## 🧠 Features

- Region-based CV formats (BD / UK / EU / International)
- AI-powered writing assistant (Gemini)
- Real-time auto-save
- Version history + restore
- PDF export (A4 optimized)
- ATS resume checker
- Drag-and-drop section ordering

---

## 🛠️ Local Setup

```bash
pnpm install
pnpm dev


🔐 Environment Variables
Key	Description
NEXT_PUBLIC_SUPABASE_URL	Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY	Supabase public anon key
SUPABASE_SERVICE_ROLE_KEY	Server-side Supabase access
GEMINI_API_KEY	Google Gemini API key