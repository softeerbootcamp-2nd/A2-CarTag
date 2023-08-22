package autoever2.cartag.repository;

import autoever2.cartag.domain.quote.HistorySearchDto;
import autoever2.cartag.domain.quote.HistoryShortDto;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.sql.DataSource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ActiveProfiles("test")
@JdbcTest
@Sql({"classpath:insert/insert-sales-h2.sql"})
@ExtendWith(SoftAssertionsExtension.class)
class QuoteRepositoryTest {

    @InjectSoftAssertions
    SoftAssertions softAssertions;

    private final QuoteRepository quoteRepository;

    @Autowired
    public QuoteRepositoryTest(DataSource dataSource) {
        quoteRepository = new QuoteRepository(dataSource);
    }

    @Test
    void findShortData() {
        HistorySearchDto search1 = HistorySearchDto.builder()
                        .carId(1)
                        .powerTrainId(1)
                        .bodyTypeId(3)
                        .operationId(5)
                        .optionIds(List.of(69, 70))
                        .build();
        HistorySearchDto search2 = HistorySearchDto.builder()
                .carId(1)
                .powerTrainId(1)
                .bodyTypeId(3)
                .operationId(5)
                .optionIds(List.of(69, 74))
                .build();

        HistoryShortDto expected1 = HistoryShortDto.builder()
                        .historyId(129L)
                        .soldCount(155)
                        .build();
        HistoryShortDto expected2 = HistoryShortDto.builder()
                .historyId(161L)
                .soldCount(140)
                .build();

        assertTrue(quoteRepository.findShortData(search1).isPresent());
        assertTrue(quoteRepository.findShortData(search2).isPresent());
        softAssertions.assertThat(quoteRepository.findShortData(search1).get()).usingRecursiveComparison().isEqualTo(expected1);
        softAssertions.assertThat(quoteRepository.findShortData(search2).get()).usingRecursiveComparison().isEqualTo(expected2);
    }
}