package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Visite;

@Repository
public interface visiteDAO extends JpaRepository<Visite, Long> {

}
