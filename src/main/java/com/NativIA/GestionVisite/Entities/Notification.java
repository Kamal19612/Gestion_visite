package com.NativIA.GestionVisite.Entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name="Notifications")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder   
public class Notification implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    @Column(nullable=false)
    private String message;
    @Column(nullable=false)
    private Date date;
    @Column(nullable=false)
    private boolean statut;

}
