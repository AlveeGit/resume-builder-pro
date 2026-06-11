// page.tsx
"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">AI Resume Builder ⚡</h1>

        <p className="text-gray-600 max-w-md">
          Build region-perfect CVs for Bangladesh, UK, EU, and International job
          markets.
        </p>

        <Link
          href="/(builder)/builder"
          className="px-6 py-3 rounded-xl bg-black text-white hover:opacity-80 transition"
        >
          Start Building
        </Link>
      </div>
    </main>
  );
}
