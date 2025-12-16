package com.NativIA.GestionVisite.DTO.Response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApprovalResponseDTO {

    @Schema(description = "ID de la soumission")
    private Long idSoumission;

    @Schema(description = "Nouveau statut", example = "Approuvée")
    private String newStatus;

    @Schema(description = "Date et heure d'approbation/rejet")
    private LocalDateTime approvalDateTime;

    @Schema(description = "Email du visiteur auquel la notification a été envoyée")
    private String notificationEmail;

    @Schema(description = "Message de confirmation")
    private String message;
}
