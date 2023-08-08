package autoever2.cartag.service;

import autoever2.cartag.domain.car.CarDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class CarInfoDtoServiceTest {
    @Autowired
    private CarService service;
    @Test
    @DisplayName("펠리세이드에 해당하는 모든 트림을 반환합니다. 현재 : 4개")
    void checkCarType(){
        List<CarDto> cars = service.findCarByCarType(1);
        Assertions.assertThat(cars.size()).isEqualTo(4);
    }

}