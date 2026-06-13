// route.ts

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ resumes: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch resumes",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { id, title, region, data, templateId } = body;

    const payload = {
      user_id: user.id,
      title,
      region,
      data,
      template_id: templateId,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (id) {
      result = await supabase
        .from("resumes")
        .update(payload)
        .eq("id", id)
        .select()
        .single();
    } else {
      result = await supabase.from("resumes").insert(payload).select().single();
    }

    if (result.error) throw result.error;

    return NextResponse.json({
      id: result.data.id,
      updatedAt: result.data.updated_at,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to save resume",
      },
      { status: 500 },
    );
  }
}