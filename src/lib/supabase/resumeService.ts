import { createClient } from "@/lib/supabase/server";

export async function saveResume(
  userId: string,
  resumeData: any,
  resumeId?: string | null,
  title = "My Resume",
  region = "bd",
  templateId = "default",
) {
  const supabase = createClient();

  const payload = {
    user_id: userId,
    title,
    region,
    data: resumeData,
    template_id: templateId,
    updated_at: new Date().toISOString(),
  };

  if (resumeId) {
    const { data, error } = await supabase
      .from("resumes")
      .update(payload)
      .eq("id", resumeId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  const { data, error } = await supabase
    .from("resumes")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function loadResume(userId: string, resumeId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function createVersion(
  resumeId: string,
  data: any,
  label = "Auto-save",
) {
  const supabase = createClient();

  const { data: version, error } = await supabase
    .from("resume_versions")
    .insert({
      resume_id: resumeId,
      data,
      label,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return version;
}

export async function getVersions(resumeId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("resume_versions")
    .select("*")
    .eq("resume_id", resumeId)
    .order("created_at", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return data;
}
