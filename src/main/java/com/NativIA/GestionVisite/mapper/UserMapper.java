package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.DTO.Response.userResponse;
import com.NativIA.GestionVisite.Entities.User;

@Component
public class UserMapper {

    public User toEntity(userRequest req) {
        if (req == null) return null;
        String fullName = (req.getFirstName() != null ? req.getFirstName().trim() : "") + " " + 
                         (req.getLastName() != null ? req.getLastName().trim() : "");
        User u = User.builder()
                .name(fullName.trim())
                .email(req.getEmail())
                .password(req.getPassword())
                .role(req.getRole())
                .phoneNumber(req.getWhatsapp())
                .build();
        return u;
    }

    public userResponse toResponse(User u) {
        if (u == null) return null;
        return userResponse.builder()
                .id(u.getId())
                .name(u.getName())
                .email(u.getEmail())
                .role(u.getRole())
                .build();
    }

    public void updateEntity(User target, userRequest req) {
        if (target == null || req == null) return;
        if (req.getFirstName() != null || req.getLastName() != null) {
            String fullName = (req.getFirstName() != null ? req.getFirstName().trim() : "") + " " + 
                             (req.getLastName() != null ? req.getLastName().trim() : "");
            target.setName(fullName.trim());
        }
        if (req.getEmail() != null) target.setEmail(req.getEmail());
        if (req.getPassword() != null) target.setPassword(req.getPassword());
        if (req.getRole() != null) target.setRole(req.getRole());
        if (req.getWhatsapp() != null) target.setPhoneNumber(req.getWhatsapp());
    }

}
