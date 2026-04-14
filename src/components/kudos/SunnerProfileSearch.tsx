// Figma node: I2940:13450;186:2759 — "Tìm kiếm profile Sunner" pill input in hero
// Positioned to the RIGHT of SendKudosInput in the hero area.
// Debounced search → /api/sunners?q= → dropdown → navigate to /profile/{id}

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Sunner } from '@/types/kudos';
import { ROUTES } from '@/config/navigation';

export function SunnerProfileSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Sunner[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const search = useCallback((q: string) => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    searchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/sunners?q=${encodeURIComponent(q)}&limit=8`);
        if (res.ok) {
          const data: { data: Sunner[] } = await res.json();
          setResults(data.data ?? []);
          setOpen(true);
        }
      } catch {
        // ignore network errors
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    search(val);
  }

  function handleSelect(sunner: Sunner) {
    setQuery('');
    setResults([]);
    setOpen(false);
    router.push(`${ROUTES.profile}/${sunner.id}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Pill search input — Figma: height 56px, border-radius 100px, border 1px #FFEA9E */}
      <div
        className="flex items-center gap-2"
        style={{
          height: '56px',
          borderRadius: '100px',
          border: '1px solid var(--color-primary, #FFEA9E)',
          background: 'rgba(255, 234, 158, 0.1)',
          padding: '0 20px',
          transition: 'background 0.15s',
        }}
      >
        {/* Search icon (Figma: I2940:13450;186:2759) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/kudos/icons/search.svg"
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
          style={{
            flexShrink: 0,
            filter:
              'brightness(0) saturate(100%) invert(93%) sepia(21%) saturate(454%) hue-rotate(339deg) brightness(107%) contrast(104%)',
          }}
          onError={(e) => {
            // fallback: show a unicode magnifier if SVG missing
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <input
          type="text"
          placeholder="Tìm kiếm profile Sunner"
          value={query}
          onChange={handleChange}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 bg-transparent outline-none text-[14px]"
          style={{
            color: 'var(--color-primary, #FFEA9E)',
            caretColor: 'var(--color-primary, #FFEA9E)',
          }}
          aria-label="Tìm kiếm profile Sunner"
          aria-autocomplete="list"
          aria-expanded={open}
          role="combobox"
        />
        {loading && (
          <span
            className="text-[11px] shrink-0"
            style={{ color: 'rgba(219,209,193,0.7)' }}
            aria-hidden="true"
          >
            …
          </span>
        )}
      </div>

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <ul
          className="absolute top-full left-0 right-0 mt-2 z-30 overflow-hidden overflow-y-auto rounded-2xl"
          style={{
            background: '#001420',
            border: '1px solid var(--color-border, #998C5F)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            maxHeight: '280px',
          }}
          role="listbox"
          aria-label="Kết quả tìm kiếm Sunner"
        >
          {results.map((sunner) => (
            <li key={sunner.id} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => handleSelect(sunner)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    'rgba(255,234,158,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'none';
                }}
              >
                {/* Avatar */}
                <div
                  className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full"
                  style={{
                    width: 36,
                    height: 36,
                    border: '1px solid var(--color-primary, #FFEA9E)',
                    background: '#00101A',
                  }}
                >
                  {sunner.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sunner.avatarUrl}
                      alt={sunner.name}
                      width={36}
                      height={36}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  ) : (
                    <span
                      className="text-[12px] font-bold uppercase"
                      style={{ color: 'var(--color-primary, #FFEA9E)' }}
                    >
                      {sunner.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Name + department */}
                <div className="flex min-w-0 flex-col">
                  <span
                    className="truncate text-[14px] font-medium"
                    style={{ color: 'var(--color-primary, #FFEA9E)' }}
                  >
                    {sunner.name}
                  </span>
                  {sunner.department && (
                    <span
                      className="truncate text-[11px]"
                      style={{ color: 'rgba(219,209,193,0.8)' }}
                    >
                      {sunner.department}
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Empty state when user typed but no results */}
      {open && !loading && query.trim() && results.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-30 rounded-2xl px-4 py-3"
          style={{
            background: '#001420',
            border: '1px solid var(--color-border, #998C5F)',
          }}
        >
          <p className="text-[13px]" style={{ color: 'rgba(219,209,193,0.7)' }}>
            Không tìm thấy Sunner nào.
          </p>
        </div>
      )}
    </div>
  );
}
