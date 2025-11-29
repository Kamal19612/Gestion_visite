package com.NativIA.GestionVisite.mapper;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.soumissionRequest;
import com.NativIA.GestionVisite.DTO.Response.soumissionResponse;
import com.NativIA.GestionVisite.Entities.SoumissionRDV;

@Component
public class SoumissionMapper {

    public SoumissionRDV toEntity(soumissionRequest req) {
        if (req == null) return null;
        SoumissionRDV s = SoumissionRDV.builder()
                .nom(req.getNom())
                .prenom(req.getPrenom())
                .departement(req.getDepartement())
                .email(req.getEmail())
                .telephone(req.getTelephone())
                .entreprise(req.getEntreprise())
                .motif(req.getMotif())
                .statut("En attente")
                .build();
        try {
            if (req.getDateRendezVous() != null) s.setDateRendezVous(LocalDate.parse(req.getDateRendezVous()));
        } catch (Exception e) { }
        try {
            if (req.getHeureRendezVous() != null) s.setHeureRendezVous(LocalTime.parse(req.getHeureRendezVous()));
        } catch (Exception e) { }
        return s;
    }

    public soumissionResponse toResponse(SoumissionRDV s) {
        if (s == null) return null;
        soumissionResponse r = soumissionResponse.builder()
                .nom(s.getNom())
                .prenom(s.getPrenom())
                .departement(s.getDepartement())
                .email(s.getEmail())
                .telephone(s.getTelephone())
                .entreprise(s.getEntreprise())
                .motif(s.getMotif())
                .statut(s.getStatut())
                .build();
        if (s.getDateRendezVous() != null) r.setDateRendezVous(s.getDateRendezVous().toString());
        if (s.getHeureRendezVous() != null) r.setHeureRendezVous(s.getHeureRendezVous().toString());
        return r;
    }

    public void updateEntity(SoumissionRDV target, soumissionRequest req) {
        if (target == null || req == null) return;
        if (req.getNom() != null) target.setNom(req.getNom());
        if (req.getPrenom() != null) target.setPrenom(req.getPrenom());
        if (req.getDepartement() != null) target.setDepartement(req.getDepartement());
        if (req.getEmail() != null) target.setEmail(req.getEmail());
        if (req.getTelephone() != null) target.setTelephone(req.getTelephone());
        if (req.getEntreprise() != null) target.setEntreprise(req.getEntreprise());
        if (req.getMotif() != null) target.setMotif(req.getMotif());
        try { if (req.getDateRendezVous() != null) target.setDateRendezVous(LocalDate.parse(req.getDateRendezVous())); } catch (Exception e) {}
        try { if (req.getHeureRendezVous() != null) target.setHeureRendezVous(LocalTime.parse(req.getHeureRendezVous())); } catch (Exception e) {}
    }

}
