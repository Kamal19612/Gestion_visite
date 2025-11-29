package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Notification;

@Repository
public interface notificationRepository extends JpaRepository<Notification, Long> {

	java.util.List<Notification> findByVisite_Id(Long visiteId);

}
