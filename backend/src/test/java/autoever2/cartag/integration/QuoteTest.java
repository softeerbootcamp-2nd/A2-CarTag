package autoever2.cartag.integration;

import autoever2.cartag.controller.QuoteController;
import autoever2.cartag.domain.car.BoughtCarDto;
import autoever2.cartag.domain.quote.QuoteDataDto;
import autoever2.cartag.domain.quote.QuoteInfoDto;
import autoever2.cartag.recommend.RecommendConnector;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import autoever2.cartag.controller.CarController;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class QuoteTest {

    @Autowired
    QuoteController quoteController;

    @Autowired
    CarController carController;

    @Test
    @DisplayName("/api/quote/infos/shares")
    @Sql({"classpath:insert/insert-quote-h2.sql"})
    void testShare() {
        ArrayList<Integer> optionIds = new ArrayList<>();
        optionIds.add(1);
        optionIds.add(2);
        optionIds.add(3);
        QuoteDataDto quoteIdList = QuoteDataDto
                .builder()
                .carId(1)
                .powerTrainId(1)
                .operationId(3)
                .bodyTypeId(5)
                .innerColorId(4)
                .outerColorId(1)
                .optionIdList(optionIds)
                .build();

        QuoteInfoDto quoteInfoDto = quoteController.getQuoteDetail(quoteIdList);

        assertEquals("르블랑", quoteInfoDto.getTrim());
        assertEquals(41980000, quoteInfoDto.getCarDefaultPrice());
        assertEquals("디젤2.2", quoteInfoDto.getPowerTrainName());
        assertEquals(0, quoteInfoDto.getBodyTypePrice());
        assertEquals("/model/2wd.png", quoteInfoDto.getOperationImage());
        assertEquals("천연 퀄팅(블랙)", quoteInfoDto.getColorOuterImageName());
        assertEquals("내장 색상", quoteInfoDto.getColorInnerTitle());

        List<QuoteSubOptionDto> optionList = quoteInfoDto.getOptionList();

        assertEquals(3, optionList.size());
        assertEquals("2열 통풍 시트", optionList.get(0).getOptionName());
        assertEquals("/images/options/sub/warmer.jpg", optionList.get(1).getOptionImage());
        assertEquals("악세사리", optionList.get(2).getOptionTitle());
    }

    @Test
    @DisplayName("/api/quote/bought/infos")
    @Sql({"classpath:insert/insert-boughtinfo-h2.sql"})
    void testBoughtInfo(){
        List<BoughtCarDto> allHistorySum = quoteController.getAllHistorySum();

        assertEquals(6, allHistorySum.size());
        assertEquals(2, allHistorySum.get(0).getCount());
        assertEquals(42300000L, allHistorySum.get(1).getTotalPrice());
    }
}
