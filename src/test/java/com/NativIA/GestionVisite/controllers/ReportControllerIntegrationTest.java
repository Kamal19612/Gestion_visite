package com.NativIA.GestionVisite.controllers;

import java.io.ByteArrayInputStream;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.anyList;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.NativIA.GestionVisite.DAO.visiteRepository;
import com.NativIA.GestionVisite.Services.ReportService;

@SpringBootTest
@AutoConfigureMockMvc
public class ReportControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReportService reportService;

    @MockBean
    private visiteRepository visiteRepository;

    

    @BeforeEach
    void setUp() {
        // Mock repository
        Mockito.when(visiteRepository.findAll()).thenReturn(Collections.emptyList());

        // Mock report generation
        Mockito.when(reportService.generateVisitesPdfReport(anyList()))
                .thenReturn(new ByteArrayInputStream(new byte[]{1, 2, 3}));
        Mockito.when(reportService.generateVisitesExcelReport(anyList()))
                .thenReturn(new ByteArrayInputStream(new byte[]{4, 5, 6}));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testExportPdfAsAdmin() throws Exception {
        mockMvc.perform(get("/api/v1/reports/export")
                .param("format", "pdf"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(header().string("Content-Disposition", "attachment; filename=visites.pdf"));
    }

    @Test
    @WithMockUser(roles = "SECRETAIRE")
    public void testExportExcelAsSecretaire() throws Exception {
        mockMvc.perform(get("/api/v1/reports/export")
                .param("format", "excel"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .andExpect(header().string("Content-Disposition", "attachment; filename=visites.xlsx"));
    }

    @Test
    @WithMockUser(roles = "VISITEUR")
    public void testExportAsVisiteur_Forbidden() throws Exception {
        mockMvc.perform(get("/api/v1/reports/export")
                .param("format", "pdf"))
                .andExpect(status().isForbidden());
    }
}
