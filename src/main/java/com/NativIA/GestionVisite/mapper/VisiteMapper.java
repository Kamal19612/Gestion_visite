package com.NativIA.GestionVisite.mapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.visiteRequest;
import com.NativIA.GestionVisite.DTO.Response.visiteResponse;
import com.NativIA.GestionVisite.Entities.Visite;

@Component
public class VisiteMapper {

    public Visite toEntity(visiteRequest req) {
        if (req == null) return null;
        Visite v = Visite.builder()
                .motif(req.getMotif())
                .build();
        try {
            if (req.getDate() != null) v.setDate(LocalDateTime.parse(req.getDate()));
        } catch (DateTimeParseException e) { }
        try {
            if (req.getHEntree() != null) v.setHEntree(LocalDateTime.parse(req.getHEntree()));
        } catch (DateTimeParseException e) { }
        try {
            if (req.getHSortie() != null) v.setHSortie(LocalDateTime.parse(req.getHSortie()));
        } catch (DateTimeParseException e) { }
        // statut is managed server-side; not parsed from request
        return v;
    }

    public visiteResponse toResponse(Visite v) {
        if (v == null) return null;
        visiteResponse r = visiteResponse.builder()
                .motif(v.getMotif())
                .build();
        if (v.getDate() != null) r.setDate(v.getDate().toString());
        if (v.getHEntree() != null) r.setHEntree(v.getHEntree().toString());
        if (v.getHSortie() != null) r.setHSortie(v.getHSortie().toString());
        if (v.getStatut() != null) r.setStatut(v.getStatut().name());
        return r;
    }

    public void updateEntity(Visite target, visiteRequest req) {
        if (target == null || req == null) return;
        if (req.getMotif() != null) target.setMotif(req.getMotif());
        try { if (req.getDate() != null) target.setDate(LocalDateTime.parse(req.getDate())); } catch (Exception e) {}
        try { if (req.getHEntree() != null) target.setHEntree(LocalDateTime.parse(req.getHEntree())); } catch (Exception e) {}
        try { if (req.getHSortie() != null) target.setHSortie(LocalDateTime.parse(req.getHSortie())); } catch (Exception e) {}
        // statut update not supported from visiteRequest
    }

}
