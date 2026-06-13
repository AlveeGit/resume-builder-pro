// RegionPicker.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/stores/resumeStore";
import { AnimatePresence, motion, Variants } from "motion/react";

const REGIONS = [
  {
    id: "bd",
    flag: "🇧🇩",
    name: "Bangladesh",
    desc: "CV / Biodata · photo · declaration",
    info: "Bangladesh format: photo required, include father/mother name, religion, NID. Declaration at the end.",
    color: "from-green-600 to-green-700",
    badge: "Local Format",
  },
  {
    id: "uk",
    flag: "🇬🇧",
    name: "United Kingdom",
    desc: "CV · no photo · 2 pages",
    info: "UK format: no photo, no personal details. Clean 2-page CV, strong profile summary at top.",
    color: "from-blue-600 to-blue-700",
    badge: "Professional",
  },
  {
    id: "eu",
    flag: "🇪🇺",
    name: "Europe (EU)",
    desc: "CV · Europass style · photo optional",
    info: "EU format: photo optional, Europass header supported. Personal info varies by country.",
    color: "from-purple-600 to-purple-700",
    badge: "Europass",
  },
  {
    id: "international",
    flag: "🌐",
    name: "International",
    desc: "Resume · ATS-first · 1 page",
    info: "International format: ATS-first 1-page resume. No photo, keyword-rich bullet points.",
    color: "from-orange-600 to-orange-700",
    badge: "ATS-Friendly",
  },
] as const;

type RegionId = (typeof REGIONS)[number]["id"];

export default function RegionPicker() {
  const router = useRouter();
  const setRegion = useResumeStore((s) => s.setRegion);

  const [selected, setSelected] = useState<RegionId | null>(null);
  const [hovered, setHovered] = useState<RegionId | null>(null);

  const activeRegion = REGIONS.find((r) => r.id === selected);

  const handleStart = () => {
    if (!selected) return;

    localStorage.setItem("resume-region", selected);
    setRegion(selected);

    router.push("/builder");
  };

  const label = selected === "international" ? "my Resume" : "my CV";

  // Container animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-5xl space-y-8"
      >
        {/* HEADER with animated gradient */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30"></div>
              <h1 className="relative text-5xl md:text-6xl font-bold bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                ResumeBuilder
              </h1>
            </div>
          </motion.div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your target market and build the perfect CV that stands out
          </p>
        </motion.div>

        {/* GRID with modern cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {REGIONS.map((region) => {
            const isSelected = selected === region.id;
            const isHovered = hovered === region.id;

            return (
              <motion.div
                key={region.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHovered(region.id)}
                onHoverEnd={() => setHovered(null)}
              >
                <Card
                  onClick={() => setSelected(region.id)}
                  className={`relative p-6 cursor-pointer transition-all duration-300 overflow-hidden group ${
                    isSelected
                      ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 shadow-xl"
                      : "hover:shadow-lg"
                  }`}
                >
                  {/* Gradient Background on Hover/Select */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${region.color} opacity-0 transition-opacity duration-300 ${
                      isSelected || isHovered
                        ? "opacity-5"
                        : "group-hover:opacity-0"
                    }`}
                  />

                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {region.badge}
                    </span>
                  </div>

                  {/* Flag & Name */}
                  <div className="space-y-3">
                    <div className="text-5xl transition-transform duration-300 group-hover:scale-110 inline-block">
                      {region.flag}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{region.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {region.desc}
                      </p>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="w-1 h-1 bg-blue-500 rounded-full" />
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* INFO BOX with animation */}
        <AnimatePresence mode="wait">
          {activeRegion && (
            <motion.div
              key={activeRegion.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border border-blue-100 dark:border-blue-900">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{activeRegion.flag}</div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeRegion.info}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">
                      Recommended for {activeRegion.name}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button with animation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center pt-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleStart}
              disabled={!selected}
              className="relative px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600"
            >
              <span className="relative z-10">✨ Start building {label}</span>
              {selected && (
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  →
                </motion.span>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* FOOTER with subtle animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <span>🔄</span>
            You can switch your target market at any time inside the editor
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">✨ Free to use</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
