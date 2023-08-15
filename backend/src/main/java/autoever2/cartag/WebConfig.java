package autoever2.cartag;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://www.a2cartag.com/**")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods("GET")
                .allowedHeaders("*");
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}