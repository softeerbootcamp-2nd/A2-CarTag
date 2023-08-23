package autoever2.cartag.cars;

import autoever2.cartag.cars.dto.CarVo;
import autoever2.cartag.cars.dto.CarTypeDto;
import autoever2.cartag.exception.EmptyDataException;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insertCar-h2.sql"})
@DisplayName("Integration: Car")
@ExtendWith(SoftAssertionsExtension.class)
public class CarTest {
    @Autowired
    CarController controller;

    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    @Test
    @DisplayName("/api/cars/types?cartype=1 통합테스트")
    void testCarTypes() {
        List<CarVo> cars = controller.carTrimInfo(1);
        softAssertions.assertThat(cars.get(0).getTrim()).isEqualTo("Le Blanc");
        softAssertions.assertThat(cars.get(1).getCarDefaultPrice()).isEqualTo(40000000);
        softAssertions.assertThat(cars.get(2).getOuterImage()).isEqualTo("image_1");
        softAssertions.assertThat(cars.get(3).getInnerImage()).isEqualTo("image_2");
        softAssertions.assertThatThrownBy(() -> controller.carTrimInfo(100)).isInstanceOf(EmptyDataException.class);
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
