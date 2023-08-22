package autoever2.cartag.integration;

import autoever2.cartag.controller.QuoteController;
import autoever2.cartag.domain.quote.HistoryShortDto;
import autoever2.cartag.domain.quote.QuoteDataDto;
import autoever2.cartag.recommend.RecommendConnector;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Sql({"classpath:insert/insert-sales-h2.sql"})
@ExtendWith({SoftAssertionsExtension.class})
public class QuoteTest {

    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    @Autowired
    QuoteController quoteController;
    @Autowired
    private RecommendConnector connector;

//    @Test
//    @DisplayName("유사견적 간략정보 호출 API 통합테스트")
//    void historyIntegrationTest() {
//        QuoteDataDto quoteDataDto = QuoteDataDto.builder()
//                .carId(1)
//                .powerTrainId(1)
//                .bodyTypeId(3)
//                .operationId(5)
//                .optionIdList(List.of(69))
//                .build();
//
//        List<HistoryShortDto> expected = new ArrayList<>();
//        expected.add(HistoryShortDto.builder()
//                .historyId(129L)
//                .soldCount(155)
//                .build());
//        expected.add(HistoryShortDto.builder()
//                .historyId(161L)
//                .soldCount(140)
//                .build());
//        expected.add(HistoryShortDto.builder()
//                .historyId(137L)
//                .soldCount(162)
//                .build());
//        expected.add(HistoryShortDto.builder()
//                .historyId(169L)
//                .soldCount(140)
//                .build());
//
//        List<List<Integer>> response = new ArrayList<>();
//        response.add(List.of(70));
//        response.add(List.of(74));
//        response.add(List.of(71));
//        response.add(List.of(84));
//        given(connector.request(quoteDataDto)).willReturn(response);
//
//        List<HistoryShortDto> result = quoteController.getRecommendedList(quoteDataDto);
//
//        softAssertions.assertThat(result).usingRecursiveComparison().isEqualTo(expected);
//    }
}
