// ─── Sun* Kudos Live Board — Mock Data ──────────────────────────────────────
// Realistic mock data matching Figma design (MaZUn5xHXZ / fO0Kt19sZZ)
// Used when NEXT_PUBLIC_USE_MOCK_DATA=true or when Supabase is unavailable

import type {
  Kudos,
  Sunner,
  Hashtag,
  Department,
  GiftRecipient,
  SpotlightNode,
  PersonalStats,
} from "@/types/kudos";

// ─── Sunners ─────────────────────────────────────────────────────────────────

const SUNNERS: Sunner[] = [
  { id: "s1", name: "Huỳnh Dương Xuân Nhật", avatarUrl: null, department: "CECO", jobTitle: "CECO/YO" },
  { id: "s2", name: "Dương Xuân Huỳnh", avatarUrl: null, department: "CECO", jobTitle: "CECO/Dev" },
  { id: "s3", name: "Nguyễn Thị Minh Anh", avatarUrl: null, department: "Design", jobTitle: "UI/UX Lead" },
  { id: "s4", name: "Trần Quốc Bảo", avatarUrl: null, department: "Backend", jobTitle: "Backend Dev" },
  { id: "s5", name: "Lê Thị Phương Thảo", avatarUrl: null, department: "Frontend", jobTitle: "Frontend Dev" },
  { id: "s6", name: "Phạm Văn Khôi", avatarUrl: null, department: "PM", jobTitle: "PM" },
  { id: "s7", name: "Vũ Thanh Hà", avatarUrl: null, department: "QA", jobTitle: "QA Engineer" },
  { id: "s8", name: "Bùi Minh Tuấn", avatarUrl: null, department: "DevOps", jobTitle: "DevOps Lead" },
  { id: "s9", name: "Đỗ Thị Lan", avatarUrl: null, department: "Design", jobTitle: "Designer" },
  { id: "s10", name: "Nguyễn Văn Long", avatarUrl: null, department: "Backend", jobTitle: "Tech Lead" },
  { id: "s11", name: "Trần Thị Hoa", avatarUrl: null, department: "Frontend", jobTitle: "Senior Dev" },
  { id: "s12", name: "Lê Quang Dũng", avatarUrl: null, department: "CECO", jobTitle: "CECO/YO" },
];

// ─── Hashtags ─────────────────────────────────────────────────────────────────

export const MOCK_HASHTAGS: Hashtag[] = [
  { id: "h1", name: "Dedicated", kudosCount: 82 },
  { id: "h2", name: "Inspiring", kudosCount: 74 },
  { id: "h3", name: "Teamwork", kudosCount: 61 },
  { id: "h4", name: "Innovation", kudosCount: 45 },
  { id: "h5", name: "Leadership", kudosCount: 38 },
  { id: "h6", name: "Hardworking", kudosCount: 29 },
];

// ─── Departments ─────────────────────────────────────────────────────────────

export const MOCK_DEPARTMENTS: Department[] = [
  { id: "d1", name: "CECO" },
  { id: "d2", name: "Design" },
  { id: "d3", name: "Backend" },
  { id: "d4", name: "Frontend" },
  { id: "d5", name: "PM" },
  { id: "d6", name: "QA" },
  { id: "d7", name: "DevOps" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ts(daysAgo: number, h = 10, m = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

const MOCK_IMAGES = [
  "/assets/kudos/images/bg-kv.png",
];

// ─── Kudos ───────────────────────────────────────────────────────────────────

export const MOCK_KUDOS: Kudos[] = [
  {
    id: "k1",
    sender: SUNNERS[0],
    receiver: SUNNERS[1],
    category: "IDOL GIỚI TRẺ",
    message:
      "Cảm ơn người em bình thường những phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. +3 và cuộc sống...",
    hashtags: [MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[0]],
    heartCount: 1000,
    hasHearted: false,
    imageUrls: [MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0]],
    createdAt: ts(1, 10, 0),
  },
  {
    id: "k2",
    sender: SUNNERS[2],
    receiver: SUNNERS[0],
    category: "IDOL GIỚI TRẺ",
    message:
      "Cảm ơn người em bình thường những phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. +3 và cuộc sống...",
    hashtags: [MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[2], MOCK_HASHTAGS[0], MOCK_HASHTAGS[1]],
    heartCount: 1000,
    hasHearted: true,
    imageUrls: [MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0]],
    createdAt: ts(1, 10, 0),
  },
  {
    id: "k3",
    sender: SUNNERS[3],
    receiver: SUNNERS[4],
    category: "IDOL GIỚI TRẺ",
    message:
      "Cảm ơn người em bình thường những phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. +3 và cuộc sống...",
    hashtags: [MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[3], MOCK_HASHTAGS[0], MOCK_HASHTAGS[1]],
    heartCount: 988,
    hasHearted: false,
    imageUrls: [MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0]],
    createdAt: ts(2, 10, 0),
  },
  {
    id: "k4",
    sender: SUNNERS[5],
    receiver: SUNNERS[6],
    category: "IDOL GIỚI TRẺ",
    message:
      "Cảm ơn người em bình thường những phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. +3 và cuộc sống...",
    hashtags: [MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[4], MOCK_HASHTAGS[0], MOCK_HASHTAGS[1]],
    heartCount: 875,
    hasHearted: false,
    imageUrls: [MOCK_IMAGES[0], MOCK_IMAGES[0]],
    createdAt: ts(3, 10, 0),
  },
  {
    id: "k5",
    sender: SUNNERS[7],
    receiver: SUNNERS[8],
    category: "IDOL GIỚI TRẺ",
    message:
      "Cảm ơn người em bình thường những phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc.",
    hashtags: [MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[5]],
    heartCount: 762,
    hasHearted: false,
    imageUrls: [],
    createdAt: ts(4, 10, 0),
  },
  // Extra post-feed cards
  {
    id: "k6",
    sender: SUNNERS[9],
    receiver: SUNNERS[10],
    category: "IDOL GIỚI TRẺ",
    message:
      "Cảm ơn người em bình thường những phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. +3 và cuộc sống...",
    hashtags: [MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[0]],
    heartCount: 1000,
    hasHearted: false,
    imageUrls: [MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0], MOCK_IMAGES[0]],
    createdAt: ts(1, 10, 0),
  },
  {
    id: "k7",
    sender: SUNNERS[11],
    receiver: SUNNERS[0],
    category: "IDOL GIỚI TRẺ",
    message:
      "Cảm ơn người em bình thường những phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team.",
    hashtags: [MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[2]],
    heartCount: 543,
    hasHearted: false,
    imageUrls: [MOCK_IMAGES[0], MOCK_IMAGES[0]],
    createdAt: ts(2, 14, 30),
  },
  {
    id: "k8",
    sender: SUNNERS[1],
    receiver: SUNNERS[3],
    category: "IDOL GIỚI TRẺ",
    message:
      "Cảm ơn người em bình thường những phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. +3 và cuộc sống...",
    hashtags: [MOCK_HASHTAGS[0], MOCK_HASHTAGS[1], MOCK_HASHTAGS[3], MOCK_HASHTAGS[4]],
    heartCount: 321,
    hasHearted: false,
    imageUrls: [],
    createdAt: ts(3, 9, 15),
  },
];

