package com.NativIA.GestionVisite.Services;

public interface VerificationCodeService {
    /**
     * Generate a verification code for user email confirmation
     * @param email user email
     * @return generated verification code
     */
    String generateVerificationCode(String email);

    /**
     * Validate a verification code
     * @param email user email
     * @param code verification code to validate
     * @return true if code is valid and not expired
     */
    boolean validateVerificationCode(String email, String code);

    /**
     * Mark email as verified for a user
     * @param email user email
     */
    void markEmailAsVerified(String email);

    /**
     * Check if email is already verified
     * @param email user email
     * @return true if email is verified
     */
    boolean isEmailVerified(String email);

    /**
     * Delete verification code after use
     * @param email user email
     */
    void deleteVerificationCode(String email);
}
