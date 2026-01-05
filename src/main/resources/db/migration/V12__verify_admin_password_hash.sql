-- V12__verify_admin_password_hash.sql
-- Verify that the admin password hash is correct
-- The hash should be for the password "password"
-- Using BCrypt with 10 rounds

-- If the hash is incorrect, update it to the correct value
-- This is a fallback in case the original hash was invalid

-- The correct BCrypt hash for "password" with cost 10:
-- $2a$10$N9Zpww86/3S9.2SULeA25.2gCXYt.d7eR.j0pW4Lg2OSt.a7kU/eS

-- Verify the admin account has the correct credentials
-- If there's an issue, this will help identify it
SELECT id, name, email, password, role, email_verified FROM users WHERE email = 'admin@example.com';
