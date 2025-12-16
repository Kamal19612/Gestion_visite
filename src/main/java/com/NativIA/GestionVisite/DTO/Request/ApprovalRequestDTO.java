package com.NativIA.GestionVisite.DTO.Request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalRequestDTO {

    @NotBlank(message = "La raison est requise")
    @Schema(description = "Raison d'approbation ou de rejet", example = "Visite approuvée sans remarques")
    private String reason;

    @Schema(description = "Commentaires additionnels", example = "Veuillez apporter une pièce d'identité")
    private String comments;
}
