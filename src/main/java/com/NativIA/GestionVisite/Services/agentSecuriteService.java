package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.ASRequest;
import com.NativIA.GestionVisite.DTO.Response.ASResponse;

public interface agentSecuriteService {

    ASResponse create(ASRequest request);

    ASResponse getById(Long id);

    List<ASResponse> getAll();

    ASResponse findByMatricule(String matricule);

    void delete(Long id);

}
