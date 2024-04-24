package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProductCrudapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductCrudapiApplication.class, args);
		System.out.println("My Product applicaon is running sucessfully...\n Open Postman Tool to test API");
	}

}
