package com.NativIA.GestionVisite.DTO.Request;

import org.springframework.stereotype.Component;

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
public class visiteRequest {
    
    private String date;
    private String HEntree;
    private String HSortie;
    private String motif;

}
