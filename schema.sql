-- Users table (managed by Supabase Auth, but extending it here)
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Courses table
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Modules table (sections within a course)
create table public.modules (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references public.courses not null,
  title text not null,
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Lessons table
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  module_id uuid references public.modules not null,
  title text not null,
  slug text not null,
  content text, -- Markdown content
  initial_code text,
  solution_code text,
  language text not null, -- 'javascript', 'python', etc.
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Progress table
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles not null,
  lesson_id uuid references public.lessons not null,
  status text check (status in ('started', 'completed')) default 'started',
  code_submitted text,
  completed_at timestamp with time zone,
  unique(user_id, lesson_id)
);
