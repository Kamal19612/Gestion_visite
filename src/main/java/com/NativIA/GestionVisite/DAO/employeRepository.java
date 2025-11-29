package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Employe;

@Repository
public interface employeRepository extends JpaRepository<Employe, Long> {

}
