//  layout.tsx
"use client";

import type { ReactNode } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

export default function BuilderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* ===================== */}
      {/* TOP BAR */}
      {/* ===================== */}
      <div className="h-[52px] flex-shrink-0 border-b">
        <TopBar />
      </div>

      {/* ===================== */}
      {/* MAIN CONTENT AREA */}
      {/* ===================== */}
      <div className="flex-1 overflow-hidden relative">{children}</div>

      {/* ===================== */}
      {/* MOBILE TAB BAR */}
      {/* ===================== */}
      <MobileTabBar />
    </div>
  );
}