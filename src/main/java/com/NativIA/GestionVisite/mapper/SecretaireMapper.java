package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.secretaireRequest;
import com.NativIA.GestionVisite.DTO.Response.secretaireResponse;
import com.NativIA.GestionVisite.Entities.Secretaire;

@Component
public class SecretaireMapper {

    public Secretaire toEntity(secretaireRequest req) {
        if (req == null) return null;
        Secretaire s = Secretaire.builder()
                .name(((req.getFirstName() != null ? req.getFirstName().trim() : "") + " " + (req.getLastName() != null ? req.getLastName().trim() : "")).trim())
                .email(req.getEmail())
                .password(req.getPassword())
                .departement(req.getDepartement())
                .build();
        return s;
    }

    public secretaireResponse toResponse(Secretaire s) {
        if (s == null) return null;
        secretaireResponse r = new secretaireResponse();
        r.setId(s.getId());
        r.setName(s.getName());
        r.setEmail(s.getEmail());
        r.setDepartement(s.getDepartement());
        return r;
    }

    public void updateEntity(Secretaire target, secretaireRequest req) {
        if (target == null || req == null) return;
        if (req.getFirstName() != null || req.getLastName() != null) {
            String existing = target.getName() != null ? target.getName() : "";
            String[] parts = existing.split(" ", 2);
            String existingFirst = parts.length > 0 ? parts[0] : "";
            String existingLast = parts.length > 1 ? parts[1] : "";
            String newFirst = req.getFirstName() != null ? req.getFirstName().trim() : existingFirst;
            String newLast = req.getLastName() != null ? req.getLastName().trim() : existingLast;
            target.setName((newFirst + " " + newLast).trim());
        }
        if (req.getEmail() != null) target.setEmail(req.getEmail());
        if (req.getPassword() != null) target.setPassword(req.getPassword());
        if (req.getDepartement() != null) target.setDepartement(req.getDepartement());
    }

}
