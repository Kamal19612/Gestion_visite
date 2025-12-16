package com.NativIA.GestionVisite.integration;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.soumissionRepository;
import com.NativIA.GestionVisite.Entities.SoumissionRDV;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class RendezVousApprovalIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private soumissionRepository soumissionRepository;



    @Test
    @Transactional
    @WithMockUser(roles = "SECRETAIRE")
    public void approveEndpoint_updatesStatusAndReturnsResponse() throws Exception {
        SoumissionRDV s = SoumissionRDV.builder()
                .nom("Doe")
                .prenom("John")
                .departement("IT")
                .email("john.doe@example.com")
                .telephone("0123456789")
                .entreprise("ACME")
                .motif("Meeting")
                .dateRendezVous(LocalDate.now().plusDays(1))
                .heureRendezVous(LocalTime.of(10, 0))
                .statut("En attente")
                .build();

        SoumissionRDV saved = soumissionRepository.save(s);

        String body = "{\"reason\":\"Valid\",\"comments\":\"See you\"}";

        mockMvc.perform(post("/api/v1/rendezvous/" + saved.getIdSoumission() + "/approve")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.newStatus").value("Approuvée"));

        SoumissionRDV updated = soumissionRepository.findById(saved.getIdSoumission()).orElseThrow();
        assertThat(updated.getStatut()).isEqualTo("Approuvée");
    }

    @Test
    @Transactional
    @WithMockUser(roles = "SECRETAIRE")
    public void rejectEndpoint_updatesStatusAndReturnsResponse() throws Exception {
        SoumissionRDV s = SoumissionRDV.builder()
                .nom("Smith")
                .prenom("Anna")
                .departement("HR")
                .email("anna.smith@example.com")
                .telephone("0987654321")
                .entreprise("Globex")
                .motif("Interview")
                .dateRendezVous(LocalDate.now().plusDays(2))
                .heureRendezVous(LocalTime.of(14, 30))
                .statut("En attente")
                .build();

        SoumissionRDV saved = soumissionRepository.save(s);

        String body = "{\"reason\":\"Not available\",\"comments\":\"Schedule conflict\"}";

        mockMvc.perform(post("/api/v1/rendezvous/" + saved.getIdSoumission() + "/reject")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.newStatus").value("Rejetée"));

        SoumissionRDV updated = soumissionRepository.findById(saved.getIdSoumission()).orElseThrow();
        assertThat(updated.getStatut()).isEqualTo("Rejetée");
    }


}
