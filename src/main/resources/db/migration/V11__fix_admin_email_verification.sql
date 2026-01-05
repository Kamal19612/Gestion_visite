-- V11__fix_admin_email_verification.sql
-- Fix: Ensure all admin users have email_verified = true
-- This is required because admins created via API endpoint or the default admin
-- should be able to login without requiring email verification

UPDATE users 
SET email_verified = true, failed_login_attempts = 0 
WHERE role = 'ADMIN';

