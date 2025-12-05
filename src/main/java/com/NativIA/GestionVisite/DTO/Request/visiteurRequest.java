package com.NativIA.GestionVisite.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class visiteurRequest extends userRequest {
    
    @NotBlank(message = "L'entreprise est requise")
    private String entreprise;

    @NotBlank(message = "Le chemin du document scanné est requis")
    private String scanDocumentPath;

    private String signaturePath;

}
