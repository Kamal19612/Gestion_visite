package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.secretaireRepository;
import com.NativIA.GestionVisite.DAO.soumissionRepository;
import com.NativIA.GestionVisite.DTO.Request.soumissionRequest;
import com.NativIA.GestionVisite.DTO.Response.soumissionResponse;
import com.NativIA.GestionVisite.Entities.SoumissionRDV;
import com.NativIA.GestionVisite.Services.soumissionService;
import com.NativIA.GestionVisite.mapper.SoumissionMapper;

@Service
@Transactional
public class SoumissionServiceImpl implements soumissionService {

    @Autowired
    private soumissionRepository soumissionRepository;

    @Autowired
    private SoumissionMapper soumissionMapper;

    @Autowired(required = false)
    private com.NativIA.GestionVisite.Services.EmailService emailService;

    @Autowired
    private secretaireRepository secretaireRepository;

    @Override
    public soumissionResponse create(soumissionRequest request) {
        SoumissionRDV s = soumissionMapper.toEntity(request);
        SoumissionRDV saved = soumissionRepository.save(s);

        // Notify secretaries for the department
        try {
            java.util.List<com.NativIA.GestionVisite.Entities.Secretaire> secretaires = secretaireRepository.findByDepartement(request.getDepartement());
            String visitorName = request.getNom() + " " + request.getPrenom();
            for (var sec : secretaires) {
                if (sec.getEmail() != null && emailService != null) {
                    emailService.sendSecretaryNotificationEmail(sec.getEmail(), visitorName, request.getDateRendezVous(), request.getHeureRendezVous());
                }
            }
        } catch (Exception e) {
            // log and continue
        }

        return soumissionMapper.toResponse(saved);
    }

    @Override
    public soumissionResponse getById(Long id) {
        return soumissionRepository.findById(id).map(soumissionMapper::toResponse).orElse(null);
    }

    @Override
    public List<soumissionResponse> getAll() {
        return soumissionRepository.findAll().stream().map(soumissionMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<soumissionResponse> findByStatut(String statut) {
        return soumissionRepository.findByStatut(statut).stream().map(soumissionMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        soumissionRepository.deleteById(id);
    }

}
