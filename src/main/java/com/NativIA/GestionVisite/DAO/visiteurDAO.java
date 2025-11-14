package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Visiteur;

@Repository
public interface visiteurDAO extends JpaRepository<Visiteur, Long> {

}
