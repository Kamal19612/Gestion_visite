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

import com.NativIA.GestionVisite.DTO.Request.agentSecuriteRequest;
import com.NativIA.GestionVisite.DTO.Response.agentSecuriteResponse;
import com.NativIA.GestionVisite.Services.agentSecuriteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/agents")
public class AgentSecuriteController {

    private final agentSecuriteService service;

    public AgentSecuriteController(agentSecuriteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<agentSecuriteResponse> create(@Valid @RequestBody agentSecuriteRequest req) {
        agentSecuriteResponse res = service.create(req);
        if (res != null && res.getId() != null) {
            return ResponseEntity.created(java.net.URI.create("/api/v1/agents/" + res.getId())).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<agentSecuriteResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<agentSecuriteResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<agentSecuriteResponse> findByMatricule(@RequestParam String matricule) {
        return ResponseEntity.ok(service.findByMatricule(matricule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // les fonctions qui ont ete implémenter sont au nombre de 5 se sont :
    // create agent securite
    // get agent securite by id
    // get all agent securite
    // get agent securite by matricule
    // delete agent securite by id
    
}
