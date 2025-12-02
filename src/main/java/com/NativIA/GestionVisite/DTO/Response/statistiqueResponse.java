package com.NativIA.GestionVisite.DTO.Response;

import org.springframework.stereotype.Component;

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
public class statistiqueResponse {
    private Long id;
    private String periode;
    private int nombreVisites;
    private int nombreRDV;
    private int nombreSoumissions;
    private Double dureeMoyenneMinutes;

}
