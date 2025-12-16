package com.NativIA.GestionVisite.controllers;

import com.NativIA.GestionVisite.DAO.visiteRepository;
import com.NativIA.GestionVisite.Entities.Visite;
import com.NativIA.GestionVisite.Services.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
@Tag(name = "Rapports", description = "Génération et export de rapports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private visiteRepository visiteRepository;

    @GetMapping({"/visites/export", "/export"})
    @PreAuthorize("hasAnyRole('ADMIN','SECRETAIRE')")
    @Operation(summary = "Exporter les visites en rapport", description = "Génère un rapport des visites au format PDF ou Excel")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Rapport généré avec succès"),
            @ApiResponse(responseCode = "400", description = "Paramètres invalides"),
            @ApiResponse(responseCode = "403", description = "Accès refusé - Admin ou Secrétaire requis")
    })
    public ResponseEntity<InputStreamResource> exportVisites(
            @RequestParam(value = "format", defaultValue = "pdf") String format,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {

        List<Visite> visites;
        if (from != null && to != null) {
            try {
                LocalDateTime start = LocalDateTime.parse(from);
                LocalDateTime end = LocalDateTime.parse(to);
                visites = visiteRepository.findByDateBetween(start, end);
            } catch (DateTimeParseException ex) {
                return ResponseEntity.badRequest().build();
            }
        } else {
            visites = visiteRepository.findAll();
        }

        ByteArrayInputStream bis;
        String filename;
        String contentType;

        if ("excel".equalsIgnoreCase(format) || "xlsx".equalsIgnoreCase(format)) {
            bis = reportService.generateVisitesExcelReport(visites);
            filename = "visites.xlsx";
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        } else {
            bis = reportService.generateVisitesPdfReport(visites);
            filename = "visites.pdf";
            contentType = "application/pdf";
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType(contentType))
                .body(new InputStreamResource(bis));
    }

}
