package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.notificationRequest;
import com.NativIA.GestionVisite.DTO.Response.notificationResponse;

public interface notificationService {

    notificationResponse create(notificationRequest request);

    notificationResponse getById(Long id);

    List<notificationResponse> getAll();

    List<notificationResponse> findByVisiteId(Long visiteId);

    void delete(Long id);

}
