package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.rendezVousRequest;
import com.NativIA.GestionVisite.DTO.Response.rendezVousResponse;

public interface rendezVousService {

    rendezVousResponse create(rendezVousRequest request);

    rendezVousResponse getById(Long id);

    List<rendezVousResponse> getAll();

    List<rendezVousResponse> findByDate(String date);

    List<rendezVousResponse> findByVisiteurEmail(String email);

    void delete(Long id);

}
