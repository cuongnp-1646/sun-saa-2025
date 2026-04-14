// US2 Send Kudos Dialog — modal form for sending kudos
// 'use client' — manages form state, API calls

"use client";

import { useState, useCallback } from "react";
import type { Sunner } from "@/types/kudos";

interface SendKudosDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SendKudosDialog({ isOpen, onClose, onSuccess }: SendKudosDialogProps) {
  const [receiverQuery, setReceiverQuery] = useState("");
  const [receiverResults, setReceiverResults] = useState<Sunner[]>([]);
  const [selectedReceiver, setSelectedReceiver] = useState<Sunner | null>(null);
  const [message, setMessage] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const searchReceivers = useCallback(
    (query: string) => {
      if (searchTimeout) clearTimeout(searchTimeout);
      if (!query.trim()) {
        setReceiverResults([]);
        return;
      }
      const t = setTimeout(async () => {
        try {
          const res = await fetch(
            `/api/sunners?q=${encodeURIComponent(query)}&limit=5`
          );
          if (res.ok) {
            const data: { data: Sunner[] } = await res.json();
            setReceiverResults(data.data ?? []);
          }
        } catch {
          // ignore
        }
      }, 300);
      setSearchTimeout(t);
    },
    [searchTimeout]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedReceiver || !message.trim()) {
      setError("Vui lòng chọn người nhận và nhập nội dung.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/kudos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: selectedReceiver.id,
          message: message.trim(),
          hashtags: hashtags
            .split(/[\s,]+/)
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? "Gửi kudos thất bại.");
      } else {
        onSuccess?.();
        onClose();
        // Reset form
        setReceiverQuery("");
        setSelectedReceiver(null);
        setMessage("");
        setHashtags("");
      }
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Gửi kudos"
    >
      <div
        className="flex flex-col gap-6 w-full max-w-[560px] rounded-2xl"
        style={{
          background: "var(--color-bg-card, #00070C)",
          border: "1px solid var(--color-border, #998C5F)",
          padding: "32px",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-primary, #FFEA9E)" }}>
            Ghi nhận đồng nghiệp
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[24px] leading-none transition-opacity hover:opacity-60"
            style={{ color: "rgba(219,209,193,1)", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Đóng"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Receiver search */}
          <div className="flex flex-col gap-1.5 relative">
            <label
              className="text-[14px] font-medium"
              style={{ color: "rgba(219,209,193,1)" }}
            >
              Người nhận *
            </label>
            {selectedReceiver ? (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  border: "1px solid var(--color-primary, #FFEA9E)",
                  background: "rgba(255,234,158,0.05)",
                }}
              >
                <span className="flex-1 text-[14px]" style={{ color: "var(--color-primary, #FFEA9E)" }}>
                  {selectedReceiver.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReceiver(null);
                    setReceiverQuery("");
                  }}
                  className="text-[16px] transition-opacity hover:opacity-60"
                  style={{ color: "rgba(219,209,193,1)", background: "none", border: "none", cursor: "pointer" }}
                  aria-label="Xóa người nhận"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên..."
                  value={receiverQuery}
                  onChange={(e) => {
                    setReceiverQuery(e.target.value);
                    searchReceivers(e.target.value);
                  }}
                  className="rounded-lg px-4 py-2.5 text-[14px] outline-none"
                  style={{
                    border: "1px solid var(--color-border, #998C5F)",
                    background: "transparent",
                    color: "#FFF",
                  }}
                />
                {receiverResults.length > 0 && (
                  <ul
                    className="absolute top-full left-0 right-0 z-20 rounded-lg overflow-hidden mt-1"
                    style={{
                      background: "#001724",
                      border: "1px solid var(--color-border, #998C5F)",
                    }}
                  >
                    {receiverResults.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReceiver(s);
                            setReceiverResults([]);
                            setReceiverQuery("");
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[14px] transition-colors hover:bg-white/10"
                          style={{ color: "#FFF", background: "none", border: "none", cursor: "pointer" }}
                        >
                          {s.name}
                          {s.department && (
                            <span className="text-[12px]" style={{ color: "rgba(219,209,193,1)" }}>
                              — {s.department}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label
              className="flex items-center justify-between text-[14px] font-medium"
              style={{ color: "rgba(219,209,193,1)" }}
            >
              <span>Nội dung *</span>
              <span className="text-[12px]">{message.length}/500</span>
            </label>
            <textarea
              placeholder="Nhập lời cảm ơn của bạn..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              rows={4}
              className="rounded-lg px-4 py-2.5 text-[14px] resize-none outline-none"
              style={{
                border: "1px solid var(--color-border, #998C5F)",
                background: "transparent",
                color: "#FFF",
              }}
            />
          </div>

          {/* Hashtags (optional) */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[14px] font-medium"
              style={{ color: "rgba(219,209,193,1)" }}
            >
              Hashtag (tùy chọn, cách nhau bởi dấu phẩy)
            </label>
            <input
              type="text"
              placeholder="#teamwork, #innovation..."
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="rounded-lg px-4 py-2.5 text-[14px] outline-none"
              style={{
                border: "1px solid var(--color-border, #998C5F)",
                background: "transparent",
                color: "#FFF",
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-[14px]" style={{ color: "rgba(212,39,29,1)" }} role="alert">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full text-[16px] font-bold transition-colors"
            style={{
              height: 48,
              background: submitting
                ? "rgba(255,234,158,0.4)"
                : "var(--color-primary, #FFEA9E)",
              color: "#00101A",
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Đang gửi..." : "Gửi Kudos"}
          </button>
        </form>
      </div>
    </div>
  );
}
