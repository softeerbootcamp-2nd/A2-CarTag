package autoever2.cartag.repository;

import autoever2.cartag.domain.car.CarDefaultInfoDto;
import autoever2.cartag.domain.car.CarInfoDto;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@JdbcTest
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insertCar-h2.sql"})
class CarRepositoryTest {

    private final CarRepository carRepository;

    @Autowired
    public CarRepositoryTest(DataSource dataSource) {
        carRepository = new CarRepository(dataSource);
    }


    @Test
    @DisplayName("CarType 별 트림 리스트를 반환합니다.")
    void findCars() {
        List<CarInfoDto> carByCarType = carRepository.findCarByCarType(1);
        assertEquals(4, carByCarType.size());
        assertEquals("Le Blanc", carByCarType.get(0).getTrim());
        assertEquals(40000000, carByCarType.get(0).getCarDefaultPrice());
    }

    @Test
    @DisplayName("car에 있는 총 구매횟수 데이터를 반환")
    void findCarBoughtCountByCarId() {
        //given
        int carId = 1;
        //when
        Long boughtCount = carRepository.findCarBoughtCountByCarId(carId).orElse(-1L);
        //then
        assertEquals(234L, boughtCount);

    }

    @Test
    @DisplayName("차량의 기본 정보들을 반환합니다.")
    void finDefaultInfos(){
        CarDefaultInfoDto carDefaultInfoDto = carRepository.findCarDefaultByCarId(1).get();
        assertEquals("Le Blanc", carDefaultInfoDto.getTrim());
        assertEquals(40000000, carDefaultInfoDto.getCarDefaultPrice());

        Optional<CarDefaultInfoDto> defaults = carRepository.findCarDefaultByCarId(5);
        assertEquals(Optional.empty(), defaults);
    }
}