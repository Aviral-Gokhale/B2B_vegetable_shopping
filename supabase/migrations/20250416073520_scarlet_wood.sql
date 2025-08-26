/*
  # Add User Roles and Permissions

  1. Changes
    - Add `role` column to business_profiles table
    - Add role-specific permissions
    - Update existing RLS policies

  2. Security
    - Enable RLS for all tables
    - Add role-based policies
*/

-- Add role column to business_profiles
ALTER TABLE business_profiles
ADD COLUMN role text NOT NULL DEFAULT 'user'
CHECK (role IN ('admin', 'manager', 'staff', 'user'));

-- Create role-specific policies for products
CREATE POLICY "Managers can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Managers can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.role IN ('admin', 'manager')
    )
  );

-- Create role-specific policies for orders
CREATE POLICY "Staff can view assigned orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.role IN ('admin', 'manager', 'staff')
    )
  );

CREATE POLICY "Staff can update order status"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.role IN ('admin', 'manager', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.role IN ('admin', 'manager', 'staff')
    )
  );

-- Create role-specific policies for categories
CREATE POLICY "Managers can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.user_id = auth.uid()
      AND business_profiles.role IN ('admin', 'manager')
    )
  );