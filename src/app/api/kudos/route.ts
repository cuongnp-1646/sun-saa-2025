// GET /api/kudos — paginated kudos feed with optional hashtag/department filter
// POST /api/kudos — create a new kudos (requires auth)
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/libs/supabase/server";
import { fetchAllKudos } from "@/services/kudos";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const hashtagId = searchParams.get("hashtagId") ?? undefined;
  const departmentId = searchParams.get("departmentId") ?? undefined;

  const result = await fetchAllKudos({ page, limit, hashtagId, departmentId });
  return NextResponse.json(result);
}

const createKudosSchema = z.object({
  receiverId: z.string().uuid(),
  title: z.string().max(200).optional(),
  message: z.string().min(1).max(2000),
  hashtags: z.array(z.string()).optional().default([]),
  imageUrls: z.array(z.string().url()).optional().default([]),
  isAnonymous: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createKudosSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { receiverId, title, message, hashtags, imageUrls, isAnonymous } = parsed.data;

  const { data: kudosRow, error: kudosError } = await supabase
    .from("kudos")
    .insert({
      sender_id: user.id,
      receiver_id: receiverId,
      title: title ?? null,
      message,
      image_urls: imageUrls.length > 0 ? imageUrls : [],
      is_anonymous: isAnonymous,
    })
    .select("id")
    .single();

  if (kudosError || !kudosRow) {
    return NextResponse.json({ error: "Failed to create kudos" }, { status: 500 });
  }

  if (hashtags.length > 0) {
    const upserted = await Promise.all(
      hashtags.map((name) =>
        supabase
          .from("hashtags")
          .upsert({ name: name.replace(/^#/, "") }, { onConflict: "name" })
          .select("id")
          .single()
      )
    );

    const hashtagRows = upserted
      .filter((r) => !r.error && r.data)
      .map((r) => ({ kudos_id: kudosRow.id, hashtag_id: r.data!.id }));

    if (hashtagRows.length > 0) {
      await supabase.from("kudos_hashtags").insert(hashtagRows);
    }
  }

  const { data: full } = await supabase
    .from("kudos")
    .select(
      `id, message, title, is_anonymous, image_urls, created_at,
       sender:profiles!kudos_sender_id_fkey(id, name, avatar_url, job_title),
       receiver:profiles!kudos_receiver_id_fkey(id, name, avatar_url, job_title),
       kudos_hearts(user_id),
       kudos_hashtags(hashtag:hashtags(id, name, kudos_count))`
    )
    .eq("id", kudosRow.id)
    .single();

  return NextResponse.json(full ?? { id: kudosRow.id }, { status: 201 });
}
