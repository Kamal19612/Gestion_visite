package com.NativIA.GestionVisite.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.NativIA.GestionVisite.controllers.VisiteController;
import com.NativIA.GestionVisite.DTO.Response.visiteResponse;
import com.NativIA.GestionVisite.Services.visiteService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.Setter;

import com.NativIA.GestionVisite.DTO.Request.visiteRequest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
@Getter
@Setter 
public class VisiteIntegrationTest {

    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private visiteService service;

    private visiteResponse sampleResponse(long id, String motif) {
        visiteResponse r = new visiteResponse();
        r.setId(id);
        r.setMotif(motif);
        r.setDate("2025-11-29");
        return r;
    }

    @BeforeEach
    public void setup() {
        VisiteController controller = new VisiteController(service);
        this.mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    public void createVisiteReturnsLocationAndPersisted() throws Exception {
        visiteResponse created = sampleResponse(123L, "Réunion test");
        when(service.create(org.mockito.ArgumentMatchers.any())).thenReturn(created);

        visiteRequest req = new visiteRequest();
        req.setDate("2025-11-29");
        req.setHEntree("09:00");
        req.setMotif("Réunion test");

        MvcResult res = mockMvc.perform(post("/api/v1/visites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/v1/visites/123"))
                .andReturn();

        String body = res.getResponse().getContentAsString();
        visiteResponse resp = objectMapper.readValue(body, visiteResponse.class);
        assertThat(resp.getId()).isEqualTo(123L);
        assertThat(resp.getMotif()).isEqualTo("Réunion test");
    }

    @Test
    public void checkInAndCheckOutFlow() throws Exception {
        visiteResponse afterCheckin = sampleResponse(200L, "Visite check flow");
        afterCheckin.setHEntree("2025-11-29T08:30:00");
        visiteResponse afterCheckout = sampleResponse(200L, "Visite check flow");
        afterCheckout.setHEntree("2025-11-29T08:30:00");
        afterCheckout.setHSortie("2025-11-29T10:00:00");

        when(service.checkIn(anyLong())).thenReturn(afterCheckin);
        when(service.checkOut(anyLong())).thenReturn(afterCheckout);

        mockMvc.perform(post("/api/v1/visites/200/checkin"))
                .andExpect(status().isOk());

        MvcResult res = mockMvc.perform(post("/api/v1/visites/200/checkout"))
                .andExpect(status().isOk())
                .andReturn();

        visiteResponse resp = objectMapper.readValue(res.getResponse().getContentAsString(), visiteResponse.class);
        assertThat(resp.getHSortie()).isNotNull();
    }
}
