package autoever2.cartag.integration;

import autoever2.cartag.controller.CarController;
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
    CarController controller;

    @Test
    @DisplayName("/api/cars/infos/defaults?carid=1 테스트")
    void defaultCarInfos(){
        CarDefaultDto carDefaultDto = controller.carDefaultDto(1);
        assertEquals("디젤2.2", carDefaultDto.getPowerTrainName());
        assertEquals("7인승", carDefaultDto.getBodyTypeName());
        assertEquals(0, carDefaultDto.getOperationPrice());
        assertEquals("천연 퀄팅(블랙)", carDefaultDto.getColorOuterImageName());
        assertEquals("퍼플 그레이 펄", carDefaultDto.getColorInnerImageName());
    }
}
