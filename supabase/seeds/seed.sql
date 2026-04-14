-- ─── Sun* Kudos — Reference Data Seed ───────────────────────────────────────
-- Static lookup data loaded on every environment.
-- Safe to run multiple times (ON CONFLICT DO NOTHING).

-- ─── departments (50 entries) ────────────────────────────────────────────────

insert into departments (id, name) values
  ('d0000001-0000-0000-0000-000000000001', 'CTO'),
  ('d0000001-0000-0000-0000-000000000002', 'SPD'),
  ('d0000001-0000-0000-0000-000000000003', 'FCOV'),
  ('d0000001-0000-0000-0000-000000000004', 'CEVC1'),
  ('d0000001-0000-0000-0000-000000000005', 'CEVC2'),
  ('d0000001-0000-0000-0000-000000000006', 'STVC - R&D'),
  ('d0000001-0000-0000-0000-000000000007', 'CEVC2 - CySS'),
  ('d0000001-0000-0000-0000-000000000008', 'FCOV - LRM'),
  ('d0000001-0000-0000-0000-000000000009', 'CEVC2 - System'),
  ('d0000001-0000-0000-0000-000000000010', 'OPDC - HRF'),
  ('d0000001-0000-0000-0000-000000000011', 'CEVC1 - DSV - UI/UX 1'),
  ('d0000001-0000-0000-0000-000000000012', 'CEVC1 - DSV'),
  ('d0000001-0000-0000-0000-000000000013', 'CEVEC'),
  ('d0000001-0000-0000-0000-000000000014', 'OPDC - HRD - C&C'),
  ('d0000001-0000-0000-0000-000000000015', 'STVC'),
  ('d0000001-0000-0000-0000-000000000016', 'FCOV - F&A'),
  ('d0000001-0000-0000-0000-000000000017', 'CEVC1 - DSV - UI/UX 2'),
  ('d0000001-0000-0000-0000-000000000018', 'CEVC1 - AIE'),
  ('d0000001-0000-0000-0000-000000000019', 'OPDC - HRF - C&B'),
  ('d0000001-0000-0000-0000-000000000020', 'FCOV - GA'),
  ('d0000001-0000-0000-0000-000000000021', 'FCOV - ISO'),
  ('d0000001-0000-0000-0000-000000000022', 'STVC - EE'),
  ('d0000001-0000-0000-0000-000000000023', 'GEU - HUST'),
  ('d0000001-0000-0000-0000-000000000024', 'CEVEC - SAPD'),
  ('d0000001-0000-0000-0000-000000000025', 'OPDC - HRF - OD'),
  ('d0000001-0000-0000-0000-000000000026', 'CEVEC - GSD'),
  ('d0000001-0000-0000-0000-000000000027', 'GEU - TM'),
  ('d0000001-0000-0000-0000-000000000028', 'STVC - R&D - DTR'),
  ('d0000001-0000-0000-0000-000000000029', 'STVC - R&D - DPS'),
  ('d0000001-0000-0000-0000-000000000030', 'CEVC3'),
  ('d0000001-0000-0000-0000-000000000031', 'STVC - R&D - AIR'),
  ('d0000001-0000-0000-0000-000000000032', 'CEVC4'),
  ('d0000001-0000-0000-0000-000000000033', 'PAO'),
  ('d0000001-0000-0000-0000-000000000034', 'GEU'),
  ('d0000001-0000-0000-0000-000000000035', 'GEU - DUT'),
  ('d0000001-0000-0000-0000-000000000036', 'OPDC - HRD - L&D'),
  ('d0000001-0000-0000-0000-000000000037', 'OPDC - HRD - TI'),
  ('d0000001-0000-0000-0000-000000000038', 'OPDC - HRF - TA'),
  ('d0000001-0000-0000-0000-000000000039', 'GEU - UET'),
  ('d0000001-0000-0000-0000-000000000040', 'STVC - R&D - SDX'),
  ('d0000001-0000-0000-0000-000000000041', 'OPDC - HRD - HRBP'),
  ('d0000001-0000-0000-0000-000000000042', 'PAO - PEC'),
  ('d0000001-0000-0000-0000-000000000043', 'IAV'),
  ('d0000001-0000-0000-0000-000000000044', 'STVC - Infra'),
  ('d0000001-0000-0000-0000-000000000045', 'CPV - CGP'),
  ('d0000001-0000-0000-0000-000000000046', 'GEU - UIT'),
  ('d0000001-0000-0000-0000-000000000047', 'OPDC - HRD'),
  ('d0000001-0000-0000-0000-000000000048', 'BDV'),
  ('d0000001-0000-0000-0000-000000000049', 'CPV'),
  ('d0000001-0000-0000-0000-000000000050', 'PAO - PAO')
