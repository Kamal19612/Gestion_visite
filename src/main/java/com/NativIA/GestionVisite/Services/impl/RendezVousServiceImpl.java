package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.rendezVousRepository;
import com.NativIA.GestionVisite.DTO.Request.rendezVousRequest;
import com.NativIA.GestionVisite.DTO.Response.rendezVousResponse;
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

    @Autowired
    private com.NativIA.GestionVisite.Services.ConflictDetectionService conflictDetectionService;


    
    @Autowired
    private com.NativIA.GestionVisite.DAO.visiteurRepository visiteurRepository; // Inject VisiteurRepository

    @Autowired
    private com.NativIA.GestionVisite.DAO.userRepository userRepository; // Inject UserRepository

    @Autowired
    private com.NativIA.GestionVisite.mapper.VisiteurMapper visiteurMapper;

    @Override
    public rendezVousResponse create(rendezVousRequest request) {
        // Get authenticated user's email and role
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("User not authenticated");
        }
        String userEmail = auth.getName(); // email is the principal name
        
        // Get user role from authentication authorities
        String userRole = auth.getAuthorities().stream()
                .map(a -> a.getAuthority().replace("ROLE_", ""))
                .findFirst()
                .orElse("VISITEUR");

        com.NativIA.GestionVisite.Entities.Visiteur visiteur;

        // Cas d'utilisation 5 : Agent crée un rendez-vous pour un visiteur
        if ("AGENT_SECURITE".equals(userRole) && request.getVisiteurEmail() != null && !request.getVisiteurEmail().trim().isEmpty()) {
            // Agent spécifie un visiteur par email
            String visiteurEmail = request.getVisiteurEmail().trim();
            visiteur = visiteurRepository.findByEmail(visiteurEmail).orElse(null);
            
            // Si le visiteur n'existe pas, le créer avec les informations fournies
            if (visiteur == null) {
                if (request.getVisiteurFirstName() == null || request.getVisiteurLastName() == null) {
                    throw new IllegalStateException("Pour créer un nouveau visiteur, le prénom et le nom sont requis");
                }
                
                // Créer un nouveau visiteur
                // Vérifier d'abord si un User avec cet email existe déjà
                java.util.Optional<com.NativIA.GestionVisite.Entities.User> existingUser = userRepository.findByEmail(visiteurEmail);
                if (existingUser.isPresent() && existingUser.get() instanceof com.NativIA.GestionVisite.Entities.Visiteur) {
                    visiteur = (com.NativIA.GestionVisite.Entities.Visiteur) existingUser.get();
                } else {
                    visiteur = com.NativIA.GestionVisite.Entities.Visiteur.builder()
                            .name((request.getVisiteurFirstName().trim() + " " + request.getVisiteurLastName().trim()).trim())
                            .email(visiteurEmail)
                            .role(com.NativIA.GestionVisite.Enum.Roles.VISITEUR)
                            .emailVerified(true) // Visiteur créé par agent est considéré comme vérifié
                            .entreprise(request.getVisiteurFirstName() + " " + request.getVisiteurLastName()) // Entreprise par défaut
                            .scanDocumentPath("")
                            .signaturePath("")
                            .phoneNumber(request.getVisiteurWhatsapp()) // Ajouter le WhatsApp si fourni
                            .build();
                    
                    visiteur = visiteurRepository.save(visiteur);
                }
            }
        } else {
            // Cas d'utilisation 2 : Visiteur crée son propre rendez-vous
            // Find the associated visiteur directly by email
            visiteur = visiteurRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalStateException("Visiteur not found for authenticated user. Si vous êtes un agent, veuillez spécifier l'email du visiteur."));
        }

        // check for conflicts before creating
        LocalDate date = LocalDate.parse(request.getDate());
        LocalTime heure = LocalTime.parse(request.getHeure());
        if (conflictDetectionService.hasConflict(date, heure)) {
            throw new IllegalStateException("Conflit de rendez-vous: créneau déjà réservé");
        }
        RendezVous r = rendezVousMapper.toEntity(request);
        r.setVisiteur(visiteur); // Set the found or created visiteur
        return rendezVousMapper.toResponse(rendezVousRepository.save(r));
    }

    @Override
    public rendezVousResponse getById(Long id) {
        return rendezVousRepository.findById(id).map(rendezVousMapper::toResponse).orElse(null);
    }

    @Override
    public List<rendezVousResponse> getAll() {
        return rendezVousRepository.findAll().stream().map(rendezVousMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<rendezVousResponse> findByDate(String date) {
        try {
            LocalDate d = LocalDate.parse(date);
            return rendezVousRepository.findByDate(d).stream().map(rendezVousMapper::toResponse).collect(Collectors.toList());
        } catch (Exception e) {
            return List.of();
        }
    }

    @Override
    public List<rendezVousResponse> findByVisiteurEmail(String email) {
        try {
            return rendezVousRepository.findByVisiteur_Email(email).stream().map(rendezVousMapper::toResponse).collect(Collectors.toList());
        } catch (Exception e) {
            return List.of();
        }
    }

    @Override
    public void delete(Long id) {
        rendezVousRepository.deleteById(id);
    }

}
