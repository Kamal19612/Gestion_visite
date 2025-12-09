package com.NativIA.GestionVisite.Services.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NativIA.GestionVisite.DAO.tokenRepository;
import com.NativIA.GestionVisite.Entities.Token;
import com.NativIA.GestionVisite.Entities.User;
import com.NativIA.GestionVisite.Services.tokenService;

@Service
public class TokenServiceImpl implements tokenService {

    @Autowired
    private tokenRepository tokenRepository;

    @Override
    public String createTokenForUser(User user) {
        String tokenValue = UUID.randomUUID().toString();
        Token t = new Token(tokenValue, user);
        tokenRepository.save(t);
        return tokenValue;
    }

    @Override
    public User findUserByToken(String token) {
        return tokenRepository.findByToken(token).map(Token::getUser).orElse(null);
    }
}
