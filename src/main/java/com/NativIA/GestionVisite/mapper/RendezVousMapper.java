package com.NativIA.GestionVisite.mapper;

import com.NativIA.GestionVisite.DTO.Request.rendezVousRequest;
import com.NativIA.GestionVisite.DTO.Response.rendezVousResponse;
import com.NativIA.GestionVisite.Entities.RendezVous;
import com.NativIA.GestionVisite.Enum.TypeRDV;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

@Component
public class RendezVousMapper {

    public RendezVous toEntity(rendezVousRequest req) throws DateTimeParseException {
        if (req == null) {
            return null;
        }
        return RendezVous.builder()
                .date(LocalDate.parse(req.getDate()))
                .heure(LocalTime.parse(req.getHeure()))
                .type(req.getType() != null ? TypeRDV.valueOf(req.getType().toUpperCase()) : null)
                .statut(req.getStatut())
                .code(req.getCode())
                .build();
    }

    public rendezVousResponse toResponse(RendezVous r) {
        if (r == null) {
            return null;
        }
        rendezVousResponse.rendezVousResponseBuilder respBuilder = rendezVousResponse.builder()
                .id(r.getIdRDV())
                .statut(r.getStatut())
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
            target.setStatut(req.getStatut());
        }
        if (req.getCode() != null) {
            target.setCode(req.getCode());
        }
    }
}
