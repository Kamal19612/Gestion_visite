package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.User;

@Repository
public interface userRepository extends JpaRepository<User, Long> {

	java.util.Optional<User> findByEmail(String email);

}
