// useResume.ts
import { useMemo } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import type { ResumeData } from "@/schemas/resumeSchema";

/**
 * Thin wrapper around Zustand store
 * Keeps components decoupled from store implementation
 */

export const useResume = () => {
  const resume = useResumeStore((state) => state.resume);
  const isDirty = useResumeStore((state) => state.isDirty);
  const isSaving = useResumeStore((state) => state.isSaving);

  const setRegion = useResumeStore((state) => state.setRegion);

  const updatePersonal = useResumeStore((state) => state.updatePersonal);
  const updateSummary = useResumeStore((state) => state.updateSummary);

  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);

  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);

  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);

  const updateSectionOrder = useResumeStore(
    (state) => state.updateSectionOrder,
  );

  const updateBDFields = useResumeStore((state) => state.updateBDFields);
  const updateDeclaration = useResumeStore((state) => state.updateDeclaration);

  const addReference = useResumeStore((state) => state.addReference);
  const updateReference = useResumeStore((state) => state.updateReference);
  const removeReference = useResumeStore((state) => state.removeReference);

  const setPhoto = useResumeStore((state) => state.setPhoto);
  const resetResume = useResumeStore((state) => state.resetResume);

  /**
   * Memoized API surface (prevents re-renders in consumers)
   */
  const actions = useMemo(
    () => ({
      setRegion,
      updatePersonal,
      updateSummary,

      addExperience,
      updateExperience,
      removeExperience,

      addEducation,
      updateEducation,
      removeEducation,

      addSkill,
      updateSkill,
      removeSkill,

      updateSectionOrder,

      updateBDFields,
      updateDeclaration,

      addReference,
      updateReference,
      removeReference,

      setPhoto,
      resetResume,
    }),
    [
      setRegion,
      updatePersonal,
      updateSummary,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addSkill,
      updateSkill,
      removeSkill,
      updateSectionOrder,
      updateBDFields,
      updateDeclaration,
      addReference,
      updateReference,
      removeReference,
      setPhoto,
      resetResume,
    ],
  );

  return {
    resume,
    isDirty,
    isSaving,
    ...actions,
  };
};

/**
 * Optional helper hook if you only want raw data
 */
export const useResumeData = (): ResumeData =>
  useResumeStore((state) => state.resume);