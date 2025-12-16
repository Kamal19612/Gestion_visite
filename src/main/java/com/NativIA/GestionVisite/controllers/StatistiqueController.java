package com.NativIA.GestionVisite.controllers;

import com.NativIA.GestionVisite.DTO.Request.statistiqueRequest;
import com.NativIA.GestionVisite.DTO.Response.StatsByDepartementResponse;
import com.NativIA.GestionVisite.DTO.Response.StatsByEmployeResponse;
import com.NativIA.GestionVisite.DTO.Response.statistiqueResponse;
import com.NativIA.GestionVisite.Services.statistiqueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/statistiques")
@Tag(name = "Statistiques", description = "Gestion et consultation des statistiques")
public class StatistiqueController {

    private final statistiqueService service;

    public StatistiqueController(statistiqueService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<statistiqueResponse> create(@Valid @RequestBody statistiqueRequest req) {
        statistiqueResponse res = service.create(req);
        if (res != null && res.getId() != null) {
            return ResponseEntity.created(java.net.URI.create("/api/v1/statistiques/" + res.getId())).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<statistiqueResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<statistiqueResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/par-periode")
    @Operation(summary = "Statistiques par période", description = "Récupère les statistiques des visites pour une période donnée")
    @ApiResponse(responseCode = "200", description = "Statistiques par période récupérées")
    public ResponseEntity<List<statistiqueResponse>> getStatsByPeriode(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(service.getStatsByPeriode(from, to));
    }

    @GetMapping("/par-departement")
    @Operation(summary = "Statistiques par département", description = "Récupère les statistiques aggrégées par département")
    @ApiResponse(responseCode = "200", description = "Statistiques par département récupérées")
    public ResponseEntity<List<StatsByDepartementResponse>> getStatsByDepartement() {
        return ResponseEntity.ok(service.getStatsByDepartement());
    }

    @GetMapping("/par-employe")
    @Operation(summary = "Statistiques par employé", description = "Récupère les statistiques aggrégées par employé")
    @ApiResponse(responseCode = "200", description = "Statistiques par employé récupérées")
    public ResponseEntity<List<StatsByEmployeResponse>> getStatsByEmploye() {
        return ResponseEntity.ok(service.getStatsByEmploye());
    }
}
