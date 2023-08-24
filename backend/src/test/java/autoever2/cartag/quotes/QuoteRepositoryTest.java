package autoever2.cartag.quotes;

import autoever2.cartag.quotes.dtos.QuoteSearchDto;
import autoever2.cartag.quotes.dtos.HistoryShortDto;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
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


//    @Test
//    @DisplayName("차량 가격 정보와 optionIdList를 반환하는 로직")
//    void getPriceAndOptionList(){
//        List<HistoryTotalModelPriceDto> totalInfo = quoteRepository.findHistoryTotalModelPriceByCarId();
//
//        assertEquals(11, totalInfo.size());
//        assertEquals(41480000L, totalInfo.get(0).getPrice());
//
//        String emptyOptionList = totalInfo.get(0).getOptionList();
//        assertTrue(emptyOptionList.isEmpty());
//
//        String optionList = totalInfo.get(10).getOptionList();
//        assertTrue(!optionList.isEmpty());
//        assertEquals(69, Integer.parseInt(optionList));
//    }
}