package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.visiteRequest;
import com.NativIA.GestionVisite.DTO.Response.visiteResponse;

public interface visiteService {

    visiteResponse create(visiteRequest request);

    visiteResponse getById(Long id);

    List<visiteResponse> getAll();

    List<visiteResponse> findByStatut(String statut);

    void delete(Long id);

}
