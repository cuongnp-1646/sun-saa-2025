// GET /api/departments — all departments ordered by name asc
import { NextResponse } from "next/server";
import { fetchDepartments } from "@/services/kudos";

export async function GET() {
  const data = await fetchDepartments();
  return NextResponse.json({ data });
}
