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

import com.NativIA.GestionVisite.DTO.Request.notificationRequest;
import com.NativIA.GestionVisite.DTO.Response.notificationResponse;
import com.NativIA.GestionVisite.Services.notificationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final notificationService service;

    public NotificationController(notificationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<notificationResponse> create(@Valid @RequestBody notificationRequest req) {
        notificationResponse res = service.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<notificationResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<notificationResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<notificationResponse>> findByVisiteId(@RequestParam Long visiteId) {
        return ResponseEntity.ok(service.findByVisiteId(visiteId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
