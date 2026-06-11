// TODO: implement resumeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ResumeSchema,
  type ResumeData,
  type ReferenceItem,
} from "@/schemas/resumeSchema";
import { REGION_CONFIG } from "@/config/regions";

type ResumeState = {
  resume: ResumeData;
  isDirty: boolean;
  isSaving: boolean;
};

type ResumeActions = {
  setRegion: (region: ResumeData["region"]) => void;

  updatePersonal: (fields: Partial<ResumeData["personal"]>) => void;

  updateSummary: (text: string) => void;

  addExperience: () => void;
  updateExperience: (
    id: string,
    fields: Partial<ResumeData["experience"][number]>,
  ) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (
    id: string,
    fields: Partial<ResumeData["education"][number]>,
  ) => void;
  removeEducation: (id: string) => void;

  addSkill: () => void;
  updateSkill: (
    id: string,
    fields: Partial<ResumeData["skills"][number]>,
  ) => void;
  removeSkill: (id: string) => void;

  updateSectionOrder: (order: string[]) => void;

  updateBDFields: (fields: Partial<ResumeData["bd"]>) => void;

  updateDeclaration: (text: string) => void;

  addReference: () => void;
  updateReference: (id: string, fields: Partial<ReferenceItem>) => void;
  removeReference: (id: string) => void;

  setPhoto: (url: string) => void;

  resetResume: () => void;
};

type ResumeStore = ResumeState & ResumeActions;

/**
 * =========================
 * DEFAULT RESUME FACTORY
 * =========================
 */

const createEmptyResume = (): ResumeData => ({
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
  },
  photo: undefined,
  summary: "",
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  customSections: [],
  bd: {},
  region: "bd",
  templateId: "default",
  sectionOrder: [
    "personal",
    "summary",
    "experience",
    "education",
    "skills",
    "languages",
    "projects",
  ],
  lastUpdated: new Date().toISOString(),
});

/**
 * =========================
 * ZUSTAND STORE
 * =========================
 */

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: createEmptyResume(),
      isDirty: false,
      isSaving: false,

      setRegion: (region) => {
        const config = REGION_CONFIG[region];

        set((state) => ({
          resume: {
            ...state.resume,
            region,
            sectionOrder: config.visibleFields,
            lastUpdated: new Date().toISOString(),
          },
          isDirty: true,
        }));
      },

      updatePersonal: (fields) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personal: { ...state.resume.personal, ...fields },
            lastUpdated: new Date().toISOString(),
          },
          isDirty: true,
        })),

      updateSummary: (text) =>
        set((state) => ({
          resume: {
            ...state.resume,
            summary: text,
            lastUpdated: new Date().toISOString(),
          },
          isDirty: true,
        })),

      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              {
                id: crypto.randomUUID(),
                jobTitle: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                bullets: [],
              },
            ],
          },
          isDirty: true,
        })),

      updateExperience: (id, fields) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((exp) =>
              exp.id === id ? { ...exp, ...fields } : exp,
            ),
          },
          isDirty: true,
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              {
                id: crypto.randomUUID(),
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                grade: "",
              },
            ],
          },
          isDirty: true,
        })),

      updateEducation: (id, fields) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((edu) =>
              edu.id === id ? { ...edu, ...fields } : edu,
            ),
          },
          isDirty: true,
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      addSkill: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [
              ...state.resume.skills,
              {
                id: crypto.randomUUID(),
                name: "",
                level: undefined,
              },
            ],
          },
          isDirty: true,
        })),

      updateSkill: (id, fields) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((skill) =>
              skill.id === id ? { ...skill, ...fields } : skill,
            ),
          },
          isDirty: true,
        })),

      removeSkill: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((s) => s.id !== id),
          },
          isDirty: true,
        })),

      updateSectionOrder: (order) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sectionOrder: order,
          },
          isDirty: true,
        })),

      updateBDFields: (fields) =>
        set((state) => ({
          resume: {
            ...state.resume,
            bd: {
              ...state.resume.bd,
              ...fields,
            },
          },
          isDirty: true,
        })),

      updateDeclaration: (text) =>
        set((state) => ({
          resume: {
            ...state.resume,
            bd: {
              ...state.resume.bd,
              declaration: text,
            },
          },
          isDirty: true,
        })),

      addReference: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            bd: {
              ...state.resume.bd,
              references: [
                ...(state.resume.bd?.references || []),
                {
                  id: crypto.randomUUID(),
                  name: "",
                  title: "",
                  organization: "",
                  email: "",
                  phone: "",
                },
              ],
            },
          },
          isDirty: true,
        })),

      updateReference: (id, fields) =>
        set((state) => ({
          resume: {
            ...state.resume,
            bd: {
              ...state.resume.bd,
              references:
                state.resume.bd?.references?.map((ref) =>
                  ref.id === id ? { ...ref, ...fields } : ref,
                ) || [],
            },
          },
          isDirty: true,
        })),

      removeReference: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            bd: {
              ...state.resume.bd,
              references:
                state.resume.bd?.references?.filter((r) => r.id !== id) || [],
            },
          },
          isDirty: true,
        })),

      setPhoto: (url) =>
        set((state) => ({
          resume: {
            ...state.resume,
            photo: url,
          },
          isDirty: true,
        })),

      resetResume: () =>
        set({
          resume: createEmptyResume(),
          isDirty: false,
          isSaving: false,
        }),
    }),
    {
      name: "resume-store",
    },
  ),
);
