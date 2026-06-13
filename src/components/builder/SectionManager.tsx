// SectionManager.tsx

"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { GripVertical, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useResume } from "@/hooks/useResume";
import { useRegion } from "@/hooks/useRegion";

/* -------------------------
   SECTION DEFINITIONS
--------------------------*/
const ALL_SECTIONS = [
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "languages",
  "certifications",
  "projects",
  "customSections",
  "references",
  "declaration",
] as const;

const SECTION_LABELS: Record<string, string> = {
  personal: "Personal Info",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  certifications: "Certifications",
  projects: "Projects",
  customSections: "Custom Sections",
  references: "References",
  declaration: "Declaration",
};

/* -------------------------
   SORTABLE ITEM
--------------------------*/
function SortableItem({
  id,
  label,
  hidden,
  onToggle,
}: {
  id: string;
  label: string;
  hidden: boolean;
  onToggle: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between gap-2 border rounded-md px-2 py-1 bg-background"
    >
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <button
          className="cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>

        <span className="text-sm">{label}</span>
      </div>

      {/* RIGHT */}
      <button onClick={onToggle}>
        {hidden ? (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

/* -------------------------
   MAIN COMPONENT
--------------------------*/
export function SectionManager() {
  const { resume, updateSectionOrder } = useResume();
  const { activeRegion } = useRegion();

  const [open, setOpen] = useState(false);

  /* region-based filtering */
  const visibleSections = useMemo(() => {
    const config = activeRegion.visibleFields;

    return ALL_SECTIONS.filter((s) => config.includes(s));
  }, [activeRegion]);

  /* fallback order */
  const order = resume.sectionOrder?.length
    ? resume.sectionOrder
    : visibleSections;

  const sensors = useSensors(useSensor(PointerSensor));

  /* -------------------------
     DRAG END
  --------------------------*/
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(active.id as string);
    const newIndex = order.indexOf(over.id as string);

    const newOrder = arrayMove(order, oldIndex, newIndex);

    updateSectionOrder(newOrder);
  };

  /* -------------------------
     TOGGLE VISIBILITY
  --------------------------*/
  const handleToggle = (id: string) => {
    const hidden = resume.hiddenSections || [];

    const updated = hidden.includes(id)
      ? hidden.filter((s) => s !== id)
      : [...hidden, id];

    // store it (add this action in zustand if not exists)
    useResume.getState().setHiddenSections?.(updated);
  };

  return (
    <div className="space-y-2">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen(!open)}
          className="text-xs text-muted-foreground"
        >
          Section Manager
        </button>

        <span className="text-xs text-muted-foreground">Drag to reorder</span>
      </div>

      {/* PANEL */}
      {open && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {order.map((id) => (
                <SortableItem
                  key={id}
                  id={id}
                  label={SECTION_LABELS[id]}
                  hidden={resume.hiddenSections?.includes(id) || false}
                  onToggle={() => handleToggle(id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* MOBILE HINT */}
      <p className="text-[10px] text-muted-foreground md:hidden">
        Mobile uses ↑ ↓ buttons instead of drag
      </p>
    </div>
  );
}