package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.agentSecuriteRequest;
import com.NativIA.GestionVisite.DTO.Response.agentSecuriteResponse;

public interface agentSecuriteService {

    agentSecuriteResponse create(agentSecuriteRequest request);

    agentSecuriteResponse getById(Long id);

    List<agentSecuriteResponse> getAll();

    agentSecuriteResponse findByMatricule(String matricule);

    void delete(Long id);

}
