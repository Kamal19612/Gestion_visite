package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.statistiqueRequest;
import com.NativIA.GestionVisite.DTO.Response.statistiqueResponse;

public interface statistiqueService {

    statistiqueResponse create(statistiqueRequest request);

    statistiqueResponse getById(Long id);

    List<statistiqueResponse> getAll();

    statistiqueResponse findByPeriode(String periode);

    void delete(Long id);

}
