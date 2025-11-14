package com.NativIA.GestionVisite.DTO.Response;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class userResponse {

    private String name;
    private String email;

}
