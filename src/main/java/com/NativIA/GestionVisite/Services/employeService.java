package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.employeRequest;
import com.NativIA.GestionVisite.DTO.Response.employeResponse;

public interface employeService {

    employeResponse create(employeRequest request);

    employeResponse getById(Long id);

    List<employeResponse> getAll();

    List<employeResponse> findBySecteur(String secteur);

    void delete(Long id);

}
