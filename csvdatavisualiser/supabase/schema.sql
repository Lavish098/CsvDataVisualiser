create extension if not exists "pgcrypto";

create table if not exists public.dashboards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  source_file_name text not null,
  parsed_json jsonb not null,
  ai_insights jsonb,
  share_id uuid not null default gen_random_uuid(),
  plan_type text not null default 'free' check (plan_type in ('free', 'pro')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists dashboards_share_id_idx on public.dashboards(share_id);
create index if not exists dashboards_user_id_idx on public.dashboards(user_id);

alter table public.dashboards enable row level security;

create policy "Users can read their dashboards"
on public.dashboards for select
using (auth.uid() = user_id or share_id is not null);

create policy "Users can create dashboards"
on public.dashboards for insert
with check (auth.uid() = user_id);

create policy "Users can update their dashboards"
on public.dashboards for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
