package com.NativIA.GestionVisite.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.NativIA.GestionVisite.DTO.Request.visiteRequest;
import com.NativIA.GestionVisite.DTO.Response.visiteResponse;
import com.NativIA.GestionVisite.Services.visiteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/visites")
@Tag(name = "Visites", description = "Gestion des visites de visiteurs")
public class VisiteController {

    private final visiteService service;

    public VisiteController(visiteService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "Créer une nouvelle visite", description = "Crée une nouvelle visite avec les informations du visiteur")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Visite créée avec succès"),
        @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public ResponseEntity<visiteResponse> create(@Valid @RequestBody visiteRequest req) {
        visiteResponse res = service.create(req);
        if (res != null && res.getId() != null) {
            return ResponseEntity.created(java.net.URI.create("/api/v1/visites/" + res.getId())).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/{id}/checkin")
    @Operation(summary = "Check-in d'une visite", description = "Enregistre l'heure d'entrée d'une visite")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Check-in effectué avec succès"),
        @ApiResponse(responseCode = "404", description = "Visite non trouvée")
    })
    public ResponseEntity<visiteResponse> checkIn(@PathVariable Long id) {
        visiteResponse res = service.checkIn(id);
        if (res == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @PostMapping("/{id}/checkout")
    @Operation(summary = "Check-out d'une visite", description = "Enregistre l'heure de sortie d'une visite")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Check-out effectué avec succès"),
        @ApiResponse(responseCode = "404", description = "Visite non trouvée")
    })
    public ResponseEntity<visiteResponse> checkOut(@PathVariable Long id) {
        visiteResponse res = service.checkOut(id);
        if (res == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<visiteResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<visiteResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<visiteResponse>> findByStatut(@RequestParam String statut) {
        return ResponseEntity.ok(service.findByStatut(statut));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
