/*
  # Add Payment Method to Orders

  1. Changes
    - Add `payment_method` column to orders table
    - Set default value to 'cod'
    - Add check constraint for valid payment methods
*/

ALTER TABLE orders
ADD COLUMN payment_method text NOT NULL DEFAULT 'cod'
CHECK (payment_method IN ('cod', 'razorpay'));