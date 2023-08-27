package autoever2.cartag;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.cache.CacheManager;
import org.springframework.cache.support.NoOpCacheManager;
import org.springframework.context.annotation.Bean;

@TestConfiguration
public class RedisConfig {
    @Bean(name = "contentCacheManager")
    public CacheManager contentCacheManager() {
        return new NoOpCacheManager();
    }
}