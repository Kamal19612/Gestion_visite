package com.NativIA.GestionVisite.DTO.Request;

import java.time.LocalDate;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class notificationRequest {
    
    @NotBlank(message = "Le nom est requis")
    private String name;

    @NotBlank(message = "Le message est requis")
    private String message;

    @NotNull(message = "La date est requise")
    private LocalDate date;

}
