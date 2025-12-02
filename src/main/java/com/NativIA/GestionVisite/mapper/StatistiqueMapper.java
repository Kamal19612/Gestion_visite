package com.NativIA.GestionVisite.mapper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.statistiqueRequest;
import com.NativIA.GestionVisite.DTO.Response.statistiqueResponse;
import com.NativIA.GestionVisite.Entities.Statistique;

@Component
public class StatistiqueMapper {

    public Statistique toEntity(statistiqueRequest req) {
        if (req == null) return null;
        Statistique s = Statistique.builder()
                .nombreVisites(req.getNombreVisites())
                .nombreRDV(req.getNombreRDV())
                .nombreSoumissions(req.getNombreSoumissions())
                .build();
        try {
            if (req.getPeriode() != null) {
                DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                s.setPeriode(LocalDate.parse(req.getPeriode(), fmt));
            }
        } catch (Exception e) {}
        return s;
    }

    public statistiqueResponse toResponse(Statistique s) {
        if (s == null) return null;
        statistiqueResponse r = new statistiqueResponse();
        try {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            r.setPeriode(s.getPeriode() != null ? s.getPeriode().format(fmt) : null);
        } catch (Exception e) { r.setPeriode(s.getPeriode() != null ? s.getPeriode().toString() : null); }
        r.setNombreVisites(s.getNombreVisites());
        r.setNombreRDV(s.getNombreRDV());
        r.setNombreSoumissions(s.getNombreSoumissions());
        r.setDureeMoyenneMinutes(s.getDureeMoyenneMinutes());
        return r;
    }

    public void updateEntity(Statistique target, statistiqueRequest req) {
        if (target == null || req == null) return;
        if (req.getNombreVisites() >= 0) target.setNombreVisites(req.getNombreVisites());
        if (req.getNombreRDV() >= 0) target.setNombreRDV(req.getNombreRDV());
        if (req.getNombreSoumissions() >= 0) target.setNombreSoumissions(req.getNombreSoumissions());
        if (req.getDureeMoyenneMinutes() != null) target.setDureeMoyenneMinutes(req.getDureeMoyenneMinutes());
        try {
            if (req.getPeriode() != null) {
                DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                target.setPeriode(LocalDate.parse(req.getPeriode(), fmt));
            }
        } catch (Exception e) {}
    }

}
