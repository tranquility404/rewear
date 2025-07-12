package com.tranquility.ReWear;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class ReWearApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReWearApplication.class, args);
	}

}
