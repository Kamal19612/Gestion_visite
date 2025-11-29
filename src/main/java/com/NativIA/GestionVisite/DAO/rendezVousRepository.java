package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.RendezVous;

@Repository
public interface rendezVousRepository extends JpaRepository<RendezVous, Long> {

}
