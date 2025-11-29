package com.NativIA.GestionVisite.DTO.Request;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Component
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class employeRequest extends userRequest {

    @NotBlank(message = "Le secteur d'activité est requis")
    private String secteurActivite;

}
