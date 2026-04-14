// GET /api/spotlight — all sunner nodes for spotlight network visualization
import { NextResponse } from "next/server";
import { fetchSpotlightData } from "@/services/kudos";

export async function GET() {
  const data = await fetchSpotlightData();
  return NextResponse.json({ data });
}
