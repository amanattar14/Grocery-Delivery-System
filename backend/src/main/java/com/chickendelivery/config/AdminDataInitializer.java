package com.chickendelivery.config;

import com.chickendelivery.entity.Role;
import com.chickendelivery.entity.User;
import com.chickendelivery.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminDataInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            String adminEmail = "admin@freshnest.com";
            String adminPhone = "9999999999";

            // The admin already exists in the database.
            if (userRepository.existsByEmail(adminEmail)) {
                System.out.println("======================================");
                System.out.println("FRESHNEST ADMIN ALREADY EXISTS");
                System.out.println("Email : " + adminEmail);
                System.out.println("======================================");
                return;
            }

            // Prevent duplicate phone number errors.
            if (userRepository.existsByPhone(adminPhone)) {
                System.out.println("======================================");
                System.out.println("ADMIN ACCOUNT NOT CREATED");
                System.out.println(
                        "Phone number already exists: " + adminPhone
                );
                System.out.println(
                        "Please use a different unique phone number."
                );
                System.out.println("======================================");
                return;
            }

            User admin = new User();

            admin.setName("FreshNest Admin");
            admin.setEmail(adminEmail);
            admin.setPhone(adminPhone);

            // Encrypt the password before saving.
            admin.setPassword(
                    passwordEncoder.encode("Admin@123")
            );

            admin.setAddress("Pune, Maharashtra");
            admin.setRole(Role.ADMIN);
            admin.setActive(true);

            userRepository.save(admin);

            System.out.println("======================================");
            System.out.println("FRESHNEST ADMIN ACCOUNT CREATED");
            System.out.println("Email    : " + adminEmail);
            System.out.println("Password : Admin@123");
            System.out.println("Role     : ADMIN");
            System.out.println("======================================");
        };
    }
}