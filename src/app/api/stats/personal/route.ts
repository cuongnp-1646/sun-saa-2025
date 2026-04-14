// GET /api/stats/personal — personal kudos stats for authenticated user
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { fetchPersonalStats } from "@/services/kudos";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await fetchPersonalStats(user.id);
  return NextResponse.json(stats);
}
