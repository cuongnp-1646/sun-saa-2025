// GET /api/kudos/highlights — top 5 most-hearted kudos
import { NextRequest, NextResponse } from "next/server";
import { fetchHighlightKudos } from "@/services/kudos";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const hashtagId = searchParams.get("hashtagId") ?? undefined;
  const departmentId = searchParams.get("departmentId") ?? undefined;

  const data = await fetchHighlightKudos({ hashtagId, departmentId });
  return NextResponse.json({ data });
}
