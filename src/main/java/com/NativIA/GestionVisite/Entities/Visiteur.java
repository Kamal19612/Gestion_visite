package com.NativIA.GestionVisite.Entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("VISITEUR")
@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Visiteur extends User {

    private String entreprise;
    private String scanDocumentPath;
    private String signaturePath;

    // relation avec SoumissionVisite
    @OneToMany(mappedBy = "visiteur", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private java.util.List<SoumissionRDV> soumissionVisites;

}
