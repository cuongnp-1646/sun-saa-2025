// Figma node: I3127:21871;256:5216
// C.4.2 Copy Link Button — copies kudos permalink to clipboard

"use client";

import { useState } from "react";

interface CopyLinkButtonProps {
  kudosId: string;
}

export function CopyLinkButton({ kudosId }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/kudos/${kudosId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — silent fail
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        aria-label="Sao chép link kudos"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/kudos/icons/copy-link.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
        />
        <span className="text-[14px]" style={{ color: "rgba(153,153,153,1)" }}>
          Copy Link
        </span>
      </button>

      {/* Toast */}
      {copied && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-[12px] font-medium"
          style={{
            background: "var(--color-primary, #FFEA9E)",
            color: "#00101A",
            zIndex: 50,
          }}
          role="status"
          aria-live="polite"
        >
          Link copied — ready to share!
        </div>
      )}
    </div>
  );
}
