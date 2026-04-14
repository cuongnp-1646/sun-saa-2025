// GET /api/hashtags — all hashtags ordered by kudos_count desc
import { NextResponse } from "next/server";
import { fetchHashtags } from "@/services/kudos";

export async function GET() {
  const data = await fetchHashtags();
  return NextResponse.json({ data });
}
