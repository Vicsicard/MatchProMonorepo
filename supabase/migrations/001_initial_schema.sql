-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create profiles table
create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  full_name text,
  avatar_url text,
  title text,
  bio text,
  location text,
  website text,
  linkedin text,
  github text,
  user_id uuid references auth.users(id) on delete cascade not null,
  unique(user_id)
);

-- Create resumes table
create table if not exists resumes (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  is_public boolean default false,
  version integer default 1,
  file_path text,
  constraint content_check check (jsonb_typeof(content) = 'object')
);

-- Create storage bucket for resumes
insert into storage.buckets (id, name, public) 
values ('resumes', 'resumes', false);

-- Create policies for profiles
create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = user_id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = user_id );

-- Create policies for resumes
create policy "Users can view their own resumes"
  on resumes for select
  using ( auth.uid() = user_id );

create policy "Users can create their own resumes"
  on resumes for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own resumes"
  on resumes for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own resumes"
  on resumes for delete
  using ( auth.uid() = user_id );

-- Create policy for resume storage
create policy "Users can upload their own resumes"
  on storage.objects for insert
  with check ( bucket_id = 'resumes' and auth.uid()::text = (storage.foldername(name))[1] );

create policy "Users can update their own resume files"
  on storage.objects for update
  using ( bucket_id = 'resumes' and auth.uid()::text = (storage.foldername(name))[1] );

create policy "Users can delete their own resume files"
  on storage.objects for delete
  using ( bucket_id = 'resumes' and auth.uid()::text = (storage.foldername(name))[1] );

-- Create functions
create or replace function handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger update_profiles_updated_at
  before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_resumes_updated_at
  before update on resumes
  for each row execute procedure update_updated_at_column();
