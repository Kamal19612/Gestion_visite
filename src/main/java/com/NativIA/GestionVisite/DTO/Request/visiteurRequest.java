package com.NativIA.GestionVisite.DTO.Request;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Component
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class visiteurRequest extends userRequest {
    
    @NotBlank(message = "L'entreprise est requise")
    private String entreprise;

    @NotBlank(message = "Le document de scan est requis")
    private String scanDoc;

}
