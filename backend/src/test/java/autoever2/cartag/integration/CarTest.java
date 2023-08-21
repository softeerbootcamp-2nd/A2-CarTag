package autoever2.cartag.integration;

import autoever2.cartag.controller.CarController;
import autoever2.cartag.domain.car.CarDefaultDto;
import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.domain.car.CarTypeDto;
import autoever2.cartag.exception.EmptyDataException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insertCar-h2.sql"})
public class CarTest {
    @Autowired
    CarController controller;

    @Test
    @DisplayName("/api/cars/types?cartype=1 통합테스트")
    void testCarTypes() {
        List<CarDto> cars = controller.carTrimInfo(1);
        assertEquals("Le Blanc", cars.get(0).getTrim());
        assertEquals(40000000, cars.get(1).getCarDefaultPrice());
        assertEquals("image_1", cars.get(2).getOuterImage());
        assertEquals("image_2", cars.get(3).getInnerImage());
        assertThrows(EmptyDataException.class, () -> {
            controller.carTrimInfo(100);
        });
    }

    @Test
    @DisplayName("/api/cars/list 테스트")
    void testCarTypeList() {
        List<CarTypeDto> carTypeList = new ArrayList<>();
        carTypeList.add(CarTypeDto.builder()
                .carTypeId(1)
                .carTypeName("펠리세이드")
                .carTypeImage("image_1")
                .build());
        carTypeList.add(CarTypeDto.builder()
                .carTypeId(2)
                .carTypeImage("/cartype/santafe.png")
                .carTypeName("싼타페")
                .build());
        carTypeList.add(CarTypeDto.builder()
                .carTypeId(3)
                .carTypeImage("/cartype/the-all-new-kona-hybrid.png")
                .carTypeName("디 올 뉴 코나 Hybrid")
                .build());

        assertThat(controller.getCarTypeList()).usingRecursiveComparison().isEqualTo(carTypeList);
    }
}
