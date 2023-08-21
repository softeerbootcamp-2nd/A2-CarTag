package autoever2.cartag.integration;

import autoever2.cartag.controller.TrimController;
import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.exception.EmptyDataException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insertCar-h2.sql"})
public class TrimTest {
    @Autowired
    TrimController controller;

    @Test
    @DisplayName("cartype에 종속적인 차량 리스트 반환 api를 테스트 합니다.")
    void testCarController() {
        List<CarDto> cars = controller.carTrimInfo(1);
        assertEquals("Le Blanc", cars.get(0).getTrim());
        assertEquals(40000000, cars.get(1).getCarDefaultPrice());
        assertEquals("image_1", cars.get(2).getOuterImage());
        assertEquals("image_2", cars.get(3).getInnerImage());
        assertThrows(EmptyDataException.class, () -> {
            controller.carTrimInfo(2);
        });
    }
}
