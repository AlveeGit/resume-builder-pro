//  layout.tsx
import type { ReactNode } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

export default function BuilderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Top navigation */}
      <TopBar />

      {/* Main content area */}
      <main className="flex-1 overflow-hidden">{children}</main>

      {/* Mobile editor/preview switcher */}
      <div className="md:hidden">
        <MobileTabBar />
      </div>
    </div>
  );
}