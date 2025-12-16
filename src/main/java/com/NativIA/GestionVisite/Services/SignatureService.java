package com.NativIA.GestionVisite.Services;

import org.springframework.web.multipart.MultipartFile;

public interface SignatureService {
    /**
     * Upload et valide une signature électronique
     * @param file Fichier image de la signature
     * @param visiteId ID de la visite associée
     * @return Chemin du fichier sauvegardé
     */
    String uploadSignature(MultipartFile file, Long visiteId);
    
    /**
     * Récupère le chemin de la signature pour une visite
     * @param visiteId ID de la visite
     * @return Chemin de la signature
     */
    String getSignaturePath(Long visiteId);
    
    /**
     * Valide qu'une signature existe et est valide
     * @param visiteId ID de la visite
     * @return True si la signature est valide
     */
    boolean isSignatureValid(Long visiteId);
    
    /**
     * Supprime la signature d'une visite
     * @param visiteId ID de la visite
     */
    void deleteSignature(Long visiteId);
}
