package com.freshnest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(
    scanBasePackages = "com.chickendelivery",
    exclude = UserDetailsServiceAutoConfiguration.class
)
@EntityScan(basePackages = "com.chickendelivery.entity")
@EnableJpaRepositories(basePackages = "com.chickendelivery.repository")
public class GroceryDeliverySystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(
            GroceryDeliverySystemApplication.class,
            args
        );
    }
}