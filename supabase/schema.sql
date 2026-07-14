-- Scale Quest — Supabase schema
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  xp integer default 0,
  level integer default 1,
  score integer default 0,
  best_combo integer default 0,
  updated_at timestamptz default now()
);

create table if not exists public.practice_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  family text,
  mode text,
  correct integer default 0,
  total integer default 0,
  xp_gained integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  slug text not null,
  earned_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.practice_sessions enable row level security;
alter table public.badges enable row level security;

create policy "Users see own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users see own sessions" on public.practice_sessions for all using (auth.uid() = user_id);
create policy "Users see own badges" on public.badges for all using (auth.uid() = user_id);
