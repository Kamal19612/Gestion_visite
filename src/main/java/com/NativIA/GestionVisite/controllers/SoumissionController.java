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

import com.NativIA.GestionVisite.DTO.Request.soumissionRequest;
import com.NativIA.GestionVisite.DTO.Response.soumissionResponse;
import com.NativIA.GestionVisite.Services.soumissionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/soumissions")
public class SoumissionController {

    private final soumissionService service;

    public SoumissionController(soumissionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<soumissionResponse> create(@Valid @RequestBody soumissionRequest req) {
        soumissionResponse res = service.create(req);
        if (res != null && res.getId() != null) {
            return ResponseEntity.created(java.net.URI.create("/api/v1/soumissions/" + res.getId())).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<soumissionResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<soumissionResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<soumissionResponse>> findByStatut(@RequestParam String statut) {
        return ResponseEntity.ok(service.findByStatut(statut));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
