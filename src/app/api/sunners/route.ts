// GET /api/sunners?q=&limit= — search sunners by name (for send-kudos receiver picker)
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q")?.trim() ?? "";
  const limit = Math.min(20, Math.max(1, Number(searchParams.get("limit") ?? "10")));

  const supabase = await createClient();

  let query = supabase
    .from("profiles")
    .select("id, name, avatar_url, job_title, department:departments(name)")
    .limit(limit);

  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ data: [] });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sunners = (data as any[]).map((p) => ({
    id: p.id,
    name: p.name,
    avatarUrl: p.avatar_url,
    department: p.department?.name ?? null,
    jobTitle: p.job_title ?? null,
  }));

  return NextResponse.json({ data: sunners });
}
