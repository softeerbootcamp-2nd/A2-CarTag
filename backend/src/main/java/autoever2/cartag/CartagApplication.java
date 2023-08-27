package autoever2.cartag;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CartagApplication {
	public static void main(String[] args) {
		SpringApplication.run(CartagApplication.class, args);
	}
}
