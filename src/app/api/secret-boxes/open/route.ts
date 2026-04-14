// POST /api/secret-boxes/open — open one unopened secret box for authenticated user
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find the oldest unopened secret box for this user
  const { data: box, error } = await supabase
    .from("secret_boxes")
    .select("id, gift_description")
    .eq("recipient_id", user.id)
    .eq("opened", false)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !box) {
    return NextResponse.json({ error: "No unopened boxes" }, { status: 404 });
  }

  // Mark as opened
  await supabase
    .from("secret_boxes")
    .update({ opened: true })
    .eq("id", box.id);

  return NextResponse.json({ giftDescription: box.gift_description });
}
