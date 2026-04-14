// GET /api/sunners/top-gifts — top 10 most recently rewarded sunners
import { NextResponse } from "next/server";
import { fetchTopGiftRecipients } from "@/services/kudos";

export async function GET() {
  const data = await fetchTopGiftRecipients();
  return NextResponse.json({ data });
}
