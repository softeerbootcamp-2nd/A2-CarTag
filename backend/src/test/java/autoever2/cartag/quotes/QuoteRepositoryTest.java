package autoever2.cartag.quotes;

import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.quotes.dtos.QuoteModelPriceDto;
import autoever2.cartag.quotes.dtos.QuoteSearchDto;
import autoever2.cartag.quotes.dtos.HistoryShortDto;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
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
@DisplayName("UnitTest: QuoteRepository")
class QuoteRepositoryTest {

    @InjectSoftAssertions
    SoftAssertions softAssertions;

    private final QuoteRepository quoteRepository;

    @Autowired
    public QuoteRepositoryTest(DataSource dataSource) {
        quoteRepository = new QuoteRepository(dataSource);
    }

    @Test
    @DisplayName("견적의 요약 정보를 반환")
    void findShortQuoteDataBySearchDto() {
        QuoteSearchDto search1 = QuoteSearchDto.builder()
                        .carId(1)
                        .powerTrainId(1)
                        .bodyTypeId(3)
                        .operationId(5)
                        .optionIds(List.of(69, 70))
                        .build();
        QuoteSearchDto search2 = QuoteSearchDto.builder()
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

        assertTrue(quoteRepository.findShortQuoteDataBySearchDto(search1).isPresent());
        assertTrue(quoteRepository.findShortQuoteDataBySearchDto(search2).isPresent());
        softAssertions.assertThat(quoteRepository.findShortQuoteDataBySearchDto(search1).get()).usingRecursiveComparison().isEqualTo(expected1);
        softAssertions.assertThat(quoteRepository.findShortQuoteDataBySearchDto(search2).get()).usingRecursiveComparison().isEqualTo(expected2);
    }


    @Test
    @DisplayName("판매 견적의 모든 가격 분포를 반환")
    void findQuoteTotalModelPriceByCarId(){
        int carId = 1;
        List<QuoteModelPriceDto> totalInfo = quoteRepository.findQuoteTotalModelPriceByCarId(carId);

        QuoteModelPriceDto expected0 = QuoteModelPriceDto.builder()
                .soldOptionsId("69,70")
                .soldCount(155)
                .modelPrice(1480000L)
                .build();
        QuoteModelPriceDto expected46 = QuoteModelPriceDto.builder()
                .soldOptionsId("69,84")
                .soldCount(149)
                .modelPrice(2370000L)
                .build();

        softAssertions.assertThat(totalInfo.size()).isEqualTo(47);
        softAssertions.assertThat(totalInfo.get(0)).usingRecursiveComparison().isEqualTo(expected0);
        softAssertions.assertThat(totalInfo.get(46)).usingRecursiveComparison().isEqualTo(expected46);
    }

    @Test
    @DisplayName("견적의 옵션 리스트를 반환")
    void findOptionListFromHistoryId() {
        Long historyId = 129L;
        Long invalidId = 500L;

        softAssertions.assertThat(quoteRepository.findOptionListFromHistoryId(historyId)).usingRecursiveComparison().isEqualTo(List.of(69, 70));
        softAssertions.assertThatThrownBy(() -> quoteRepository.findOptionListFromHistoryId(invalidId)).isInstanceOf(EmptyDataException.class);
    }
}