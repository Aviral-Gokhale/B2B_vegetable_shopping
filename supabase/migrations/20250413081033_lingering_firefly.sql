/*
  # Add Admin Role to Business Profiles

  1. Changes
    - Add `is_admin` column to business_profiles table
    - Add default value of false
    - Update RLS policies to restrict admin access
*/

ALTER TABLE business_profiles
ADD COLUMN is_admin boolean DEFAULT false;

-- Create policy for admin access
CREATE POLICY "Admins can view all business profiles"
  ON business_profiles
  FOR SELECT
  TO authenticated
  USING (is_admin = true);

CREATE POLICY "Admins can update all business profiles"
  ON business_profiles
  FOR UPDATE
  TO authenticated
  USING (is_admin = true)
  WITH CHECK (is_admin = true);

-- Update products policies for admin access
CREATE POLICY "Admins can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );

-- Update categories policies for admin access
CREATE POLICY "Admins can insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );

-- Update orders policies for admin access
CREATE POLICY "Admins can view all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update all orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.is_admin = true
    )
  );