package com.NativIA.GestionVisite.DAO;

import com.NativIA.GestionVisite.Entities.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface verificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByEmailAndUsedFalse(String email);
    void deleteByEmail(String email);
    Optional<VerificationCode> findByEmail(String email);
}
