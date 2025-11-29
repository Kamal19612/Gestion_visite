package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Admin;

@Repository
public interface adminRepository extends  JpaRepository<Admin, Long>{

	java.util.List<Admin> findByPrivileges(String privileges);

}
