package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.employeRequest;
import com.NativIA.GestionVisite.DTO.Response.employeResponse;
import com.NativIA.GestionVisite.Entities.Employe;

@Component
public class EmployeMapper {

    public Employe toEntity(employeRequest req) {
        if (req == null) return null;
        Employe e = Employe.builder()
                .name(((req.getFirstName() != null ? req.getFirstName().trim() : "") + " " + (req.getLastName() != null ? req.getLastName().trim() : "")).trim())
                .email(req.getEmail())
                .password(req.getPassword())
                .secteurActivite(req.getSecteurActivite())
                .build();
        return e;
    }

    public employeResponse toResponse(Employe e) {
        if (e == null) return null;
        employeResponse r = new employeResponse();
        r.setId(e.getId());
        r.setName(e.getName());
        r.setEmail(e.getEmail());
        r.setSecteurActivite(e.getSecteurActivite());
        return r;
    }

    public void updateEntity(Employe target, employeRequest req) {
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
        if (req.getSecteurActivite() != null) target.setSecteurActivite(req.getSecteurActivite());
    }

}
