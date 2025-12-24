package com.NativIA.GestionVisite.Services;

import com.NativIA.GestionVisite.DTO.Request.ApprovalRequestDTO;
import com.NativIA.GestionVisite.DTO.Response.ApprovalResponseDTO;

public interface RendezVousApprovalService {

    /**
     * Approuve un rendez-vous
     */
    ApprovalResponseDTO approveRendezVous(Long idRendezVous, ApprovalRequestDTO approvalRequest);

    /**
     * Rejette un rendez-vous
     */
    ApprovalResponseDTO rejectRendezVous(Long idRendezVous, ApprovalRequestDTO rejectionRequest);

    /**
     * Récupère le statut
     */
    String getRendezVousStatus(Long idRendezVous);
}
