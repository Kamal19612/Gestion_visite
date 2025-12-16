package com.NativIA.GestionVisite.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatsByDepartementResponse {
    private String departement;
    private long visitCount;
}
