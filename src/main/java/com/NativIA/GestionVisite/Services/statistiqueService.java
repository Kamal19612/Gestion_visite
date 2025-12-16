package com.NativIA.GestionVisite.Services;

import com.NativIA.GestionVisite.DTO.Request.statistiqueRequest;
import com.NativIA.GestionVisite.DTO.Response.StatsByDepartementResponse;
import com.NativIA.GestionVisite.DTO.Response.StatsByEmployeResponse;
import com.NativIA.GestionVisite.DTO.Response.statistiqueResponse;
import java.time.LocalDate;
import java.util.List;

public interface statistiqueService {

    statistiqueResponse create(statistiqueRequest request);

    statistiqueResponse getById(Long id);

    List<statistiqueResponse> getAll();

    List<statistiqueResponse> getStatsByPeriode(LocalDate from, LocalDate to);

    List<StatsByDepartementResponse> getStatsByDepartement();

    List<StatsByEmployeResponse> getStatsByEmploye();

    void delete(Long id);

}
