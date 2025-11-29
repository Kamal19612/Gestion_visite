package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.SoumissionRDV;


@Repository
public interface soumissionRepository extends JpaRepository<SoumissionRDV, Long> {

}
