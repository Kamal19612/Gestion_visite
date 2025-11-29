package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.RDVRequest;
import com.NativIA.GestionVisite.DTO.Response.RDVResponse;

public interface rendezVousService {

    RDVResponse create(RDVRequest request);

    RDVResponse getById(Long id);

    List<RDVResponse> getAll();

    List<RDVResponse> findByDate(String date);

    void delete(Long id);

}
