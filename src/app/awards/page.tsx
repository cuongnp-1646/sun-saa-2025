import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { AwardsPage } from "@/components/awards/AwardsPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Hệ thống giải thưởng | Sun* Annual Awards 2025",
  description:
    "Khám phá hệ thống giải thưởng Sun* Annual Awards 2025 — vinh danh những cá nhân và tập thể xuất sắc.",
};

export default function AwardsRoute() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-page,#00101A)]">
      <Header activeRoute="awards" />
      <AwardsPage />
      <Footer />
    </div>
  );
}
