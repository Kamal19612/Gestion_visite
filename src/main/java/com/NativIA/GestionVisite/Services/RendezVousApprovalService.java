package com.NativIA.GestionVisite.Services;

import com.NativIA.GestionVisite.DTO.Request.ApprovalRequestDTO;
import com.NativIA.GestionVisite.DTO.Response.ApprovalResponseDTO;

public interface RendezVousApprovalService {

    /**
     * Approuve une soumission de rendez-vous
     * @param idSoumission ID de la soumission
     * @param approvalRequest Détails de l'approbation
     * @return ApprovalResponseDTO avec les détails de l'approbation
     */
    ApprovalResponseDTO approveSoumission(Long idSoumission, ApprovalRequestDTO approvalRequest);

    /**
     * Rejette une soumission de rendez-vous
     * @param idSoumission ID de la soumission
     * @param rejectionRequest Raison du rejet
     * @return ApprovalResponseDTO avec les détails du rejet
     */
    ApprovalResponseDTO rejectSoumission(Long idSoumission, ApprovalRequestDTO rejectionRequest);

    /**
     * Récupère le statut d'une soumission
     * @param idSoumission ID de la soumission
     * @return Statut actuel
     */
    String getSoumissionStatus(Long idSoumission);
}