on conflict (id) do nothing;

-- ─── hashtags (13 entries) ────────────────────────────────────────────────────

insert into hashtags (id, name, kudos_count) values
  ('a0000001-0000-0000-0000-000000000001', 'Toàn diện',          0),
  ('a0000001-0000-0000-0000-000000000002', 'Giỏi chuyên môn',    0),
  ('a0000001-0000-0000-0000-000000000003', 'Hiệu suất cao',      0),
  ('a0000001-0000-0000-0000-000000000004', 'Truyền cảm hứng',    0),
  ('a0000001-0000-0000-0000-000000000005', 'Cống hiến',          0),
  ('a0000001-0000-0000-0000-000000000006', 'Aim High',           0),
  ('a0000001-0000-0000-0000-000000000007', 'Be Agile',           0),
  ('a0000001-0000-0000-0000-000000000008', 'Wasshoi',            0),
  ('a0000001-0000-0000-0000-000000000009', 'Hướng mục tiêu',     0),
  ('a0000001-0000-0000-0000-000000000010', 'Hướng khách hàng',   0),
  ('a0000001-0000-0000-0000-000000000011', 'Chuẩn quy trình',    0),
  ('a0000001-0000-0000-0000-000000000012', 'Giải pháp sáng tạo', 0),
  ('a0000001-0000-0000-0000-000000000013', 'Quản lý xuất sắc',   0)
on conflict (id) do nothing;

-- ─── campaigns (6 award types) ───────────────────────────────────────────────

insert into campaigns (id, name, slug) values
  ('c0000001-0000-0000-0000-000000000001', 'Award_Top talent',              'award-top-talent'),
  ('c0000001-0000-0000-0000-000000000002', 'Award_Top project',             'award-top-project'),
  ('c0000001-0000-0000-0000-000000000003', 'Award_Top project leader',      'award-top-project-leader'),
  ('c0000001-0000-0000-0000-000000000004', 'Award_Best Manager',            'award-best-manager'),
  ('c0000001-0000-0000-0000-000000000005', 'Award_Signature 2025 - Creator','award-signature-2025-creator'),
  ('c0000001-0000-0000-0000-000000000006', 'Award_MVP',                     'award-mvp')
on conflict (id) do nothing;

-- ─── auth.users (5 demo accounts) ────────────────────────────────────────────
-- Uses extensions.crypt / extensions.gen_salt (pgcrypto lives in extensions
-- schema on Supabase remote). Trigger handle_new_user creates profiles rows.

insert into auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at, aud, role, instance_id
) values
  ('b0000001-0000-0000-0000-000000000001',
   'alice@sun.example',
   extensions.crypt('password123', extensions.gen_salt('bf')),
   now(), '{"full_name":"Alice Nguyen"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000'),

  ('b0000001-0000-0000-0000-000000000002',
   'bob@sun.example',
   extensions.crypt('password123', extensions.gen_salt('bf')),
   now(), '{"full_name":"Bob Tran"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000'),

  ('b0000001-0000-0000-0000-000000000003',
   'carol@sun.example',
   extensions.crypt('password123', extensions.gen_salt('bf')),
   now(), '{"full_name":"Carol Le"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000'),

  ('b0000001-0000-0000-0000-000000000004',
   'dave@sun.example',
   extensions.crypt('password123', extensions.gen_salt('bf')),
   now(), '{"full_name":"Dave Pham"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000'),

  ('b0000001-0000-0000-0000-000000000005',
   'eve@sun.example',
   extensions.crypt('password123', extensions.gen_salt('bf')),
   now(), '{"full_name":"Eve Hoang"}'::jsonb,
   now(), now(), 'authenticated', 'authenticated',
   '00000000-0000-0000-0000-000000000000')

on conflict (id) do nothing;

-- ─── profiles (enrich after trigger creates rows) ─────────────────────────────

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000005',  -- CEVC2
  job_title     = 'Backend Engineer',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Alice'
where id = 'b0000001-0000-0000-0000-000000000001';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000012',  -- CEVC1 - DSV
  job_title     = 'UI/UX Designer',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Bob'
where id = 'b0000001-0000-0000-0000-000000000002';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000002',  -- SPD
  job_title     = 'Product Manager',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Carol'
where id = 'b0000001-0000-0000-0000-000000000003';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000033',  -- PAO
  job_title     = 'Marketing Lead',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Dave'
where id = 'b0000001-0000-0000-0000-000000000004';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000010',  -- OPDC - HRF
  job_title     = 'Culture Manager',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Eve'
where id = 'b0000001-0000-0000-0000-000000000005';
