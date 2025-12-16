package com.NativIA.GestionVisite.controllers;

import com.NativIA.GestionVisite.Services.SignatureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/signatures")
@Tag(name = "Signatures Électroniques", description = "Gestion des signatures électroniques des visites")
@Slf4j
public class SignatureController {

    private final SignatureService signatureService;

    public SignatureController(SignatureService signatureService) {
        this.signatureService = signatureService;
    }

    @PostMapping("/{visiteId}/upload")
    @PreAuthorize("hasAnyRole('VISITEUR', 'AGENT_SECURITE', 'ADMIN')")
    @Operation(summary = "Upload une signature électronique", 
               description = "Télécharge une image de signature pour une visite")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Signature uploadée avec succès"),
        @ApiResponse(responseCode = "400", description = "Fichier invalide ou format non accepté"),
        @ApiResponse(responseCode = "404", description = "Visite non trouvée"),
        @ApiResponse(responseCode = "403", description = "Accès refusé")
    })
    public ResponseEntity<Map<String, String>> uploadSignature(
            @PathVariable Long visiteId,
            @RequestParam("file") MultipartFile file) {
        
        try {
            String signaturePath = signatureService.uploadSignature(file, visiteId);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Signature uploadée avec succès");
            response.put("signaturePath", signaturePath);
            response.put("visiteId", visiteId.toString());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            log.warn("Erreur de validation lors de l'upload de signature: {}", e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            log.error("Erreur lors de l'upload de signature: {}", e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors du traitement de la signature");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{visiteId}/validate")
    @PreAuthorize("hasAnyRole('VISITEUR', 'AGENT_SECURITE', 'ADMIN', 'SECRETAIRE')")
    @Operation(summary = "Vérifier si une signature existe", 
               description = "Valide l'existence et la validité d'une signature pour une visite")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Validation effectuée"),
        @ApiResponse(responseCode = "404", description = "Visite non trouvée")
    })
    public ResponseEntity<Map<String, Object>> validateSignature(@PathVariable Long visiteId) {
        try {
            boolean isValid = signatureService.isSignatureValid(visiteId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("visiteId", visiteId);
            response.put("isValid", isValid);
            response.put("message", isValid ? "Signature valide" : "Pas de signature valide");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Erreur lors de la validation de signature: {}", e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @GetMapping("/{visiteId}/path")
    @PreAuthorize("hasAnyRole('AGENT_SECURITE', 'ADMIN', 'SECRETAIRE')")
    @Operation(summary = "Récupérer le chemin de la signature", 
               description = "Récupère le chemin du fichier de signature sauvegardé")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Chemin récupéré"),
        @ApiResponse(responseCode = "404", description = "Signature non trouvée")
    })
    public ResponseEntity<Map<String, String>> getSignaturePath(@PathVariable Long visiteId) {
        try {
            String signaturePath = signatureService.getSignaturePath(visiteId);
            
            Map<String, String> response = new HashMap<>();
            response.put("visiteId", visiteId.toString());
            response.put("signaturePath", signaturePath);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération du chemin de signature: {}", e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @DeleteMapping("/{visiteId}/delete")
    @PreAuthorize("hasAnyRole('AGENT_SECURITE', 'ADMIN')")
    @Operation(summary = "Supprimer une signature", 
               description = "Supprime la signature électronique d'une visite")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Signature supprimée avec succès"),
        @ApiResponse(responseCode = "404", description = "Visite non trouvée"),
        @ApiResponse(responseCode = "403", description = "Accès refusé")
    })
    public ResponseEntity<Map<String, String>> deleteSignature(@PathVariable Long visiteId) {
        try {
            signatureService.deleteSignature(visiteId);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Signature supprimée avec succès");
            response.put("visiteId", visiteId.toString());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Erreur lors de la suppression de signature: {}", e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
