package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.rendezVousRepository;
import com.NativIA.GestionVisite.DTO.Request.RDVRequest;
import com.NativIA.GestionVisite.DTO.Response.RDVResponse;
import com.NativIA.GestionVisite.Entities.RendezVous;
import com.NativIA.GestionVisite.Services.rendezVousService;
import com.NativIA.GestionVisite.mapper.RendezVousMapper;

@Service
@Transactional
public class RendezVousServiceImpl implements rendezVousService {

    @Autowired
    private rendezVousRepository rendezVousRepository;

    @Autowired
    private RendezVousMapper rendezVousMapper;

    @Override
    public RDVResponse create(RDVRequest request) {
        RendezVous r = rendezVousMapper.toEntity(request);
        return rendezVousMapper.toResponse(rendezVousRepository.save(r));
    }

    @Override
    public RDVResponse getById(Long id) {
        return rendezVousRepository.findById(id).map(rendezVousMapper::toResponse).orElse(null);
    }

    @Override
    public List<RDVResponse> getAll() {
        return rendezVousRepository.findAll().stream().map(rendezVousMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<RDVResponse> findByDate(String date) {
        try {
            LocalDate d = LocalDate.parse(date);
            return rendezVousRepository.findByDate(d).stream().map(rendezVousMapper::toResponse).collect(Collectors.toList());
        } catch (Exception e) {
            return List.of();
        }
    }

    @Override
    public void delete(Long id) {
        rendezVousRepository.deleteById(id);
    }

}
