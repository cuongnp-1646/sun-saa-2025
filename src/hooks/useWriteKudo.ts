'use client';

import { useState, useCallback, useRef } from 'react';
import type { Sunner, Hashtag } from '@/types/kudos';

export interface WriteKudoErrors {
  recipient?: string;
  title?: string;
  message?: string;
  hashtags?: string;
}

export interface UseWriteKudoReturn {
  // Fetch hashtags for dropdown (call on modal open)
  loadHashtags: () => Promise<void>;

  // Recipient
  recipientQuery: string;
  recipientResults: Sunner[];
  selectedRecipient: Sunner | null;
  setRecipientQuery: (q: string) => void;
  selectRecipient: (s: Sunner) => void;
  clearRecipient: () => void;

  // Title (Danh hiệu)
  title: string;
  setTitle: (v: string) => void;

  // Message — managed as HTML string; caller owns the editor
  message: string;
  setMessage: (html: string) => void;

  // Hashtags
  availableHashtags: Hashtag[];
  selectedHashtags: Hashtag[];
  addHashtag: (tag: Hashtag) => void;
  removeHashtag: (id: string) => void;

  // Images
  images: File[];
  addImage: (file: File) => void;
  removeImage: (index: number) => void;

  // Anonymous
  isAnonymous: boolean;
  setIsAnonymous: (v: boolean) => void;

  // Submit
  fieldErrors: WriteKudoErrors;
  submitError: string | null;
  isSubmitting: boolean;
  submit: () => Promise<boolean>; // resolves true on success

  // Reset
  reset: () => void;
}

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? 'Upload thất bại');
  }
  const data = await res.json() as { url: string };
  return data.url;
}

export function useWriteKudo(): UseWriteKudoReturn {
  const [recipientQuery, setRecipientQueryRaw] = useState('');
  const [recipientResults, setRecipientResults] = useState<Sunner[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<Sunner | null>(null);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [availableHashtags, setAvailableHashtags] = useState<Hashtag[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<Hashtag[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<WriteKudoErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hashtagsFetched = useRef(false);

  // ── Fetch available hashtags (once, on first call) ──────────────────────────
  const fetchHashtags = useCallback(async () => {
    if (hashtagsFetched.current) return;
    hashtagsFetched.current = true;
    try {
      const res = await fetch('/api/hashtags');
      if (res.ok) {
        const data = await res.json() as { data: Hashtag[] };
        setAvailableHashtags(data.data ?? []);
      }
    } catch {
      // ignore
    }
  }, []);

  // ── Recipient search (debounced 300ms) ───────────────────────────────────────
  const setRecipientQuery = useCallback(
    (q: string) => {
      setRecipientQueryRaw(q);
      if (searchTimer.current) clearTimeout(searchTimer.current);
      if (!q.trim()) {
        setRecipientResults([]);
        return;
      }
      searchTimer.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `/api/sunners?q=${encodeURIComponent(q)}&limit=5`
          );
          if (res.ok) {
            const data = await res.json() as { data: Sunner[] };
            setRecipientResults(data.data ?? []);
          }
        } catch {
          // ignore
        }
      }, 300);
    },
    []
  );

  const selectRecipient = useCallback((s: Sunner) => {
    setSelectedRecipient(s);
    setRecipientResults([]);
    setRecipientQueryRaw('');
    setFieldErrors((prev) => ({ ...prev, recipient: undefined }));
    // Trigger hashtag fetch when modal becomes active
    fetchHashtags();
  }, [fetchHashtags]);

  const clearRecipient = useCallback(() => {
    setSelectedRecipient(null);
    setRecipientQueryRaw('');
    setRecipientResults([]);
  }, []);

  // ── Hashtags ─────────────────────────────────────────────────────────────────
  const addHashtag = useCallback((tag: Hashtag) => {
    setSelectedHashtags((prev) => {
      if (prev.length >= 5) return prev;
      if (prev.some((t) => t.id === tag.id)) return prev;
      return [...prev, tag];
    });
    setFieldErrors((prev) => ({ ...prev, hashtags: undefined }));
  }, []);

  const removeHashtag = useCallback((id: string) => {
    setSelectedHashtags((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Images ───────────────────────────────────────────────────────────────────
  const addImage = useCallback((file: File) => {
    setImages((prev) => (prev.length >= 5 ? prev : [...prev, file]));
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ── Validation ───────────────────────────────────────────────────────────────
  function validate(): WriteKudoErrors {
    const errors: WriteKudoErrors = {};
    if (!selectedRecipient) errors.recipient = 'Vui lòng chọn người nhận.';
    if (!title.trim()) errors.title = 'Vui lòng nhập danh hiệu.';
    const textContent = message.replace(/<[^>]+>/g, '').trim();
    if (!textContent) errors.message = 'Vui lòng nhập nội dung lời cảm ơn.';
    if (selectedHashtags.length === 0)
      errors.hashtags = 'Vui lòng chọn ít nhất 1 hashtag.';
    return errors;
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  const submit = useCallback(async (): Promise<boolean> => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Upload images in parallel
      const uploadResults = await Promise.allSettled(images.map(uploadImage));
      const imageUrls = uploadResults
        .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
        .map((r) => r.value);
      const failedCount = uploadResults.filter((r) => r.status === 'rejected').length;
      if (failedCount > 0) {
        setSubmitError(`${failedCount} ảnh upload thất bại nhưng Kudos vẫn sẽ được gửi.`);
      }

      // 2. POST /api/kudos
      const res = await fetch('/api/kudos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: selectedRecipient!.id,
          title: title.trim() || undefined,
          message,
          hashtags: selectedHashtags.map((t) => t.name),
          imageUrls,
          isAnonymous,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setSubmitError(data.error ?? 'Gửi kudos thất bại. Vui lòng thử lại.');
        return false;
      }

      return true;
    } catch {
      setSubmitError('Lỗi kết nối. Vui lòng thử lại.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecipient, title, message, selectedHashtags, images, isAnonymous]);

  // ── Reset ────────────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    setSelectedRecipient(null);
    setRecipientQueryRaw('');
    setRecipientResults([]);
    setTitle('');
    setMessage('');
    setSelectedHashtags([]);
    setImages([]);
    setIsAnonymous(false);
    setFieldErrors({});
    setSubmitError(null);
    hashtagsFetched.current = false;
  }, []);

  return {
    loadHashtags: fetchHashtags,
    recipientQuery,
    recipientResults,
    selectedRecipient,
    setRecipientQuery,
    selectRecipient,
    clearRecipient,
    title,
    setTitle,
    message,
    setMessage,
    availableHashtags,
    selectedHashtags,
    addHashtag,
    removeHashtag,
    images,
    addImage,
    removeImage,
    isAnonymous,
    setIsAnonymous,
    fieldErrors,
    submitError,
    isSubmitting,
    submit,
    reset,
  };
}
