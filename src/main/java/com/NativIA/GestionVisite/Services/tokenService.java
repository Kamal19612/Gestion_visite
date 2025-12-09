package com.NativIA.GestionVisite.Services;

import com.NativIA.GestionVisite.Entities.User;

public interface tokenService {
    String createTokenForUser(User user);
    User findUserByToken(String token);
}
