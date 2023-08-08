package autoever2.cartag.repository;

import autoever2.cartag.domain.car.CarInfoDto;
import autoever2.cartag.domain.car.DefaultOptionDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class CarRepositoryTest {

    @Autowired
    private CarRepository repository;

    @Test
    @DisplayName("CarType 별 트림 리스트를 반환합니다.")
    void findCars(){
        List<CarInfoDto> carByCarType = repository.findCarByCarType(1);

        Assertions.assertEquals(carByCarType.size(), 4);
    }

    @Test
    @DisplayName("carId에 해당하는 모든 defaultOption을 가져옵니다.")
    void findDefaultOptions(){
        List<DefaultOptionDto> defaultOptionByCarId = repository.findDefaultOptionByCarId(1);

        Assertions.assertEquals(defaultOptionByCarId.size(), 3);
    }


}