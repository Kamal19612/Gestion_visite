package com.NativIA.GestionVisite.Services.impl;

import com.NativIA.GestionVisite.DAO.verificationCodeRepository;
import com.NativIA.GestionVisite.Entities.VerificationCode;
import com.NativIA.GestionVisite.Services.VerificationCodeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@Slf4j
public class VerificationCodeServiceImpl implements VerificationCodeService {

    @Autowired
    private verificationCodeRepository verificationCodeRepository;

    private static final int CODE_EXPIRY_MINUTES = 10; // Codes expire after 10 minutes
    private static final int CODE_LENGTH = 6;

    @Override
    public String generateVerificationCode(String email) {
        try {
            // Delete any existing unused codes
            verificationCodeRepository.deleteByEmail(email);

            // Generate random 6-digit code
            String code = generateRandomCode();

            // Create new verification code entity
            VerificationCode verificationCode = VerificationCode.builder()
                    .email(email)
                    .code(code)
                    .expiryTime(LocalDateTime.now().plusMinutes(CODE_EXPIRY_MINUTES))
                    .used(false)
                    .build();

            verificationCodeRepository.save(verificationCode);
            log.info("Verification code generated for email: {}", email);

            return code;
        } catch (Exception e) {
            log.error("Error generating verification code for email: {}", email, e);
            throw new RuntimeException("Error generating verification code: " + e.getMessage());
        }
    }

    @Override
    public boolean validateVerificationCode(String email, String code) {
        try {
            var verificationCode = verificationCodeRepository.findByEmailAndUsedFalse(email);

            if (verificationCode.isEmpty()) {
                log.warn("No valid verification code found for email: {}", email);
                return false;
            }

            VerificationCode vc = verificationCode.get();

            // Check if code matches
            if (!vc.getCode().equals(code)) {
                log.warn("Invalid verification code provided for email: {}", email);
                return false;
            }

            // Check if code expired
            if (LocalDateTime.now().isAfter(vc.getExpiryTime())) {
                log.warn("Verification code expired for email: {}", email);
                return false;
            }

            // Mark code as used
            vc.setUsed(true);
            vc.setUsedAt(LocalDateTime.now());
            verificationCodeRepository.save(vc);

            log.info("Verification code validated for email: {}", email);
            return true;

        } catch (Exception e) {
            log.error("Error validating verification code for email: {}", email, e);
            return false;
        }
    }

    @Override
    public void markEmailAsVerified(String email) {
        try {
            var verificationCode = verificationCodeRepository.findByEmail(email);
            if (verificationCode.isPresent()) {
                verificationCodeRepository.delete(verificationCode.get());
                log.info("Email verified and code deleted for: {}", email);
            }
        } catch (Exception e) {
            log.error("Error marking email as verified: {}", email, e);
        }
    }

    @Override
    public boolean isEmailVerified(String email) {
        try {
            var verificationCode = verificationCodeRepository.findByEmail(email);
            // If no code exists, or if the existing code is marked as used, email is verified
            return verificationCode.isEmpty() || verificationCode.get().getUsed();
        } catch (Exception e) {
            log.error("Error checking email verification status: {}", email, e);
            return false;
        }
    }

    @Override
    public void deleteVerificationCode(String email) {
        try {
            verificationCodeRepository.deleteByEmail(email);
            log.info("Verification code deleted for email: {}", email);
        } catch (Exception e) {
            log.error("Error deleting verification code for email: {}", email, e);
        }
    }

    private String generateRandomCode() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(random.nextInt(10));
        }
        return code.toString();
    }
}
