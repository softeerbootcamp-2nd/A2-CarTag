package autoever2.cartag.integration;

import autoever2.cartag.controller.CarController;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import autoever2.cartag.domain.share.QuoteIdList;
import autoever2.cartag.domain.share.QuoteInfoDto;
import autoever2.cartag.exception.EmptyDataException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Sql({"classpath:insert/insert-quote-h2.sql"})
public class QuoteTest {
    @Autowired
    CarController controller;

    @Test
    @DisplayName("/api/cars//infos/shares")
    void testShare() {
        ArrayList<Integer> optionIds = new ArrayList<>();
        optionIds.add(1);
        optionIds.add(2);
        optionIds.add(3);
        QuoteIdList quoteIdList = QuoteIdList
                .builder()
                .carId(1)
                .powerTrainId(1)
                .operationId(3)
                .bodyTypeId(5)
                .innerColorId(4)
                .outerColorId(1)
                .optionIdList(optionIds)
                .build();

        QuoteInfoDto quoteInfoDto = controller.boughtCarDtos(quoteIdList);

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
}
