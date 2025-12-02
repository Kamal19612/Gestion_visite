package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.ASRequest;
import com.NativIA.GestionVisite.DTO.Response.ASResponse;
import com.NativIA.GestionVisite.Entities.AgentSecurite;

@Component
public class AgentSecuriteMapper {

    public AgentSecurite toEntity(ASRequest req) {
        if (req == null) return null;
        AgentSecurite a = AgentSecurite.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword())
                .matricule(req.getMatricule())
                .build();
        return a;
    }

    public ASResponse toResponse(AgentSecurite a) {
        if (a == null) return null;
        ASResponse r = new ASResponse();
        r.setId(a.getIdUser());
        r.setName(a.getName());
        r.setEmail(a.getEmail());
        r.setMatricule(a.getMatricule());
        return r;
    }

    public void updateEntity(AgentSecurite target, ASRequest req) {
        if (target == null || req == null) return;
        if (req.getName() != null) target.setName(req.getName());
        if (req.getEmail() != null) target.setEmail(req.getEmail());
        if (req.getPassword() != null) target.setPassword(req.getPassword());
        if (req.getMatricule() != null) target.setMatricule(req.getMatricule());
    }

}
