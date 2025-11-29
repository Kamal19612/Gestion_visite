package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.visiteurRequest;
import com.NativIA.GestionVisite.DTO.Response.visiteurResponse;

public interface visiteurService {

    visiteurResponse create(visiteurRequest request);

    visiteurResponse getById(Long id);

    List<visiteurResponse> getAll();

    void delete(Long id);

}
