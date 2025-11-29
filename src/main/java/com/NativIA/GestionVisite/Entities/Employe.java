package com.NativIA.GestionVisite.Entities;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("EMPLOYE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Employe extends User {

    private String secteurActivite;

    // liansons avec l'entité visite
    @OneToMany(mappedBy = "employe", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private List<Visite> visites;

}
