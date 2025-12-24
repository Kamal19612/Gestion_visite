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

import com.NativIA.GestionVisite.DTO.Request.rendezVousRequest;
import com.NativIA.GestionVisite.DTO.Response.rendezVousResponse;
import com.NativIA.GestionVisite.Services.RendezVousApprovalService;
import com.NativIA.GestionVisite.Services.rendezVousService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/rendezvous")
public class RendezVousController {

    private final rendezVousService service;
    private final RendezVousApprovalService approvalService;

    public RendezVousController(rendezVousService service, RendezVousApprovalService approvalService) {
        this.service = service;
        this.approvalService = approvalService;
    }

    @PostMapping
    public ResponseEntity<rendezVousResponse> create(@Valid @RequestBody rendezVousRequest req) {
        try {
            rendezVousResponse res = service.create(req);
            if (res != null && res.getId() != null) {
                return ResponseEntity.created(java.net.URI.create("/api/v1/rendezvous/" + res.getId())).body(res);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<rendezVousResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<rendezVousResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/mine")
    public ResponseEntity<List<rendezVousResponse>> getMyRendezVous() {
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).body(List.of());
        }
        String email = auth.getName();
        return ResponseEntity.ok(service.findByVisiteurEmail(email));
    }

    @GetMapping("/search")
    public ResponseEntity<List<rendezVousResponse>> findByDate(@RequestParam String date) {
        return ResponseEntity.ok(service.findByDate(date));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id, @Valid @RequestBody com.NativIA.GestionVisite.DTO.Request.ApprovalRequestDTO req) {
        com.NativIA.GestionVisite.DTO.Response.ApprovalResponseDTO res = approvalService.approveRendezVous(id, req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Long id, @Valid @RequestBody com.NativIA.GestionVisite.DTO.Request.ApprovalRequestDTO req) {
        com.NativIA.GestionVisite.DTO.Response.ApprovalResponseDTO res = approvalService.rejectRendezVous(id, req);
        return ResponseEntity.ok(res);
    }
}
