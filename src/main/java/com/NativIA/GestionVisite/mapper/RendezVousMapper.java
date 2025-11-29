package com.NativIA.GestionVisite.mapper;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.RDVRequest;
import com.NativIA.GestionVisite.DTO.Response.RDVResponse;
import com.NativIA.GestionVisite.Entities.RendezVous;

@Component
public class RendezVousMapper {

    public RendezVous toEntity(RDVRequest req) {
        if (req == null) return null;
        RendezVous r = RendezVous.builder().build();
        try { if (req.getDate() != null) r.setDate(LocalDate.parse(req.getDate())); } catch (Exception e) {}
        try { if (req.getHeure() != null) r.setHeure(LocalTime.parse(req.getHeure())); } catch (Exception e) {}
        return r;
    }

    public RDVResponse toResponse(RendezVous r) {
        if (r == null) return null;
        RDVResponse resp = RDVResponse.builder().build();
        if (r.getDate() != null) resp.setDate(r.getDate().toString());
        if (r.getHeure() != null) resp.setHeure(r.getHeure().toString());
        return resp;
    }

    public void updateEntity(RendezVous target, RDVRequest req) {
        if (target == null || req == null) return;
        try { if (req.getDate() != null) target.setDate(LocalDate.parse(req.getDate())); } catch (Exception e) {}
        try { if (req.getHeure() != null) target.setHeure(LocalTime.parse(req.getHeure())); } catch (Exception e) {}
    }

}
