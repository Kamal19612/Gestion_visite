package com.NativIA.GestionVisite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.NativIA.GestionVisite.DAO.userRepository;
import com.NativIA.GestionVisite.Entities.User;
import com.NativIA.GestionVisite.Enum.Roles;

@SpringBootApplication
@EnableJpaAuditing 
public class GestionVisiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionVisiteApplication.class, args);
	}

	@Bean
	public CommandLineRunner createDefaultUser(@Autowired userRepository userRepository,
											@Autowired PasswordEncoder passwordEncoder) {
		return args -> {
			String defaultEmail = "user@example.com";
			if (userRepository.findByEmail(defaultEmail).isEmpty()) {
				User u = new User();
				u.setName("Default User");
				u.setEmail(defaultEmail);
				u.setPassword(passwordEncoder.encode("Password123!"));
				// Create a non-admin default user to avoid duplicating admin accounts
				u.setRole(Roles.VISITEUR);
				userRepository.save(u);
				System.out.println("Default user created: email=user@example.com password=Password123!");
			}
		};
	}

}
