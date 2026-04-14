-- ─── Sun* Kudos — Dev Fixtures ───────────────────────────────────────────────
-- Local dev + CI test data only. NEVER run against staging/production.
-- Depends on: migrations + seeds/common/01_base_data.sql
--
-- Apply via:
--   SUPABASE_EXTRA_SEEDS=./seeds/dev/*.sql supabase db reset
--   supabase db execute --file seeds/dev/02_dev_fixtures.sql

-- ─── auth.users (5 test accounts) ────────────────────────────────────────────
-- Inserting here fires the handle_new_user trigger → creates profiles rows.

insert into auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at, aud, role, instance_id
) values
  ('u0000001-0000-0000-0000-000000000001',
   'alice@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Alice Nguyen"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000'),

  ('u0000001-0000-0000-0000-000000000002',
   'bob@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Bob Tran"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000'),

  ('u0000001-0000-0000-0000-000000000003',
   'carol@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Carol Le"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000'),

  ('u0000001-0000-0000-0000-000000000004',
   'dave@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Dave Pham"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000'),

  -- Eve: used as anonymous sender in test kudo K3
  ('u0000001-0000-0000-0000-000000000005',
   'eve@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Eve Hoang"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000')
on conflict (id) do nothing;

-- ─── profiles (fill job_title + department after trigger creates rows) ────────
-- department_id refs match 01_base_data.sql:
--   CEVC2   = d0000001-...005
--   CEVC1   = d0000001-...004
--   STVC    = d0000001-...015
--   PAO     = d0000001-...033
--   OPDC-HRF = d0000001-...010

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000005',  -- CEVC2
  job_title     = 'Backend Engineer',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Alice'
where id = 'u0000001-0000-0000-0000-000000000001';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000012',  -- CEVC1 - DSV
  job_title     = 'UI/UX Designer',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Bob'
where id = 'u0000001-0000-0000-0000-000000000002';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000002',  -- SPD
  job_title     = 'Product Manager',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Carol'
where id = 'u0000001-0000-0000-0000-000000000003';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000033',  -- PAO
  job_title     = 'Marketing Lead',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Dave'
where id = 'u0000001-0000-0000-0000-000000000004';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000010',  -- OPDC - HRF
  job_title     = 'Culture Manager',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Eve'
where id = 'u0000001-0000-0000-0000-000000000005';

-- ─── kudos (5 records — covers all edge cases) ───────────────────────────────
-- K1: plain text, 1 hashtag, no images, no campaign
-- K2: rich-text HTML, 2 hashtags, 2 images, campaign assigned
-- K3: anonymous sender (is_anonymous = true)
-- K4: max hashtags (5), rich-text, campaign assigned
-- K5: max images (5), no hashtags

insert into kudos (
  id, sender_id, receiver_id, message,
  image_urls, is_anonymous, campaign_id,
  created_at, updated_at
) values
  ('k0000001-0000-0000-0000-000000000001',
   'u0000001-0000-0000-0000-000000000001',
   'u0000001-0000-0000-0000-000000000002',
   'Cảm ơn Bob đã hỗ trợ thiết kế cho sprint vừa rồi!',
   '{}', false, null,
   now() - interval '3 days', now() - interval '3 days'),

  ('k0000001-0000-0000-0000-000000000002',
   'u0000001-0000-0000-0000-000000000003',
   'u0000001-0000-0000-0000-000000000001',
   '<p>Alice là một backend engineer <strong>tuyệt vời</strong>.</p><ol><li>Luôn deliver đúng hạn</li><li>Code review chất lượng cao</li></ol>',
   array[
     'https://picsum.photos/seed/kudos1/400/300',
     'https://picsum.photos/seed/kudos2/400/300'
   ],
   false,
   'c0000001-0000-0000-0000-000000000001',  -- Award_Top talent
   now() - interval '2 days', now() - interval '2 days'),

  ('k0000001-0000-0000-0000-000000000003',
   'u0000001-0000-0000-0000-000000000005',
   'u0000001-0000-0000-0000-000000000004',
   'Bạn đã làm rất tốt chiến dịch marketing tháng này. Cảm ơn bạn rất nhiều!',
   '{}', true, null,
   now() - interval '1 day', now() - interval '1 day'),

  ('k0000001-0000-0000-0000-000000000004',
   'u0000001-0000-0000-0000-000000000002',
   'u0000001-0000-0000-0000-000000000003',
   '<p>Carol đã dẫn dắt team qua một sprint <em>cực kỳ khó</em> với kết quả xuất sắc!</p>',
   '{}', false,
   'c0000001-0000-0000-0000-000000000002',  -- Award_Top project
   now() - interval '12 hours', now() - interval '12 hours'),

  ('k0000001-0000-0000-0000-000000000005',
   'u0000001-0000-0000-0000-000000000004',
   'u0000001-0000-0000-0000-000000000005',
   'Eve tổ chức team building thật hoàn hảo!',
   array[
     'https://picsum.photos/seed/kudos3/400/300',
     'https://picsum.photos/seed/kudos4/400/300',
     'https://picsum.photos/seed/kudos5/400/300',
     'https://picsum.photos/seed/kudos6/400/300',
     'https://picsum.photos/seed/kudos7/400/300'
   ],
   false, null,
   now() - interval '6 hours', now() - interval '6 hours')

on conflict (id) do nothing;

-- ─── kudos_hashtags ───────────────────────────────────────────────────────────
-- Hashtag IDs from 01_base_data.sql:
--   h...001 = Toàn diện
--   h...002 = Giỏi chuyên môn
--   h...003 = Hiệu suất cao
--   h...004 = Truyền cảm hứng
--   h...005 = Cống hiến
--   h...006 = Aim High
--   h...007 = Be Agile
--   h...008 = Wasshoi
--   h...009 = Hướng mục tiêu
--   h...010 = Hướng khách hàng
--   h...011 = Chuẩn quy trình
--   h...012 = Giải pháp sáng tạo
--   h...013 = Quản lý xuất sắc
--
-- K1: 1 tag, K2: 2 tags, K3: 1 tag, K4: 5 tags (max boundary), K5: 0 tags

insert into kudos_hashtags (kudos_id, hashtag_id) values
  ('k0000001-0000-0000-0000-000000000001', 'h0000001-0000-0000-0000-000000000001'), -- Toàn diện
  ('k0000001-0000-0000-0000-000000000002', 'h0000001-0000-0000-0000-000000000003'), -- Hiệu suất cao
  ('k0000001-0000-0000-0000-000000000002', 'h0000001-0000-0000-0000-000000000012'), -- Giải pháp sáng tạo
  ('k0000001-0000-0000-0000-000000000003', 'h0000001-0000-0000-0000-000000000004'), -- Truyền cảm hứng
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000007'), -- Be Agile
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000005'), -- Cống hiến
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000009'), -- Hướng mục tiêu
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000010'), -- Hướng khách hàng
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000013')  -- Quản lý xuất sắc
  -- K5: no hashtags intentionally (tests empty hashtag state)
on conflict do nothing;

-- ─── kudos_hearts ─────────────────────────────────────────────────────────────

insert into kudos_hearts (kudos_id, user_id) values
  ('k0000001-0000-0000-0000-000000000001', 'u0000001-0000-0000-0000-000000000003'),
  ('k0000001-0000-0000-0000-000000000001', 'u0000001-0000-0000-0000-000000000004'),
  ('k0000001-0000-0000-0000-000000000002', 'u0000001-0000-0000-0000-000000000002'),
  ('k0000001-0000-0000-0000-000000000004', 'u0000001-0000-0000-0000-000000000001'),
  ('k0000001-0000-0000-0000-000000000004', 'u0000001-0000-0000-0000-000000000005')
on conflict do nothing;

-- ─── secret_boxes ─────────────────────────────────────────────────────────────

insert into secret_boxes (id, recipient_id, gift_description, opened) values
  ('sb000001-0000-0000-0000-000000000001',
   'u0000001-0000-0000-0000-000000000001',
   'Voucher an trua 200k', false),
  ('sb000001-0000-0000-0000-000000000002',
   'u0000001-0000-0000-0000-000000000003',
   'Ao Sun* Limited Edition', true)
on conflict (id) do nothing;

-- ─── Sync hashtag kudos_count ─────────────────────────────────────────────────

update hashtags h
set kudos_count = (
  select count(*) from kudos_hashtags kh where kh.hashtag_id = h.id
);
