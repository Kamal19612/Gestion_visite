package com.NativIA.GestionVisite.mapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.rendezVousRequest;
import com.NativIA.GestionVisite.DTO.Response.rendezVousResponse;
import com.NativIA.GestionVisite.Entities.RendezVous;
import com.NativIA.GestionVisite.Enum.TypeRDV;
import com.NativIA.GestionVisite.Enum.TypeStatus;

@Component
public class RendezVousMapper {

    public RendezVous toEntity(rendezVousRequest req) throws DateTimeParseException {
        if (req == null) {
            return null;
        }
        return RendezVous.builder()
                .date(LocalDate.parse(req.getDate()))
                .heure(LocalTime.parse(req.getHeure()))
                .motif(req.getMotif())
                .personneARencontrer(req.getPersonneARencontrer())
                .departement(req.getDepartement())
                .type(req.getType() != null ? TypeRDV.valueOf(req.getType().toUpperCase()) : null)
                .statut(req.getStatut() != null ? TypeStatus.valueOf(req.getStatut()) : TypeStatus.EN_ATTENTE)
                .code(req.getCode())
                .build();
    }

    public rendezVousResponse toResponse(RendezVous r) {
        if (r == null) {
            return null;
        }
        rendezVousResponse.rendezVousResponseBuilder respBuilder = rendezVousResponse.builder()
                .id(r.getIdRDV())
                .statut(r.getStatut() != null ? r.getStatut().name() : null)
                .code(r.getCode());

        if (r.getDate() != null) {
            respBuilder.date(r.getDate().toString());
        }
        if (r.getHeure() != null) {
            respBuilder.heure(r.getHeure().toString());
        }
        if (r.getType() != null) {
            respBuilder.type(r.getType().name());
        }
        if (r.getMotif() != null) {
            respBuilder.motif(r.getMotif());
        }
        if (r.getPersonneARencontrer() != null) {
            respBuilder.personneARencontrer(r.getPersonneARencontrer());
        }
        if (r.getDepartement() != null) {
            respBuilder.departement(r.getDepartement());
        }

        if (r.getVisite() != null) {
            respBuilder.visiteId(r.getVisite().getId());
        }
        if (r.getStatistique() != null) {
            respBuilder.statistiqueId(r.getStatistique().getId());
        }
        if (r.getSecretaire() != null) {
            respBuilder.secretaireId(r.getSecretaire().getId());
        }
        if (r.getSoumissionRDV() != null) {
            respBuilder.soumissionRDVId(r.getSoumissionRDV().getIdSoumission());
        }
        if (r.getVisiteur() != null) {
            respBuilder.visiteurId(r.getVisiteur().getId());
        }
        
        return respBuilder.build();
    }

    public void updateEntity(RendezVous target, rendezVousRequest req) throws DateTimeParseException {
        if (target == null || req == null) {
            return;
        }
        if (req.getDate() != null) {
            target.setDate(LocalDate.parse(req.getDate()));
        }
        if (req.getHeure() != null) {
            target.setHeure(LocalTime.parse(req.getHeure()));
        }
        if (req.getType() != null) {
            target.setType(TypeRDV.valueOf(req.getType().toUpperCase()));
        }
        if (req.getStatut() != null) {
            target.setStatut(TypeStatus.valueOf(req.getStatut()));
        }
        if (req.getCode() != null) {
            target.setCode(req.getCode());
        }
    }
}
