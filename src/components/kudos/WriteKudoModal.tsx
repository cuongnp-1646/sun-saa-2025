'use client';
// C.3 Viết KUDO Modal — Figma screen ihQ26W78P2
// Full replacement for SendKudosDialog. Drop-in: same { isOpen, onClose, onSuccess } props.

import {
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import type { Hashtag } from '@/types/kudos';
import { useWriteKudo } from '@/hooks/useWriteKudo';

interface WriteKudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// ─── Simple HTML sanitizer (no external dep) ─────────────────────────────────
// Strips <script>, <iframe>, on* attributes. DOMPurify can replace this later.
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/\s+on\w+="[^"]*"/gi, '')
    .replace(/\s+on\w+='[^']*'/gi, '');
}

// ─── FieldLabel ───────────────────────────────────────────────────────────────
function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span
      className="text-[22px] font-bold leading-[28px] shrink-0"
      style={{ color: 'var(--color-modal-text, #00101A)', minWidth: 120 }}
    >
      {label}
      {required && (
        <span
          aria-hidden="true"
          style={{ color: 'var(--color-required, #CF1322)', marginLeft: 2 }}
        >
          *
        </span>
      )}
    </span>
  );
}

// ─── FieldError ───────────────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="text-[14px] font-bold mt-1"
      style={{ color: 'var(--color-required, #CF1322)' }}
    >
      {message}
    </p>
  );
}

// ─── RecipientSearch ─────────────────────────────────────────────────────────
function RecipientSearch({
  query,
  results,
  selected,
  onQueryChange,
  onSelect,
  onClear,
  error,
}: {
  query: string;
  results: ReturnType<typeof useWriteKudo>['recipientResults'];
  selected: ReturnType<typeof useWriteKudo>['selectedRecipient'];
  onQueryChange: (q: string) => void;
  onSelect: (s: ReturnType<typeof useWriteKudo>['recipientResults'][0]) => void;
  onClear: () => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-1 relative">
      {selected ? (
        <div
          className="flex items-center gap-2 px-6 h-14 rounded-lg"
          style={{
            border: `1px solid var(--color-border, #998C5F)`,
            background: '#FFFFFF',
          }}
        >
          <span
            className="flex-1 text-[16px] font-bold truncate"
            style={{ color: 'var(--color-modal-text, #00101A)' }}
          >
            {selected.name}
          </span>
          <button
            type="button"
            onClick={onClear}
            aria-label="Xóa người nhận"
            className="text-[20px] leading-none transition-opacity hover:opacity-60"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-modal-text, #00101A)' }}
          >
            ×
          </button>
        </div>
      ) : (
        <>
          <div
            className="flex items-center gap-2 px-6 h-14 rounded-lg"
            style={{
              border: `1px solid ${error ? 'var(--color-required, #CF1322)' : 'var(--color-border, #998C5F)'}`,
              background: '#FFFFFF',
            }}
          >
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={query}
              onChange={(e) => {
                onQueryChange(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              className="flex-1 text-[16px] font-bold outline-none bg-transparent"
              style={{ color: 'var(--color-modal-text, #00101A)' }}
              aria-label="Tìm kiếm người nhận"
              autoComplete="off"
            />
            <span style={{ color: 'var(--color-border, #998C5F)', fontSize: 18 }}>▾</span>
          </div>

          {open && results.length > 0 && (
            <ul
              className="absolute top-full left-0 right-0 z-30 rounded-lg overflow-hidden mt-1 max-h-[200px] overflow-y-auto"
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-border, #998C5F)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              {results.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(s);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-modal-text, #00101A)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,234,158,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'none';
                    }}
                  >
                    <span className="text-[16px] font-bold flex-1 truncate">
                      {s.name}
                    </span>
                    {s.jobTitle && (
                      <span className="text-[13px]" style={{ color: '#7A6540' }}>
                        {s.jobTitle}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <FieldError message={error} />
    </div>
  );
}

// ─── Toolbar SVG icons ────────────────────────────────────────────────────────
const IconBold = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
  </svg>
);

const IconItalic = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
  </svg>
);

const IconStrikethrough = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
  </svg>
);

const IconOrderedList = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-7v2h14V4H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
  </svg>
);

const IconLink = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </svg>
);

const IconQuote = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </svg>
);

// ─── EditorToolbar ────────────────────────────────────────────────────────────
function EditorToolbar({ editorRef }: { editorRef: React.RefObject<HTMLDivElement | null> }) {
  function exec(cmd: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
  }

  function insertLink() {
    const url = window.prompt('Nhập URL:');
    if (url) exec('createLink', url);
  }

  const buttons: { label: string; icon: React.ReactNode; cmd?: string; onClick?: () => void }[] = [
    { label: 'Bold', icon: <IconBold />, cmd: 'bold' },
    { label: 'Italic', icon: <IconItalic />, cmd: 'italic' },
    { label: 'Strikethrough', icon: <IconStrikethrough />, cmd: 'strikeThrough' },
    { label: 'Ordered list', icon: <IconOrderedList />, cmd: 'insertOrderedList' },
    { label: 'Link', icon: <IconLink />, onClick: insertLink },
    { label: 'Quote', icon: <IconQuote />, onClick: () => exec('formatBlock', '<blockquote>') },
  ];

  return (
    <div
      className="flex items-center"
      style={{ borderBottom: '1px solid var(--color-border, #998C5F)' }}
    >
      <div className="flex">
        {buttons.map((btn, i) => (
          <button
            key={i}
            type="button"
            title={btn.label}
            onMouseDown={(e) => {
              e.preventDefault(); // prevent editor blur
              if (btn.onClick) {
                btn.onClick();
              } else if (btn.cmd) {
                exec(btn.cmd);
              }
            }}
            className="flex items-center justify-center transition-colors"
            style={{
              width: 48,
              height: 48,
              border: 'none',
              borderRight: i < buttons.length - 1 ? '1px solid var(--color-border, #998C5F)' : 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'var(--color-modal-text, #00101A)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,234,158,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'none';
            }}
          >
            {btn.icon}
          </button>
        ))}
      </div>
      <a
        href="#"
        className="ml-auto pr-4 text-[13px] font-bold hover:underline"
        style={{ color: 'var(--color-required, #CF1322)' }}
        onClick={(e) => e.preventDefault()}
      >
        Tiêu chuẩn cộng đồng
      </a>
    </div>
  );
}

// ─── RichTextEditor ───────────────────────────────────────────────────────────
function RichTextEditor({
  editorRef,
  onChange,
  hasError,
}: {
  editorRef: React.RefObject<HTMLDivElement | null>;
  onChange: (html: string) => void;
  hasError?: boolean;
}) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        border: `1px solid ${hasError ? 'var(--color-required, #CF1322)' : 'var(--color-border, #998C5F)'}`,
        background: '#FFFFFF',
      }}
    >
      <EditorToolbar editorRef={editorRef} />
      <div className="relative" style={{ minHeight: 200 }}>
        {showPlaceholder && (
          <p
            className="absolute top-0 left-0 right-0 px-6 py-4 text-[16px] font-bold pointer-events-none select-none"
            style={{ color: 'var(--color-modal-placeholder, #999999)' }}
            aria-hidden="true"
          >
            Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!
          </p>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            const html = (e.currentTarget as HTMLDivElement).innerHTML;
            const text = (e.currentTarget as HTMLDivElement).innerText?.trim();
            setShowPlaceholder(!text);
            onChange(sanitizeHtml(html));
          }}
          className="outline-none px-6 py-4 text-[16px] font-bold"
          style={{
            minHeight: 200,
            color: 'var(--color-modal-text, #00101A)',
            fontFamily: 'var(--font-montserrat, Montserrat)',
            lineHeight: '24px',
          }}
          aria-label="Nội dung lời cảm ơn"
          aria-multiline="true"
        />
      </div>
    </div>
  );
}

