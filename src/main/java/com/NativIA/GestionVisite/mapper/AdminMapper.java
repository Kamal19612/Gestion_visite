package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.adminRequest;
import com.NativIA.GestionVisite.DTO.Response.adminResponse;
import com.NativIA.GestionVisite.Entities.Admin;

@Component
public class AdminMapper {

    public Admin toEntity(adminRequest req) {
        if (req == null) return null;
        Admin a = Admin.builder()
                .name(req.getFirstName() + " " + req.getLastName())
                .email(req.getEmail())
                .password(req.getPassword())
                .privileges(req.getPrivileges())
                .build();
        return a;
    }

    public adminResponse toResponse(Admin a) {
        if (a == null) return null;
        adminResponse r = new adminResponse();
        r.setId(a.getId());
        r.setName(a.getName());
        r.setEmail(a.getEmail());
        r.setPrivileges(a.getPrivileges());
        return r;
    }

    public void updateEntity(Admin target, adminRequest req) {
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
        if (req.getPrivileges() != null) target.setPrivileges(req.getPrivileges());
    }

}
