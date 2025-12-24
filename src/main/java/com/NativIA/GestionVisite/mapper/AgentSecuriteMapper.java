package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.agentSecuriteRequest;
import com.NativIA.GestionVisite.DTO.Response.agentSecuriteResponse;
import com.NativIA.GestionVisite.Entities.AgentSecurite;

@Component
public class AgentSecuriteMapper {

    public AgentSecurite toEntity(agentSecuriteRequest req) {
        if (req == null) return null;
        AgentSecurite a = AgentSecurite.builder()
                .name(req.getFirstName() + " " + req.getLastName())
                .email(req.getEmail())
                .password(req.getPassword())
                .matricule(req.getMatricule())
                .build();
        return a;
    }

    public agentSecuriteResponse toResponse(AgentSecurite a) {
        if (a == null) return null;
        agentSecuriteResponse r = new agentSecuriteResponse();
        r.setId(a.getId());
        r.setName(a.getName());
        r.setEmail(a.getEmail());
        r.setMatricule(a.getMatricule());
        return r;
    }

    public void updateEntity(AgentSecurite target, agentSecuriteRequest req) {
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
        if (req.getMatricule() != null) target.setMatricule(req.getMatricule());
    }

}
