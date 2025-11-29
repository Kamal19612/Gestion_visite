package com.NativIA.GestionVisite.Entities;

import java.time.LocalDate;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("Notifications")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder   
public class Notification implements java.io.Serializable {

    private String message;

    private LocalDate date;

    private boolean statut;

    // relation avec l'entité visite
    @ManyToOne
    private Visite visite;

}
