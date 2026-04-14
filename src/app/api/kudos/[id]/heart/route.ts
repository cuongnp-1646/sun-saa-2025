// POST /api/kudos/[id]/heart — toggle heart for authenticated user
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: kudosId } = await params;

  // Check if heart already exists
  const { data: existing } = await supabase
    .from("kudos_hearts")
    .select("id")
    .eq("kudos_id", kudosId)
    .eq("user_id", user.id)
    .maybeSingle();

  let hearted: boolean;

  if (existing) {
    // Un-heart
    await supabase
      .from("kudos_hearts")
      .delete()
      .eq("kudos_id", kudosId)
      .eq("user_id", user.id);
    hearted = false;
  } else {
    // Heart
    await supabase
      .from("kudos_hearts")
      .insert({ kudos_id: kudosId, user_id: user.id });
    hearted = true;
  }

  // Get updated count
  const { count } = await supabase
    .from("kudos_hearts")
    .select("id", { count: "exact", head: true })
    .eq("kudos_id", kudosId);

  return NextResponse.json({ hearted, heartCount: count ?? 0 });
}
