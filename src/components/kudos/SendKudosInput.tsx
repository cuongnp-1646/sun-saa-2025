// Figma node: 2940:13449 (PC) / 6885:9083 (SP)
// A.1 Send Kudos pill input — opens dialog on click
// 'use client' — triggers modal open

"use client";

interface SendKudosInputProps {
  onClick: () => void;
}

export function SendKudosInput({ onClick }: SendKudosInputProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 w-full"
      style={{
        height: "56px",
        borderRadius: "100px",
        border: "1px solid var(--color-primary, #FFEA9E)",
        background: "rgba(255, 234, 158, 0.1)",
        color: "var(--color-primary, #FFEA9E)",
        fontSize: "16px",
        padding: "0 24px",
        cursor: "pointer",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255, 234, 158, 0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255, 234, 158, 0.1)";
      }}
      aria-label="Mở form ghi nhận cảm ơn đồng nghiệp"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/kudos/icons/pencil.svg"
        alt=""
        width={20}
        height={20}
        aria-hidden="true"
      />
      <span>Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?</span>
    </button>
  );
}
