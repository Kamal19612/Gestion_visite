package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.rendezVousRepository;
import com.NativIA.GestionVisite.DAO.soumissionRepository;
import com.NativIA.GestionVisite.DTO.Request.ApprovalRequestDTO;
import com.NativIA.GestionVisite.DTO.Response.ApprovalResponseDTO;
import com.NativIA.GestionVisite.Entities.RendezVous;
import com.NativIA.GestionVisite.Entities.SoumissionRDV;
import com.NativIA.GestionVisite.Enum.typeStatus;
import com.NativIA.GestionVisite.Services.EmailService;
import com.NativIA.GestionVisite.Services.RendezVousApprovalService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RendezVousApprovalServiceImpl implements RendezVousApprovalService {

    @Autowired
    private rendezVousRepository rendezVousRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private soumissionRepository soumissionRepository;

    @Override
    @Transactional
    public ApprovalResponseDTO approveRendezVous(Long idRendezVous, ApprovalRequestDTO approvalRequest) {
        log.info("Approbation du RDV : {}", idRendezVous);
        // Try find as RendezVous first
        java.util.Optional<RendezVous> maybeRdv = rendezVousRepository.findById(idRendezVous);
        if (maybeRdv.isPresent()) {
            RendezVous rdv = maybeRdv.get();
            rdv.setStatut(typeStatus.APPROUVEE);
            RendezVous updated = rendezVousRepository.save(rdv);

            String email = null;
            String name = "Visiteur";
            com.NativIA.GestionVisite.Entities.Visiteur visitor = rdv.getVisiteur();
            if (visitor != null) {
                email = visitor.getEmail();
                name = visitor.getName();
            }

            if (email != null) {
                Map<String, Object> variables = new HashMap<>();
                variables.put("visiteurName", name);
                variables.put("reason", approvalRequest.getReason());
                variables.put("dateRendezVous", updated.getDate());
                variables.put("heureRendezVous", updated.getHeure());
                variables.put("comments", approvalRequest.getComments() != null ? approvalRequest.getComments() : "");
                try {
                    emailService.sendApprovalEmail(email, name, variables);
                    log.info("Email d'approbation envoyé à : {}", email);
                } catch (Exception ex) {
                    log.warn("Failed to send approval email to {}: {}", email, ex.getMessage());
                }
            }

            return ApprovalResponseDTO.builder()
                    .idSoumission(updated.getIdRDV())
                    .newStatus("Approuvée")
                    .approvalDateTime(LocalDateTime.now())
                    .notificationEmail(email)
                    .message("Rendez-vous approuvé.")
                    .build();
        }

        // Fallback: try to find a SoumissionRDV with this id and update its statut
        java.util.Optional<SoumissionRDV> maybeSoum = soumissionRepository.findById(idRendezVous);
        if (maybeSoum.isPresent()) {
            SoumissionRDV soum = maybeSoum.get();
            soum.setStatut("Approuvée");
            SoumissionRDV updated = soumissionRepository.save(soum);

            String email = updated.getEmail();
            String name = updated.getNom() + " " + updated.getPrenom();

            if (email != null) {
                Map<String, Object> variables = new HashMap<>();
                variables.put("visiteurName", name);
                variables.put("reason", approvalRequest.getReason());
                variables.put("dateRendezVous", updated.getDateRendezVous());
                variables.put("heureRendezVous", updated.getHeureRendezVous());
                variables.put("comments", approvalRequest.getComments() != null ? approvalRequest.getComments() : "");
                try {
                    emailService.sendApprovalEmail(email, name, variables);
                } catch (Exception ex) {
                    log.warn("Failed to send approval email to {}: {}", email, ex.getMessage());
                }
            }

            return ApprovalResponseDTO.builder()
                    .idSoumission(updated.getIdSoumission())
                    .newStatus("Approuvée")
                    .approvalDateTime(LocalDateTime.now())
                    .notificationEmail(email)
                    .message("Soumission approuvée.")
                    .build();
        }

        throw new RuntimeException("RendezVous non trouvé: " + idRendezVous);
    }

    @Override
    @Transactional
    public ApprovalResponseDTO rejectRendezVous(Long idRendezVous, ApprovalRequestDTO rejectionRequest) {
        log.info("Rejet du RDV : {}", idRendezVous);
        java.util.Optional<RendezVous> maybeRdv = rendezVousRepository.findById(idRendezVous);
        if (maybeRdv.isPresent()) {
            RendezVous rdv = maybeRdv.get();
            rdv.setStatut(typeStatus.REJETEE);
            RendezVous updated = rendezVousRepository.save(rdv);

            String email = null;
            String name = "Visiteur";
            if (rdv.getVisiteur() != null) {
                email = rdv.getVisiteur().getEmail();
                name = rdv.getVisiteur().getName();
            }

            if (email != null) {
                Map<String, Object> variables = new HashMap<>();
                variables.put("visiteurName", name);
                variables.put("reason", rejectionRequest.getReason());
                variables.put("comments", rejectionRequest.getComments() != null ? rejectionRequest.getComments() : "");
                try {
                    emailService.sendRejectionEmail(email, name, variables);
                } catch (Exception ex) {
                    log.warn("Failed to send rejection email to {}: {}", email, ex.getMessage());
                }
            }

            return ApprovalResponseDTO.builder()
                    .idSoumission(updated.getIdRDV())
                    .newStatus("Rejetée")
                    .approvalDateTime(LocalDateTime.now())
                    .notificationEmail(email)
                    .message("Rendez-vous rejeté.")
                    .build();
        }

        java.util.Optional<SoumissionRDV> maybeSoum = soumissionRepository.findById(idRendezVous);
        if (maybeSoum.isPresent()) {
            SoumissionRDV soum = maybeSoum.get();
            soum.setStatut("Rejetée");
            SoumissionRDV updated = soumissionRepository.save(soum);

            String email = updated.getEmail();
            String name = updated.getNom() + " " + updated.getPrenom();

            if (email != null) {
                Map<String, Object> variables = new HashMap<>();
                variables.put("visiteurName", name);
                variables.put("reason", rejectionRequest.getReason());
                variables.put("comments", rejectionRequest.getComments() != null ? rejectionRequest.getComments() : "");
                try {
                    emailService.sendRejectionEmail(email, name, variables);
                } catch (Exception ex) {
                    log.warn("Failed to send rejection email to {}: {}", email, ex.getMessage());
                }
            }

            return ApprovalResponseDTO.builder()
                    .idSoumission(updated.getIdSoumission())
                    .newStatus("Rejetée")
                    .approvalDateTime(LocalDateTime.now())
                    .notificationEmail(email)
                    .message("Soumission rejetée.")
                    .build();
        }

        throw new RuntimeException("RendezVous non trouvé: " + idRendezVous);
    }

    @Override
    public String getRendezVousStatus(Long idRendezVous) {
        RendezVous rdv = rendezVousRepository.findById(idRendezVous)
                .orElseThrow(() -> new RuntimeException("RendezVous non trouvé"));
        return rdv.getStatut().toString();
    }
}
