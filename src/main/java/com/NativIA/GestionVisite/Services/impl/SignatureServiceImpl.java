package com.NativIA.GestionVisite.Services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.NativIA.GestionVisite.DAO.visiteRepository;
import com.NativIA.GestionVisite.Entities.Visite;
import com.NativIA.GestionVisite.Services.SignatureService;
import com.NativIA.GestionVisite.Services.StorageService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SignatureServiceImpl implements SignatureService {

    private final visiteRepository visiteRepository;
    private final StorageService storageService;

    public SignatureServiceImpl(visiteRepository visiteRepository, StorageService storageService) {
        this.visiteRepository = visiteRepository;
        this.storageService = storageService;
    }

    @Override
    public String uploadSignature(MultipartFile file, Long visiteId) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier de signature ne peut pas être vide");
        }

        // Valider la visite existe
        Optional<Visite> visite = visiteRepository.findById(visiteId);
        if (visite.isEmpty()) {
            throw new IllegalArgumentException("Visite introuvable avec l'ID: " + visiteId);
        }

        try {
            // Télécharger via StorageService (S3 ou filesystem)
            String signaturePath = storageService.uploadFile(file, "signatures/");

            // Mettre à jour la visite avec le chemin de la signature
            Visite v = visite.get();
            v.setSignaturePath(signaturePath);
            visiteRepository.save(v);

            log.info("Signature sauvegardée pour la visite {}: {}", visiteId, signaturePath);
            return signaturePath;

        } catch (Exception e) {
            log.error("Erreur lors de la sauvegarde de la signature pour la visite {}: {}", visiteId, e.getMessage());
            throw new RuntimeException("Erreur lors de la sauvegarde de la signature: " + e.getMessage());
        }
    }

    @Override
    public String getSignaturePath(Long visiteId) {
        Optional<Visite> visite = visiteRepository.findById(visiteId);
        if (visite.isEmpty()) {
            throw new IllegalArgumentException("Visite introuvable avec l'ID: " + visiteId);
        }
        
        String signaturePath = visite.get().getSignaturePath();
        if (signaturePath == null || signaturePath.isEmpty()) {
            throw new IllegalArgumentException("Aucune signature trouvée pour la visite " + visiteId);
        }
        
        return signaturePath;
    }

    @Override
    public boolean isSignatureValid(Long visiteId) {
        try {
            Optional<Visite> visite = visiteRepository.findById(visiteId);
            if (visite.isEmpty()) {
                return false;
            }

            String signaturePath = visite.get().getSignaturePath();
            if (signaturePath == null || signaturePath.isEmpty()) {
                return false;
            }

            // Vérifier que le fichier existe (filesystem only)
            if (!storageService.isUsingS3()) {
                java.nio.file.Path filePath = java.nio.file.Paths.get(signaturePath);
                return java.nio.file.Files.exists(filePath) && java.nio.file.Files.isRegularFile(filePath);
            }
            
            // Pour S3, on assume que le fichier existe
            return true;
        } catch (Exception e) {
            log.error("Erreur lors de la validation de la signature pour la visite {}: {}", visiteId, e.getMessage());
            return false;
        }
    }

    @Override
    public void deleteSignature(Long visiteId) {
        try {
            Optional<Visite> visite = visiteRepository.findById(visiteId);
            if (visite.isEmpty()) {
                throw new IllegalArgumentException("Visite introuvable avec l'ID: " + visiteId);
            }

            Visite v = visite.get();
            String signaturePath = v.getSignaturePath();

            if (signaturePath != null && !signaturePath.isEmpty()) {
                // Supprimer via StorageService (S3 ou filesystem)
                storageService.deleteFile(signaturePath);
                log.info("Signature supprimée pour la visite {}", visiteId);
            }

            // Mettre à jour la visite
            v.setSignaturePath(null);
            visiteRepository.save(v);

        } catch (IllegalArgumentException e) {
            log.error("Erreur lors de la suppression de la signature pour la visite {}: {}", visiteId, e.getMessage());
            throw new RuntimeException("Erreur lors de la suppression de la signature: " + e.getMessage());
        }
    }

}
