/*
  # Add Business Profiles Table

  1. New Tables
    - `business_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `business_name` (text, unique)
      - `owner_name` (text)
      - `owner_mobile` (text)
      - `manager_mobile` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on business_profiles table
    - Add policies for authenticated users
*/

CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text UNIQUE NOT NULL,
  owner_name text NOT NULL,
  owner_mobile text NOT NULL,
  manager_mobile text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT business_profiles_user_id_key UNIQUE (user_id)
);

ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for business_profiles
CREATE POLICY "Users can view their own business profile"
  ON business_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own business profile"
  ON business_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own business profile"
  ON business_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);