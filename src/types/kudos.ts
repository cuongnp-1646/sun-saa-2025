// ─── Sun* Kudos Live Board — Type Definitions ─────────────────────────────

export interface Sunner {
  id: string;
  name: string;
  avatarUrl: string | null;
  department: string | null;
  jobTitle: string | null;
}

export interface Hashtag {
  id: string;
  name: string;
  kudosCount: number;
}

export interface Department {
  id: string;
  name: string;
}

export interface Kudos {
  id: string;
  sender: Sunner;
  receiver: Sunner;
  message: string;
  /** Optional category label shown on card e.g. "IDOL GIỚI TRẺ" */
  category?: string;
  hashtags: Hashtag[];
  heartCount: number;
  hasHearted: boolean;
  imageUrls: string[];
  createdAt: string; // ISO 8601
}

export interface PersonalStatsExtended extends PersonalStats {
  secretBoxOpenedCount: number;
}

export interface PersonalStats {
  sent: number;
  received: number;
  heartsReceived: number;
  secretBoxCount: number;
}

export interface GiftRecipient {
  sunner: Sunner;
  giftDescription: string;
  receivedAt: string;
}

export interface SpotlightNode {
  id: string;
  name: string;
  avatarUrl: string | null;
  kudosCount: number;
  x?: number;
  y?: number;
}

// ─── API Response Shapes ────────────────────────────────────────────────────

export interface KudosListResponse {
  data: Kudos[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface HighlightKudosResponse {
  data: Kudos[];
}

export interface HashtagsResponse {
  data: Hashtag[];
}

export interface DepartmentsResponse {
  data: Department[];
}

export interface TopGiftsResponse {
  data: GiftRecipient[];
}

export interface SpotlightResponse {
  data: SpotlightNode[];
}

// ─── DB Row Types (raw Supabase) ────────────────────────────────────────────

export interface KudosRow {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  image_urls: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface KudosHeartRow {
  id: string;
  kudos_id: string;
  user_id: string;
  created_at: string;
}

export interface HashtagRow {
  id: string;
  name: string;
  kudos_count: number;
  created_at: string;
}

export interface DepartmentRow {
  id: string;
  name: string;
  created_at: string;
}

export interface SecretBoxRow {
  id: string;
  recipient_id: string;
  gift_description: string;
  opened: boolean;
  created_at: string;
}

export interface ProfileRow {
  id: string;
  name: string;
  avatar_url: string | null;
  department_id: string | null;
  job_title: string | null;
  created_at: string;
}

// ─── Component Prop Helpers ─────────────────────────────────────────────────

export type KudosFilter = {
  hashtagId?: string;
  departmentId?: string;
  page?: number;
  limit?: number;
};
