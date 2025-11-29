package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.secretaireRequest;
import com.NativIA.GestionVisite.DTO.Response.secretaireResponse;

public interface secretaireService {

    secretaireResponse create(secretaireRequest request);

    secretaireResponse getById(Long id);

    List<secretaireResponse> getAll();

    List<secretaireResponse> findByDepartement(String departement);

    void delete(Long id);

}
