// RegionSwitcher.tsx

"use client";

import { ChevronDown, Check } from "lucide-react";

import { toast } from "sonner";
import { useResumeStore } from "@/stores/resumeStore";
import { REGION_CONFIG, type RegionId } from "@/config/regions";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const REGION_LIST = [
  {
    ...REGION_CONFIG.bd,
    short: "BD",
  },
  {
    ...REGION_CONFIG.uk,
    short: "UK",
  },
  {
    ...REGION_CONFIG.eu,
    short: "EU",
  },
  {
    ...REGION_CONFIG.international,
    short: "Intl",
  },
];

export function RegionSwitcher() {
  const resume = useResumeStore((s) => s.resume);
  const setRegion = useResumeStore((s) => s.setRegion);

  const current = resume.region;

  const activeRegion = REGION_LIST.find((r) => r.id === current);

  const handleChange = (regionId: RegionId) => {
    if (regionId === current) return;

    const region = REGION_LIST.find((r) => r.id === regionId);
    if (!region) return;

    setRegion(regionId);

    toast.success(`Switched to ${region.name} format. Your data is preserved.`);
  };

  return (
    <DropdownMenu>
      {/* TRIGGER */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="
            flex items-center gap-2
            rounded-full
            border
            px-3
            h-8
          "
        >
          <span className="text-sm">{activeRegion?.flag}</span>

          <span className="text-xs font-medium">{activeRegion?.short}</span>

          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      {/* DROPDOWN */}
      <DropdownMenuContent align="end" className="w-64">
        {REGION_LIST.map((region) => {
          const isActive = region.id === current;

          return (
            <DropdownMenuItem
              key={region.id}
              onClick={() => handleChange(region.id)}
              className="
                flex items-start justify-between
                gap-3 cursor-pointer
              "
            >
              {/* LEFT CONTENT */}
              <div className="flex gap-2">
                <span className="text-base">{region.flag}</span>

                <div className="flex flex-col">
                  <span className="font-medium text-sm">{region.name}</span>

                  <span className="text-xs text-muted-foreground">
                    {region.desc}
                  </span>
                </div>
              </div>

              {/* ACTIVE CHECK */}
              {isActive && <Check className="h-4 w-4 text-blue-500" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
