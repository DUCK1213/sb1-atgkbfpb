/*
  # Initial Schema Setup for CareerPath

  1. New Tables
    - users
      - Custom user profile data
    - company_ratings
      - Company reviews and ratings
    - posts
      - User posts with character limit
    - job_posts
      - Job listings
    - user_skills
      - User skills for matching

  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid REFERENCES auth.users PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  current_company text,
  years_of_experience integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Company ratings
CREATE TABLE IF NOT EXISTS company_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  company_name text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review text NOT NULL,
  pros text,
  cons text,
  tenure text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  content text CHECK (char_length(content) <= 500) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Job posts
CREATE TABLE IF NOT EXISTS job_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  description text NOT NULL,
  required_skills text[] NOT NULL,
  experience_level text NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User skills
CREATE TABLE IF NOT EXISTS user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  skill text NOT NULL,
  years_experience integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read all users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read all company ratings"
  ON company_ratings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create company ratings"
  ON company_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read all job posts"
  ON job_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own skills"
  ON user_skills FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own skills"
  ON user_skills FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);