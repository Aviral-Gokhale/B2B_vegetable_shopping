/*
  # Add Contact Form Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `business` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `status` (text) - For tracking inquiry status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on contact_submissions table
    - Add policies for admin access
*/

CREATE TABLE contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for contact_submissions
CREATE POLICY "Admins can view all contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );

CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );