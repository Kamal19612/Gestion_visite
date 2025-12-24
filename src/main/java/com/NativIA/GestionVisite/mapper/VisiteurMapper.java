package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.visiteurRequest;
import com.NativIA.GestionVisite.DTO.Response.visiteurResponse;
import com.NativIA.GestionVisite.Entities.Visiteur;

@Component
public class VisiteurMapper {

    public Visiteur toEntity(visiteurRequest req) {
        if (req == null) return null;
        Visiteur v = Visiteur.builder()
                .name(((req.getFirstName() != null ? req.getFirstName().trim() : "") + " " + (req.getLastName() != null ? req.getLastName().trim() : "")).trim())
                .email(req.getEmail())
                .password(req.getPassword())
                .entreprise(req.getEntreprise())
                .scanDocumentPath(req.getScanDocumentPath())
                .signaturePath(req.getSignaturePath())
                .build();
        return v;
    }

    public visiteurResponse toResponse(Visiteur v) {
        if (v == null) return null;
        visiteurResponse r = new visiteurResponse();
        r.setId(v.getId());
        r.setName(v.getName());
        r.setEmail(v.getEmail());
        r.setEntreprise(v.getEntreprise());
        r.setScanDocumentPath(v.getScanDocumentPath());
        r.setSignaturePath(v.getSignaturePath());
        return r;
    }

    public void updateEntity(Visiteur target, visiteurRequest req) {
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
        if (req.getEntreprise() != null) target.setEntreprise(req.getEntreprise());
        if (req.getScanDocumentPath() != null) target.setScanDocumentPath(req.getScanDocumentPath());
        if (req.getSignaturePath() != null) target.setSignaturePath(req.getSignaturePath());
    }

}
