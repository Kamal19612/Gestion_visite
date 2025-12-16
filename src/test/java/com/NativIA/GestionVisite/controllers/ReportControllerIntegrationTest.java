package com.NativIA.GestionVisite.controllers;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.NativIA.GestionVisite.DAO.visiteRepository;
import com.NativIA.GestionVisite.Entities.Visite;
import com.NativIA.GestionVisite.Enum.typeStatus;

@SpringBootTest
@AutoConfigureMockMvc
public class ReportControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private visiteRepository visiteRepository;

    @BeforeEach
    public void setup() {
        visiteRepository.deleteAll();
        Visite v = Visite.builder()
                .date(LocalDateTime.now())
                .hEntree(LocalDateTime.now())
                .motif("Test motif")
                .statut(typeStatus.TERMINER)
                .build();
        visiteRepository.save(v);
    }

    @Test
    public void exportPdf_shouldReturnPdf() throws Exception {
        mockMvc.perform(get("/api/v1/reports/visites/export?format=pdf"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PDF));
    }

    @Test
    public void exportExcel_shouldReturnExcel() throws Exception {
        mockMvc.perform(get("/api/v1/reports/visites/export?format=excel"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
    }

}
