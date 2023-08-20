package autoever2.cartag.integration;

import autoever2.cartag.controller.TrimController;
import autoever2.cartag.domain.car.CarDefaultDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insert-default-h2.sql"})
public class DefaultTest {

    @Autowired
    TrimController controller;

    @Test
    @DisplayName("차량 기본 정보들을 반환")
    void defaultCarInfos(){
        CarDefaultDto carDefaultDto = controller.carDefaultDto(1);
        assertEquals("르블랑", carDefaultDto.getTrim());
        assertEquals("디젤2.2", carDefaultDto.getPowerTrainName());
        assertEquals("2WD", carDefaultDto.getBodyTypeName());
        assertEquals(0, carDefaultDto.getOperationPrice());
        assertEquals("천연 퀄팅(블랙)", carDefaultDto.getColorOuterImageName());
        assertEquals("퍼플 그레이 펄", carDefaultDto.getColorInnerImageName());
    }
}
