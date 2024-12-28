/*
  # LinkedIn Features Enhancement

  1. New Tables
    - `connections`: Manages user connections/network
    - `messages`: Private messaging system
    - `company_pages`: Company profiles and information
    - `notifications`: User notifications
    - `endorsements`: Skill endorsements

  2. Security
    - Enable RLS on all new tables
    - Add policies for data access control
*/

-- Connections system
CREATE TABLE IF NOT EXISTS connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES users NOT NULL,
  receiver_id uuid REFERENCES users NOT NULL,
  status text CHECK (status IN ('pending', 'accepted', 'rejected')) NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(requester_id, receiver_id)
);

-- Messages system
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES users NOT NULL,
  receiver_id uuid REFERENCES users NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Company pages
CREATE TABLE IF NOT EXISTS company_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  industry text,
  size text,
  website text,
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  type text NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Skill endorsements
CREATE TABLE IF NOT EXISTS endorsements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  endorsed_by_id uuid REFERENCES users NOT NULL,
  skill text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, endorsed_by_id, skill)
);

-- Enable RLS
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their connections"
  ON connections FOR ALL
  TO authenticated
  USING (auth.uid() IN (requester_id, receiver_id));

CREATE POLICY "Users can manage their messages"
  ON messages FOR ALL
  TO authenticated
  USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Anyone can read company pages"
  ON company_pages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage endorsements"
  ON endorsements FOR ALL
  TO authenticated
  USING (auth.uid() IN (user_id, endorsed_by_id));