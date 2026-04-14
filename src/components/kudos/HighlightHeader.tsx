// Figma node: 2940:13452 (PC) / 6885:9085 (SP)
// B.1 Highlight Kudos section header with filter dropdowns
// 'use client' needed for dropdown interaction

"use client";

import { SectionTitle } from "./SectionTitle";
import type { Hashtag, Department } from "@/types/kudos";

interface HighlightHeaderProps {
  hashtags: Hashtag[];
  departments: Department[];
  selectedHashtagId?: string;
  selectedDepartmentId?: string;
  onHashtagChange: (id: string | undefined) => void;
  onDepartmentChange: (id: string | undefined) => void;
}

export function HighlightHeader({
  hashtags,
  departments,
  selectedHashtagId,
  selectedDepartmentId,
  onHashtagChange,
  onDepartmentChange,
}: HighlightHeaderProps) {
  return (
    <div
      className="flex items-end justify-between gap-4"
      style={{
        padding: "0 var(--page-padding-x, 144px)",
        width: "100%",
      }}
    >
      <SectionTitle
        subtitle="Sun* Annual Awards 2025"
        title="HIGHLIGHT KUDOS"
      />

      {/* Filter dropdowns */}
      <div className="flex items-center gap-3">
        {/* Hashtag filter — B.1.1, node 2940:13459 */}
        <select
          value={selectedHashtagId ?? ""}
          onChange={(e) =>
            onHashtagChange(e.target.value || undefined)
          }
          aria-label="Lọc theo hashtag"
          style={{
            height: "40px",
            borderRadius: "4px",
            border: "1px solid var(--color-border, #998C5F)",
            background: "transparent",
            color: "var(--color-primary, #FFEA9E)",
            fontSize: "14px",
            padding: "0 12px",
            cursor: "pointer",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor =
              "var(--color-primary, #FFEA9E)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              "var(--color-border, #998C5F)";
          }}
        >
          <option value="" style={{ background: "#00101A" }}>
            Hashtag
          </option>
          {hashtags.map((h) => (
            <option key={h.id} value={h.id} style={{ background: "#00101A" }}>
              #{h.name}
            </option>
          ))}
        </select>

        {/* Department filter — B.1.2, node 2940:13460 */}
        <select
          value={selectedDepartmentId ?? ""}
          onChange={(e) =>
            onDepartmentChange(e.target.value || undefined)
          }
          aria-label="Lọc theo phòng ban"
          style={{
            height: "40px",
            borderRadius: "4px",
            border: "1px solid var(--color-border, #998C5F)",
            background: "transparent",
            color: "var(--color-primary, #FFEA9E)",
            fontSize: "14px",
            padding: "0 12px",
            cursor: "pointer",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor =
              "var(--color-primary, #FFEA9E)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              "var(--color-border, #998C5F)";
          }}
        >
          <option value="" style={{ background: "#00101A" }}>
            Phòng ban
          </option>
          {departments.map((d) => (
            <option key={d.id} value={d.id} style={{ background: "#00101A" }}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
