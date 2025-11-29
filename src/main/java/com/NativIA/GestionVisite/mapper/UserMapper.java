package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.DTO.Response.userResponse;
import com.NativIA.GestionVisite.Entities.User;

@Component
public class UserMapper {

    public User toEntity(userRequest req) {
        if (req == null) return null;
        User u = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword())
                .build();
        return u;
    }

    public userResponse toResponse(User u) {
        if (u == null) return null;
        return userResponse.builder()
                .name(u.getName())
                .email(u.getEmail())
                .build();
    }

    public void updateEntity(User target, userRequest req) {
        if (target == null || req == null) return;
        if (req.getName() != null) target.setName(req.getName());
        if (req.getEmail() != null) target.setEmail(req.getEmail());
        if (req.getPassword() != null) target.setPassword(req.getPassword());
    }

}
