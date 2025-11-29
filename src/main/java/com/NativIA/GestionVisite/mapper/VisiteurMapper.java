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
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword())
                .entreprise(req.getEntreprise())
                .scanDoc(req.getScanDoc())
                .build();
        return v;
    }

    public visiteurResponse toResponse(Visiteur v) {
        if (v == null) return null;
        visiteurResponse r = new visiteurResponse();
        r.setName(v.getName());
        r.setEmail(v.getEmail());
        r.setEntreprise(v.getEntreprise());
        r.setScanDoc(v.getScanDoc());
        return r;
    }

    public void updateEntity(Visiteur target, visiteurRequest req) {
        if (target == null || req == null) return;
        if (req.getName() != null) target.setName(req.getName());
        if (req.getEmail() != null) target.setEmail(req.getEmail());
        if (req.getPassword() != null) target.setPassword(req.getPassword());
        if (req.getEntreprise() != null) target.setEntreprise(req.getEntreprise());
        if (req.getScanDoc() != null) target.setScanDoc(req.getScanDoc());
    }

}