// Top 5 highlights — most hearted
export const MOCK_HIGHLIGHTS: Kudos[] = MOCK_KUDOS.slice(0, 5);

// ─── Spotlight nodes ──────────────────────────────────────────────────────────

export const MOCK_SPOTLIGHT_NODES: SpotlightNode[] = [
  ...SUNNERS.map((s, i) => ({ id: s.id, name: s.name, avatarUrl: s.avatarUrl, kudosCount: 30 + i * 8 })),
  { id: "sp13", name: "Nguyễn Ba Chiếc", avatarUrl: null, kudosCount: 42 },
  { id: "sp14", name: "Võ Hoàng Nam", avatarUrl: null, kudosCount: 38 },
  { id: "sp15", name: "Phan Thị Ánh", avatarUrl: null, kudosCount: 35 },
  { id: "sp16", name: "Đinh Văn Phúc", avatarUrl: null, kudosCount: 28 },
  { id: "sp17", name: "Hoàng Minh Khoa", avatarUrl: null, kudosCount: 52 },
  { id: "sp18", name: "Trương Thị Mai", avatarUrl: null, kudosCount: 19 },
  { id: "sp19", name: "Đặng Hữu Tài", avatarUrl: null, kudosCount: 61 },
  { id: "sp20", name: "Lý Thị Cẩm Tú", avatarUrl: null, kudosCount: 14 },
  { id: "sp21", name: "Ngô Quốc Huy", avatarUrl: null, kudosCount: 47 },
  { id: "sp22", name: "Cao Minh Nghĩa", avatarUrl: null, kudosCount: 23 },
  { id: "sp23", name: "Từ Thị Hằng", avatarUrl: null, kudosCount: 55 },
  { id: "sp24", name: "Mai Văn Đức", avatarUrl: null, kudosCount: 31 },
];

export const MOCK_TOTAL_KUDOS = 388;

// ─── Top gift recipients ───────────────────────────────────────────────────────

export const MOCK_TOP_GIFTS: GiftRecipient[] = [
  { sunner: SUNNERS[0], giftDescription: "Nhận được 1 áo phông SAA", receivedAt: ts(1) },
  { sunner: SUNNERS[1], giftDescription: "Nhận được 1 áo phông SAA", receivedAt: ts(2) },
  { sunner: SUNNERS[2], giftDescription: "Nhận được 1 áo phông SAA", receivedAt: ts(3) },
  { sunner: SUNNERS[3], giftDescription: "Nhận được 1 áo phông SAA", receivedAt: ts(4) },
  { sunner: SUNNERS[4], giftDescription: "Nhận được 1 áo phông SAA", receivedAt: ts(5) },
];

// ─── Personal stats (mock for logged-in user) ─────────────────────────────────

export const MOCK_PERSONAL_STATS: PersonalStats = {
  sent: 25,
  received: 25,
  heartsReceived: 25,
  secretBoxCount: 25,
};
