package com.cashiq.cashmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CashmanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(CashmanagementApplication.class, args);
	}

}
