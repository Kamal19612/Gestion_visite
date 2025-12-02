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
import org.springframework.web.bind.annotation.RestController;

import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.DTO.Response.userResponse;
import com.NativIA.GestionVisite.Services.userService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final userService service;

    public UserController(userService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<userResponse> create(@Valid @RequestBody userRequest req) {
        userResponse res = service.create(req);
        if (res != null && res.getId() != null) {
            return ResponseEntity.created(java.net.URI.create("/api/v1/users/" + res.getId())).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<userResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<userResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
