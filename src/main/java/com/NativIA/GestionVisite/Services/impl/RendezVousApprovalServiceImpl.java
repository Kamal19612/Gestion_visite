package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.soumissionRepository;
import com.NativIA.GestionVisite.DTO.Request.ApprovalRequestDTO;
import com.NativIA.GestionVisite.DTO.Response.ApprovalResponseDTO;
import com.NativIA.GestionVisite.Entities.SoumissionRDV;
import com.NativIA.GestionVisite.Services.EmailService;
import com.NativIA.GestionVisite.Services.RendezVousApprovalService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RendezVousApprovalServiceImpl implements RendezVousApprovalService {

        @Autowired
        private soumissionRepository soumissionRDVRepository;

    @Autowired
    private EmailService emailService;

    @Override
    @Transactional
    public ApprovalResponseDTO approveSoumission(Long idSoumission, ApprovalRequestDTO approvalRequest) {
        log.info("Approbation de la soumission RDV : {}", idSoumission);

        SoumissionRDV soumission = soumissionRDVRepository.findById(idSoumission)
                .orElseThrow(() -> new RuntimeException("Soumission RDV non trouvée: " + idSoumission));

        // Mise à jour du statut
        soumission.setStatut("Approuvée");

        SoumissionRDV updated = soumissionRDVRepository.save(soumission);

        // Envoi de l'email d'approbation
        Map<String, Object> variables = new HashMap<>();
        variables.put("visiteurName", soumission.getPrenom() + " " + soumission.getNom());
        variables.put("reason", approvalRequest.getReason());
        variables.put("dateRendezVous", soumission.getDateRendezVous());
        variables.put("heureRendezVous", soumission.getHeureRendezVous());
        variables.put("comments", approvalRequest.getComments() != null ? approvalRequest.getComments() : "");

        emailService.sendApprovalEmail(
                soumission.getEmail(),
                soumission.getPrenom() + " " + soumission.getNom(),
                variables
        );

        log.info("Email d'approbation envoyé à : {}", soumission.getEmail());

        return ApprovalResponseDTO.builder()
                .idSoumission(updated.getIdSoumission())
                .newStatus("Approuvée")
                .approvalDateTime(LocalDateTime.now())
                .notificationEmail(soumission.getEmail())
                .message("Soumission approuvée avec succès. Notification envoyée au visiteur.")
                .build();
    }

    @Override
    @Transactional
    public ApprovalResponseDTO rejectSoumission(Long idSoumission, ApprovalRequestDTO rejectionRequest) {
        log.info("Rejet de la soumission RDV : {}", idSoumission);

        SoumissionRDV soumission = soumissionRDVRepository.findById(idSoumission)
                .orElseThrow(() -> new RuntimeException("Soumission RDV non trouvée: " + idSoumission));

        // Mise à jour du statut
        soumission.setStatut("Rejetée");

        SoumissionRDV updated = soumissionRDVRepository.save(soumission);

        // Envoi de l'email de rejet
        Map<String, Object> variables = new HashMap<>();
        variables.put("visiteurName", soumission.getPrenom() + " " + soumission.getNom());
        variables.put("reason", rejectionRequest.getReason());
        variables.put("comments", rejectionRequest.getComments() != null ? rejectionRequest.getComments() : "");

        emailService.sendRejectionEmail(
                soumission.getEmail(),
                soumission.getPrenom() + " " + soumission.getNom(),
                variables
        );

        log.info("Email de rejet envoyé à : {}", soumission.getEmail());

        return ApprovalResponseDTO.builder()
                .idSoumission(updated.getIdSoumission())
                .newStatus("Rejetée")
                .approvalDateTime(LocalDateTime.now())
                .notificationEmail(soumission.getEmail())
                .message("Soumission rejetée avec succès. Notification envoyée au visiteur.")
                .build();
    }

    @Override
    public String getSoumissionStatus(Long idSoumission) {
        SoumissionRDV soumission = soumissionRDVRepository.findById(idSoumission)
                .orElseThrow(() -> new RuntimeException("Soumission RDV non trouvée: " + idSoumission));
        return soumission.getStatut();
    }
}
