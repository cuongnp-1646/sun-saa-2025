// ─── Sun* Kudos Live Board — Service Layer ─────────────────────────────────
// Server-side data fetching using Supabase server client.
// All functions run in Server Components or Route Handlers.

import { createClient } from "@/libs/supabase/server";
import type {
  Kudos,
  GiftRecipient,
  Hashtag,
  Department,
  SpotlightNode,
  PersonalStats,
  KudosFilter,
  Sunner,
} from "@/types/kudos";

// ─── Internal helpers ────────────────────────────────────────────────────────

function toSunner(profile: {
  id: string;
  name: string;
  avatar_url: string | null;
  department?: { name: string } | null;
  job_title?: string | null;
}): Sunner {
  return {
    id: profile.id,
    name: profile.name,
    avatarUrl: profile.avatar_url,
    department:
      typeof profile.department === "object" && profile.department !== null
        ? profile.department.name
        : null,
    jobTitle: profile.job_title ?? null,
  };
}

function toKudos(
  row: {
    id: string;
    message: string;
    title?: string | null;
    is_anonymous?: boolean;
    image_urls: string[] | null;
    created_at: string;
    sender: { id: string; name: string; avatar_url: string | null; job_title: string | null; department?: { name: string } | null } | null;
    receiver: { id: string; name: string; avatar_url: string | null; job_title: string | null; department?: { name: string } | null } | null;
    kudos_hearts?: { user_id: string }[];
    kudos_hashtags?: { hashtag: { id: string; name: string; kudos_count: number } | null }[];
  },
  currentUserId: string | null
): Kudos {
  const hearts = row.kudos_hearts ?? [];

  const ANONYMOUS_SUNNER: Sunner = {
    id: 'anonymous',
    name: 'Ẩn danh',
    avatarUrl: null,
    department: null,
    jobTitle: null,
  };

  return {
    id: row.id,
    sender: row.is_anonymous ? ANONYMOUS_SUNNER : toSunner(row.sender!),
    receiver: toSunner(row.receiver!),
    message: row.message,
    category: row.title ?? undefined,
    hashtags: (row.kudos_hashtags ?? [])
      .filter((kh) => kh.hashtag)
      .map((kh) => ({
        id: kh.hashtag!.id,
        name: kh.hashtag!.name,
        kudosCount: kh.hashtag!.kudos_count,
      })),
    heartCount: hearts.length,
    hasHearted: currentUserId
      ? hearts.some((h) => h.user_id === currentUserId)
      : false,
    imageUrls: row.image_urls ?? [],
    createdAt: row.created_at,
  };
}

// ─── Public service functions ────────────────────────────────────────────────

const KUDOS_SELECT = `
  id,
  message,
  title,
  is_anonymous,
  image_urls,
  created_at,
  sender:profiles!kudos_sender_id_fkey(id, name, avatar_url, job_title, department:departments(name)),
  receiver:profiles!kudos_receiver_id_fkey(id, name, avatar_url, job_title, department:departments(name)),
  kudos_hearts(user_id),
  kudos_hashtags(hashtag:hashtags(id, name, kudos_count))
` as const;

export async function fetchHighlightKudos(
  filter?: KudosFilter
): Promise<Kudos[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("kudos")
    .select(KUDOS_SELECT)
    .order("heart_count", { ascending: false })
    .limit(5);

  if (filter?.hashtagId) {
    query = query.eq("kudos_hashtags.hashtag_id", filter.hashtagId);
  }
  if (filter?.departmentId) {
    query = query.eq("receiver.department_id", filter.departmentId);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => toKudos(row, user?.id ?? null));
}

export async function fetchAllKudos(
  filter?: KudosFilter
): Promise<{ data: Kudos[]; total: number; hasMore: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const page = filter?.page ?? 1;
  const limit = filter?.limit ?? 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("kudos")
    .select(KUDOS_SELECT, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filter?.hashtagId) {
    query = query.eq("kudos_hashtags.hashtag_id", filter.hashtagId);
  }
  if (filter?.departmentId) {
    query = query.eq("receiver.department_id", filter.departmentId);
  }

  const { data, error, count } = await query;
  if (error || !data) return { data: [], total: 0, hasMore: false };

  const total = count ?? 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kudos = (data as any[]).map((row) => toKudos(row, user?.id ?? null));
  return { data: kudos, total, hasMore: to < total - 1 };
}

export async function fetchHashtags(): Promise<Hashtag[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hashtags")
    .select("id, name, kudos_count")
    .order("kudos_count", { ascending: false });

  if (error || !data) return [];
  return data.map((h) => ({
    id: h.id,
    name: h.name,
    kudosCount: h.kudos_count,
  }));
}

export async function fetchDepartments(): Promise<Department[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("departments")
    .select("id, name")
    .order("name", { ascending: true });

  if (error || !data) return [];
  return data.map((d) => ({ id: d.id, name: d.name }));
}

export async function fetchTopGiftRecipients(): Promise<GiftRecipient[]> {
  const supabase = await createClient();
  // Show the 10 most recently awarded sunners (all boxes, newest first).
  // Filtering by opened=false was wrong: it excluded people who already opened their gift.
  const { data, error } = await supabase
    .from("secret_boxes")
    .select(
      `id, gift_description, created_at,
       recipient:profiles!secret_boxes_recipient_id_fkey(id, name, avatar_url, job_title, department:departments(name))`
    )
    .order("created_at", { ascending: false })
    .limit(10);

  if (error || !data) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    sunner: toSunner(row.recipient),
    giftDescription: row.gift_description,
    receivedAt: row.created_at,
  }));
}

export async function fetchPersonalStats(
  userId: string
): Promise<PersonalStats> {
  const supabase = await createClient();

  const [sentResult, receivedResult, heartsResult, secretBoxResult] =
    await Promise.all([
      supabase
        .from("kudos")
        .select("id", { count: "exact", head: true })
        .eq("sender_id", userId),
      supabase
        .from("kudos")
        .select("id", { count: "exact", head: true })
        .eq("receiver_id", userId),
      // Sum the denormalized heart_count from all kudos received by this user.
      // Avoids a fragile nested-join filter on kudos_hearts that was unreliable.
      supabase
        .from("kudos")
        .select("heart_count")
        .eq("receiver_id", userId),
      supabase
        .from("secret_boxes")
        .select("id", { count: "exact", head: true })
        .eq("recipient_id", userId)
        .eq("opened", false),
    ]);

  const heartsReceived =
    heartsResult.data?.reduce(
      (sum: number, row: { heart_count: number }) => sum + (row.heart_count ?? 0),
      0
    ) ?? 0;

  return {
    sent: sentResult.count ?? 0,
    received: receivedResult.count ?? 0,
    heartsReceived,
    secretBoxCount: secretBoxResult.count ?? 0,
  };
}

export async function fetchSpotlightData(): Promise<SpotlightNode[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `id, name, avatar_url,
       kudos_received:kudos!kudos_receiver_id_fkey(id)`
    )
    .order("name", { ascending: true });

  if (error || !data) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((profile) => ({
    id: profile.id,
    name: profile.name,
    avatarUrl: profile.avatar_url,
    kudosCount: Array.isArray(profile.kudos_received)
      ? profile.kudos_received.length
      : 0,
  }));
}
