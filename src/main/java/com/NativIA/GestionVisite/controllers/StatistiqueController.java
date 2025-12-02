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

import com.NativIA.GestionVisite.DTO.Request.statistiqueRequest;
import com.NativIA.GestionVisite.DTO.Response.statistiqueResponse;
import com.NativIA.GestionVisite.Services.statistiqueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/statistiques")
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

    @GetMapping("/search")
    public ResponseEntity<statistiqueResponse> findByPeriode(@RequestParam String periode) {
        return ResponseEntity.ok(service.findByPeriode(periode));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
