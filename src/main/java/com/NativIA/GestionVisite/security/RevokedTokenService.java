package com.NativIA.GestionVisite.security;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class RevokedTokenService {
    private final Map<String, Long> revoked = new ConcurrentHashMap<>();

    public void revoke(String token, long expiryMillis) {
        revoked.put(token, expiryMillis);
    }

    public boolean isRevoked(String token) {
        Long exp = revoked.get(token);
        if (exp == null) return false;
        if (System.currentTimeMillis() > exp) { // cleanup expired
            revoked.remove(token);
            return false;
        }
        return true;
    }

}
