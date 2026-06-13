"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { useResume } from "@/hooks/useResume";
import { getVersions } from "@/lib/supabase/resumeService";

type Version = {
  id: string;
  data: any;
  label: string;
  created_at: string;
};

export function HistoryPanel() {
  const { resume, setResume } = useResume();

  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);

  const resumeId = (resume as any)?.id || null;

  const [selected, setSelected] = useState<Version | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!resumeId) return;

      try {
        setLoading(true);

        const data = await getVersions(resumeId);

        setVersions(data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [resumeId]);

//   const restoreVersion = (version: Version) => {
//     const confirmRestore = confirm(
//       "Restore this version? Your current changes will be replaced.",
//     );

//     if (!confirmRestore) return;

//     setResume(version.data);

//     toast.success("Resume restored successfully");
//   };

  const handleRestore = () => {
    if (!selected) return;

    setResume(selected.data);
    toast.success("Resume restored");

    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <History className="h-4 w-4" />
            History
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-72">
          <div className="px-3 py-2 text-xs text-muted-foreground">
            Last saved versions
          </div>

          {loading && <div className="px-3 py-2 text-sm">Loading...</div>}

          {!loading && versions.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No versions found
            </div>
          )}

          {versions.map((v) => (
            <DropdownMenuItem
              key={v.id}
              // onClick={() => restoreVersion(v)}
              onClick={() => {
                setSelected(v);
                setOpen(true);
              }}
              className="flex flex-col items-start cursor-pointer"
            >
              <span className="text-sm font-medium">{v.label}</span>

              <span className="text-xs text-muted-foreground">
                {new Date(v.created_at).toLocaleString()}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <RestoreDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleRestore}
      />
    </>
  );
}
