// page.tsx
import { EditorPanel } from "@/components/builder/EditorPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";

export default function BuilderPage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Desktop: Split screen */}
      <div className="hidden md:flex h-full w-full">
        <div className="w-1/2 border-r">
          <EditorPanel />
        </div>

        <div className="w-1/2 bg-muted/20">
          <PreviewPanel />
        </div>
      </div>

      {/* Mobile: Panels handled by MobileTabBar */}
      <div className="md:hidden h-full w-full">
        <EditorPanel />
      </div>
    </div>
  );
}