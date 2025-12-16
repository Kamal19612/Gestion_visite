package com.NativIA.GestionVisite.controllers;

import com.NativIA.GestionVisite.DAO.visiteurRepository;
import com.NativIA.GestionVisite.DTO.Request.visiteurRequest;
import com.NativIA.GestionVisite.DTO.Response.visiteurResponse;
import com.NativIA.GestionVisite.Entities.Visiteur;
import com.NativIA.GestionVisite.Services.DocumentScanService;
import com.NativIA.GestionVisite.Services.OcrParsingService;
import com.NativIA.GestionVisite.Services.visiteurService;
import com.NativIA.GestionVisite.mapper.VisiteurMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/visiteurs")
public class VisiteurController {

    private final visiteurService service;
    private final DocumentScanService documentScanService;
    private final OcrParsingService ocrParsingService;
    private final visiteurRepository visiteurRepository;
    private final VisiteurMapper visiteurMapper;
    private final Path signatureStoragePath = Paths.get("signatures").toAbsolutePath().normalize();


    public VisiteurController(visiteurService service,
                                DocumentScanService documentScanService,
                                OcrParsingService ocrParsingService,
                                visiteurRepository visiteurRepository,
                                VisiteurMapper visiteurMapper) {
        this.service = service;
        this.documentScanService = documentScanService;
        this.ocrParsingService = ocrParsingService;
        this.visiteurRepository = visiteurRepository;
        this.visiteurMapper = visiteurMapper;
        try {
            Files.createDirectories(this.signatureStoragePath);
        } catch (IOException | SecurityException ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @PostMapping
    public ResponseEntity<visiteurResponse> create(@Valid @RequestBody visiteurRequest req) {
        visiteurResponse res = service.create(req);
        if (res != null && res.getId() != null) {
            return ResponseEntity.created(java.net.URI.create("/api/v1/visiteurs/" + res.getId())).body(res);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<visiteurResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<visiteurResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/scan-document")
    public ResponseEntity<?> scanDocument(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<Visiteur> optionalVisiteur = visiteurRepository.findById(id);
        if (optionalVisiteur.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String scannedText = documentScanService.scanDocument(file);
        Map<String, String> parsedData = ocrParsingService.parseIdCard(scannedText);

        if (parsedData.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Could not parse any information from the document.");
        }

        Visiteur visiteur = optionalVisiteur.get();

        String nom = parsedData.get("nom");
        String prenoms = parsedData.get("prenoms");

        if (nom != null && prenoms != null) {
            visiteur.setName(prenoms + " " + nom);
        } else if (nom != null) {
            visiteur.setName(nom);
        } else if (prenoms != null) {
            visiteur.setName(prenoms);
        }

        Visiteur updatedVisiteur = visiteurRepository.save(visiteur);

        return ResponseEntity.ok(visiteurMapper.toResponse(updatedVisiteur));
    }

    @PostMapping("/{id}/signature")
    public ResponseEntity<?> uploadSignature(@PathVariable Long id, @RequestParam("signature") MultipartFile signatureFile) {
        Optional<Visiteur> optionalVisiteur = visiteurRepository.findById(id);
        if (optionalVisiteur.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        try {
            String filename = "signature_" + id + "_" + System.currentTimeMillis() + ".png";
            Path targetLocation = this.signatureStoragePath.resolve(filename);
            Files.copy(signatureFile.getInputStream(), targetLocation);

            Visiteur visiteur = optionalVisiteur.get();
            visiteur.setSignaturePath(targetLocation.toString());
            visiteurRepository.save(visiteur);

            return ResponseEntity.ok(visiteurMapper.toResponse(visiteur));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to upload signature.");
        }
    }
}
