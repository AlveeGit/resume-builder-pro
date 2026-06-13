// MobileTabBar.tsx

"use client";

import { useState } from "react";
import { Pencil, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "edit" | "preview";

export function MobileTabBar() {
  const [activeTab, setActiveTab] = useState<Tab>("edit");

  return (
    <>
      {/* This bar is only visual controller */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-background z-50">
        <div className="flex items-center justify-around h-14">
          {/* EDIT TAB */}
          <Button
            variant="ghost"
            className={cn(
              "flex-1 flex flex-col items-center gap-1 text-xs",
              activeTab === "edit" && "text-blue-600",
            )}
            onClick={() => setActiveTab("edit")}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>

          {/* PREVIEW TAB */}
          <Button
            variant="ghost"
            className={cn(
              "flex-1 flex flex-col items-center gap-1 text-xs",
              activeTab === "preview" && "text-blue-600",
            )}
            onClick={() => setActiveTab("preview")}
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>

      {/* OPTIONAL: future global state hook */}
      {/* You can later connect this to Zustand to control BuilderPage layout */}
    </>
  );
}