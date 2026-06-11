// useRegion.ts
import { useMemo } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import { REGION_CONFIG, type RegionId } from "@/config/regions";

/**
 * Region-aware helper hook
 * Controls visibility + validation rules for builder UI
 */

export const useRegion = () => {
  const activeRegionId = useResumeStore(
    (state) => state.resume.region,
  ) as RegionId;

  const activeRegion = useMemo(() => {
    return REGION_CONFIG[activeRegionId];
  }, [activeRegionId]);

  const isFieldVisible = (fieldName: string): boolean => {
    return activeRegion.visibleFields.includes(fieldName);
  };

  const isFieldRequired = (fieldName: string): boolean => {
    return activeRegion.requiredFields.includes(fieldName);
  };

  return {
    activeRegion,
    isFieldVisible,
    isFieldRequired,
  };
};