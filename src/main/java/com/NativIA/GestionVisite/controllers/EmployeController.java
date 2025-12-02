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

import com.NativIA.GestionVisite.DTO.Request.employeRequest;
import com.NativIA.GestionVisite.DTO.Response.employeResponse;
import com.NativIA.GestionVisite.Services.employeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/employes")
public class EmployeController {

    private final employeService service;

    public EmployeController(employeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<employeResponse> create(@Valid @RequestBody employeRequest req) {
        employeResponse res = service.create(req);
        if (res != null && res.getId() != null) {
            return ResponseEntity.created(java.net.URI.create("/api/v1/employes/" + res.getId())).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<employeResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<employeResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<employeResponse>> findBySecteur(@RequestParam String secteur) {
        return ResponseEntity.ok(service.findBySecteur(secteur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
