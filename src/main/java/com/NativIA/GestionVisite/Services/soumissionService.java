package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.soumissionRequest;
import com.NativIA.GestionVisite.DTO.Response.soumissionResponse;

public interface soumissionService {

    soumissionResponse create(soumissionRequest request);

    soumissionResponse getById(Long id);

    List<soumissionResponse> getAll();

    List<soumissionResponse> findByStatut(String statut);

    void delete(Long id);

}
