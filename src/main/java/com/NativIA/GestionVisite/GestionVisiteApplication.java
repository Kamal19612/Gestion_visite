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
				// By default, mark visitor email as verified for ease of testing
				u.setEmailVerified(true);
				userRepository.save(u);
				System.out.println("Default user created: email=user@example.com password=Password123!");
			}
		};
	}

	@Bean
	public CommandLineRunner createDefaultAdmin(@Autowired userRepository userRepository,
						@Autowired PasswordEncoder passwordEncoder) {
		return args -> {
			String adminEmail = "admin@example.com";
			if (userRepository.findByEmail(adminEmail).isEmpty()) {
				User a = new User();
				a.setName("Admin User");
				a.setEmail(adminEmail);
				a.setPassword(passwordEncoder.encode("Password123!"));
				a.setRole(Roles.ADMIN);
				// Admin accounts created at startup are pre-verified
				a.setEmailVerified(true);
				userRepository.save(a);
				System.out.println("Default admin created: email=admin@example.com password=Password123!");
			}
		};
	}

	@Bean
	public CommandLineRunner createDefaultSecretary(@Autowired userRepository userRepository,
						@Autowired PasswordEncoder passwordEncoder) {
		return args -> {
			String secretaryEmail = "secretaire@example.com";
			if (userRepository.findByEmail(secretaryEmail).isEmpty()) {
				User s = new User();
				s.setName("Secretary User");
				s.setEmail(secretaryEmail);
				s.setPassword(passwordEncoder.encode("Password123!"));
				s.setRole(Roles.SECRETAIRE);
				// Secretary accounts created at startup are pre-verified
				s.setEmailVerified(true);
				userRepository.save(s);
				System.out.println("Default secretary created: email=secretaire@example.com password=Password123!");
			}
		};
	}

	@Bean
	public CommandLineRunner createDefaultEmployee(@Autowired userRepository userRepository,
						@Autowired PasswordEncoder passwordEncoder) {
		return args -> {
			String employeeEmail = "employe@example.com";
			if (userRepository.findByEmail(employeeEmail).isEmpty()) {
				User e = new User();
				e.setName("Employee User");
				e.setEmail(employeeEmail);
				e.setPassword(passwordEncoder.encode("Password123!"));
				e.setRole(Roles.EMPLOYEUR);
				// Employee accounts created at startup are pre-verified
				e.setEmailVerified(true);
				userRepository.save(e);
				System.out.println("Default employee created: email=employe@example.com password=Password123!");
			}
		};
	}

}
