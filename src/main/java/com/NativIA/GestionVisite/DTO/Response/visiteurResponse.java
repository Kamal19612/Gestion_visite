package com.NativIA.GestionVisite.DTO.Response;

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
public class visiteurResponse extends userResponse {

    private String entreprise;
    private String scanDocumentPath;
    private String signaturePath;

}
