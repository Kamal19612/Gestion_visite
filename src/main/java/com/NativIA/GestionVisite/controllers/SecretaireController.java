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

import com.NativIA.GestionVisite.DTO.Request.secretaireRequest;
import com.NativIA.GestionVisite.DTO.Response.secretaireResponse;
import com.NativIA.GestionVisite.Services.secretaireService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/secretaires")
public class SecretaireController {

    private final secretaireService service;

    public SecretaireController(secretaireService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<secretaireResponse> create(@Valid @RequestBody secretaireRequest req) {
        secretaireResponse res = service.create(req);
        if (res != null && res.getId() != null) {
            return ResponseEntity.created(java.net.URI.create("/api/v1/secretaires/" + res.getId())).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<secretaireResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<secretaireResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<secretaireResponse>> findByDepartement(@RequestParam String departement) {
        return ResponseEntity.ok(service.findByDepartement(departement));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
