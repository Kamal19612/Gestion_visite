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
public class visiteResponse {
    private Long id;
    private String date;
    private String HEntree;
    private String HSortie;
    private String motif;
    private String Statut;


}
