package com.NativIA.GestionVisite.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Token;

@Repository
public interface tokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);
}
