// POST /api/upload — upload a single image to Supabase Storage (kudos-images bucket)
// Returns: { url: string }
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';
import { randomUUID } from 'crypto';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const BUCKET = 'kudos-images';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file field' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Chỉ chấp nhận ảnh JPEG, PNG hoặc WebP' },
      { status: 422 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: 'Kích thước ảnh tối đa là 5MB' },
      { status: 422 }
    );
  }

  const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
  const path = `${user.id}/${randomUUID()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: 'Upload thất bại. Vui lòng thử lại.' },
      { status: 500 }
    );
  }

  const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return NextResponse.json({ url: publicData.publicUrl }, { status: 201 });
}