// ─── HashtagSection ───────────────────────────────────────────────────────────
function HashtagSection({
  available,
  selected,
  onAdd,
  onRemove,
  error,
  onOpen,
}: {
  available: Hashtag[];
  selected: Hashtag[];
  onAdd: (t: Hashtag) => void;
  onRemove: (id: string) => void;
  error?: string;
  onOpen: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const remaining = available.filter((t) => !selected.some((s) => s.id === t.id));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {selected.map((tag) => (
          <span
            key={tag.id}
            className="flex items-center gap-1.5 h-9 px-3 text-[14px] font-bold rounded-full"
            style={{
              background: 'var(--color-accent-primary, #FFEA9E)',
              border: '1px solid var(--color-border, #998C5F)',
              color: 'var(--color-modal-text, #00101A)',
            }}
          >
            #{tag.name}
            <button
              type="button"
              onClick={() => onRemove(tag.id)}
              aria-label={`Xóa #${tag.name}`}
              className="text-[14px] leading-none transition-opacity hover:opacity-60"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-modal-text, #00101A)' }}
            >
              ×
            </button>
          </span>
        ))}

        {selected.length < 5 && (
          <div className="relative" ref={dropRef}>
            <button
              type="button"
              onClick={() => {
                onOpen();
                setDropdownOpen((v) => !v);
              }}
              className="flex flex-col items-center justify-center gap-0.5 px-4 h-[60px] rounded-lg transition-colors"
              style={{
                border: '1px solid var(--color-border, #998C5F)',
                background: '#FFFFFF',
                color: 'var(--color-modal-text, #00101A)',
                cursor: 'pointer',
                minWidth: 96,
              }}
            >
              <span className="text-[16px] font-bold">+ Hashtag</span>
              <span className="text-[11px]" style={{ color: '#7A6540' }}>Tối đa 5</span>
            </button>

            {dropdownOpen && remaining.length > 0 && (
              <ul
                className="absolute top-full left-0 z-30 rounded-lg overflow-hidden mt-1 max-h-[200px] overflow-y-auto"
                style={{
                  minWidth: 200,
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border, #998C5F)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {remaining.map((tag) => (
                  <li key={tag.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onAdd(tag);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-left"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-modal-text, #00101A)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,234,158,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'none';
                      }}
                    >
                      <span className="text-[15px] font-bold">#{tag.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}

// ─── ImageSection ─────────────────────────────────────────────────────────────
function ImageSection({
  files,
  onAdd,
  onRemove,
}: {
  files: File[];
  onAdd: (f: File) => void;
  onRemove: (i: number) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setFileError('Chỉ chấp nhận ảnh JPEG, PNG hoặc WebP.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('Kích thước ảnh tối đa 5MB.');
      return;
    }
    setFileError(null);
    onAdd(file);
    // reset input so same file can be re-selected
    e.target.value = '';
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {files.map((file, i) => (
          <div
            key={i}
            className="relative shrink-0"
            style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-border, #998C5F)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(file)}
              alt={`Ảnh ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label={`Xóa ảnh ${i + 1}`}
              className="absolute flex items-center justify-center"
              style={{
                top: 0,
                right: 0,
                width: 20,
                height: 20,
                borderRadius: 'var(--radius-remove-btn, 71px)',
                background: 'var(--color-delete, #D4271D)',
                border: 'none',
                cursor: 'pointer',
                color: '#FFFFFF',
                fontSize: 12,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        ))}

        {files.length < 5 && (
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-0.5 px-4 h-[60px] rounded-lg transition-colors"
              style={{
                border: '1px solid var(--color-border, #998C5F)',
                background: '#FFFFFF',
                color: 'var(--color-modal-text, #00101A)',
                cursor: 'pointer',
                minWidth: 96,
              }}
            >
              <span className="text-[16px] font-bold">+ Image</span>
              <span className="text-[11px]" style={{ color: '#7A6540' }}>Tối đa 5</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
      {fileError && <FieldError message={fileError} />}
    </div>
  );
}

// ─── WriteKudoModal ───────────────────────────────────────────────────────────
export function WriteKudoModal({ isOpen, onClose, onSuccess }: WriteKudoModalProps) {
  const form = useWriteKudo();
  const editorRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLInputElement>(null);

  // Focus trap + Escape key
  useEffect(() => {
    if (!isOpen) return;
    firstFocusRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      form.reset();
      // clear editor content
      if (editorRef.current) editorRef.current.innerHTML = '';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSubmit = useCallback(async () => {
    const ok = await form.submit();
    if (ok) {
      onSuccess?.();
      onClose();
    }
  }, [form, onSuccess, onClose]);

  // Pre-fetch hashtags when modal opens
  useEffect(() => {
    if (isOpen) {
      void form.loadHashtags();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const isValid =
    !!form.selectedRecipient &&
    !!form.title.trim() &&
    !!form.message.replace(/<[^>]+>/g, '').trim() &&
    form.selectedHashtags.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: 'rgba(0,16,26,0.8)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-kudo-title"
    >
      <div
        className="flex flex-col w-full"
        style={{
          maxWidth: 752,
          background: 'var(--color-bg-modal, #FFF8E1)',
          borderRadius: 'var(--radius-modal, 24px)',
          padding: 40,
          gap: 32,
          boxShadow: 'var(--shadow-modal, 0 20px 40px rgba(0,0,0,0.3))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* A. Title */}
        <h2
          id="write-kudo-title"
          className="text-center font-bold leading-[40px]"
          style={{
            fontSize: 32,
            color: 'var(--color-modal-text, #00101A)',
            fontFamily: 'var(--font-montserrat, Montserrat)',
          }}
        >
          Gửi lời cám ơn và ghi nhận đến đồng đội
        </h2>

        {/* B. Người nhận */}
        <div className="flex items-start gap-4">
          <FieldLabel label="Người nhận" required />
          <RecipientSearch
            query={form.recipientQuery}
            results={form.recipientResults}
            selected={form.selectedRecipient}
            onQueryChange={form.setRecipientQuery}
            onSelect={form.selectRecipient}
            onClear={form.clearRecipient}
            error={form.fieldErrors.recipient}
          />
        </div>

        {/* Danh hiệu */}
        <div className="flex items-start gap-4">
          <FieldLabel label="Danh hiệu" required />
          <div className="flex-1 flex flex-col">
            <input
              ref={firstFocusRef}
              type="text"
              placeholder="Dành tặng một danh hiệu cho đồng đội"
              value={form.title}
              onChange={(e) => form.setTitle(e.target.value)}
              maxLength={200}
              className="w-full h-14 px-6 text-[16px] font-bold outline-none rounded-lg"
              style={{
                border: `1px solid ${form.fieldErrors.title ? 'var(--color-required, #CF1322)' : 'var(--color-border, #998C5F)'}`,
                background: '#FFFFFF',
                color: 'var(--color-modal-text, #00101A)',
                fontFamily: 'var(--font-montserrat, Montserrat)',
              }}
            />
            <p
              className="text-[13px] font-bold mt-2"
              style={{ color: '#7A6540' }}
            >
              Ví dụ: Người truyền động lực cho tôi.{' '}
              <span className="block">Danh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn.</span>
            </p>
            <FieldError message={form.fieldErrors.title} />
          </div>
        </div>

        {/* C+D. Rich text editor */}
        <div className="flex flex-col gap-1">
          <RichTextEditor
            editorRef={editorRef}
            onChange={form.setMessage}
            hasError={!!form.fieldErrors.message}
          />
          <p
            className="text-center text-[13px] font-bold mt-1"
            style={{ color: '#7A6540' }}
          >
            Bạn có thể &ldquo;@ + tên&rdquo; để nhắc tới đồng nghiệp khác
          </p>
          <FieldError message={form.fieldErrors.message} />
        </div>

        {/* E. Hashtag */}
        <div className="flex items-start gap-4">
          <FieldLabel label="Hashtag" required />
          <div className="flex-1">
            <HashtagSection
              available={form.availableHashtags}
              selected={form.selectedHashtags}
              onAdd={form.addHashtag}
              onRemove={form.removeHashtag}
              error={form.fieldErrors.hashtags}
              onOpen={() => void form.loadHashtags()}
            />
          </div>
        </div>

        {/* F. Image */}
        <div className="flex items-start gap-4">
          <FieldLabel label="Image" />
          <ImageSection
            files={form.images}
            onAdd={form.addImage}
            onRemove={form.removeImage}
          />
        </div>

        {/* G. Anonymous toggle */}
        <label
          className="flex items-center gap-3 cursor-pointer select-none"
          style={{ color: form.isAnonymous ? 'var(--color-modal-text, #00101A)' : '#999999' }}
        >
          <input
            type="checkbox"
            checked={form.isAnonymous}
            onChange={(e) => form.setIsAnonymous(e.target.checked)}
            className="w-6 h-6 rounded cursor-pointer"
            style={{
              accentColor: 'var(--color-accent-primary, #FFEA9E)',
              border: '1px solid #999999',
            }}
          />
          <span className="text-[22px] font-bold leading-[28px]">
            Gửi lời cám ơn và ghi nhận ẩn danh
          </span>
        </label>

        {/* Submit error */}
        {form.submitError && (
          <p
            className="text-[14px] font-bold"
            role="alert"
            style={{ color: 'var(--color-required, #CF1322)' }}
          >
            {form.submitError}
          </p>
        )}

        {/* H. Action buttons */}
        <div className="flex gap-4">
          {/* H.1 Cancel */}
          <button
            type="button"
            onClick={onClose}
            disabled={form.isSubmitting}
            className="flex items-center justify-center gap-2 font-bold text-[22px] transition-colors"
            style={{
              height: 60,
              padding: '0 40px',
              border: '1px solid var(--color-border, #998C5F)',
              borderRadius: 'var(--radius-send-btn, 8px)',
              background: 'transparent',
              color: 'var(--color-modal-text, #00101A)',
              cursor: form.isSubmitting ? 'not-allowed' : 'pointer',
              opacity: form.isSubmitting ? 0.5 : 1,
              fontFamily: 'var(--font-montserrat, Montserrat)',
            }}
          >
            Hủy
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* H.2 Send */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || form.isSubmitting}
            className="flex flex-1 items-center justify-center gap-2 font-bold text-[22px] transition-opacity"
            style={{
              height: 60,
              borderRadius: 'var(--radius-send-btn, 8px)',
              background:
                !isValid || form.isSubmitting
                  ? 'rgba(255,234,158,0.5)'
                  : 'var(--color-accent-primary, #FFEA9E)',
              color: 'var(--color-modal-text, #00101A)',
              border: 'none',
              cursor: !isValid || form.isSubmitting ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-montserrat, Montserrat)',
            }}
          >
            {form.isSubmitting ? 'Đang gửi...' : (
              <>
                Gửi
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M2.9043 20.4797V4.47974L21.9043 12.4797M4.9043 17.4797L16.7543 12.4797L4.9043 7.47974V10.9797L10.9043 12.4797L4.9043 13.9797M4.9043 17.4797V7.47974V13.9797V17.4797Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
