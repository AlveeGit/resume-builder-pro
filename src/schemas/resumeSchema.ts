// resumeSchema.ts
import { z } from "zod";

/**
 * =========================
 * CORE SUB-SCHEMAS
 * =========================
 */

const PersonalSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

const ExperienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean(),
  bullets: z.array(z.string()),
});

const EducationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  grade: z.string().optional(),
});

const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

const LanguageSchema = z.object({
  id: z.string(),
  language: z.string(),
  proficiency: z.string(),
});

const CertificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  url: z.string().optional(),
});

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string().optional(),
  technologies: z.array(z.string()),
});

const CustomSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(z.string()),
});

/**
 * =========================
 * BD-SPECIFIC SECTION
 * =========================
 */

const BDExtraSchema = z.object({
  fathersName: z.string().optional(),
  mothersName: z.string().optional(),
  religion: z.string().optional(),
  nationality: z.string().optional(),
  nid: z.string().optional(),
  maritalStatus: z.string().optional(),
  dob: z.string().optional(),

  references: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        title: z.string(),
        organization: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
      }),
    )
    .optional(),

  declaration: z.string().optional(),
});

/**
 * =========================
 * MAIN RESUME SCHEMA
 * =========================
 */

export const ResumeSchema = z.object({
  personal: PersonalSchema,

  photo: z.string().optional(),

  summary: z.string(),

  experience: z.array(ExperienceSchema),

  education: z.array(EducationSchema),

  skills: z.array(SkillSchema),

  languages: z.array(LanguageSchema),

  certifications: z.array(CertificationSchema),

  projects: z.array(ProjectSchema),

  customSections: z.array(CustomSectionSchema),

  bd: BDExtraSchema.optional(),

  region: z.enum(["bd", "uk", "eu", "international"]),

  templateId: z.string(),

  sectionOrder: z.array(z.string()),

  lastUpdated: z.string(), // ISO string
});

/**
 * =========================
 * TYPE EXPORT
 * =========================
 */

export type ResumeData = z.infer<typeof ResumeSchema>;

export type ReferenceItem = {
  id: string;
  name: string;
  title: string;
  organization: string;
  email?: string;
  phone?: string;
};