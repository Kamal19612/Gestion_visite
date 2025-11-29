package com.NativIA.GestionVisite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GestionVisiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionVisiteApplication.class, args);
	}

}
