package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Secretaire;

@Repository
public interface secretaireDAO extends JpaRepository<Secretaire, Long> {

}
