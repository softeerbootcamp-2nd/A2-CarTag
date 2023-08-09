package autoever2.cartag.repository;

import autoever2.cartag.domain.car.CarInfoDto;
import autoever2.cartag.domain.car.DefaultOptionDto;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.sql.DataSource;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@JdbcTest
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insertCar-h2.sql"})
class CarRepositoryTest {

    private final CarRepository repository;
    @Autowired
    public CarRepositoryTest(DataSource dataSource) {
        repository = new CarRepository(dataSource);
    }


    @Test
    @DisplayName("CarType 별 트림 리스트를 반환합니다.")
    void findCars() {
        List<CarInfoDto> carByCarType = repository.findCarByCarType(1);
        assertEquals(4, carByCarType.size());
        assertEquals("Le Blanc", carByCarType.get(0).getTrim());
        assertEquals(40000000, carByCarType.get(0).getCarDefaultPrice());
    }

    @Test
    @DisplayName("carId에 해당하는 모든 defaultOption을 가져옵니다.")
    void findDefaultOptions() {
        List<DefaultOptionDto> defaultOptionByCarId = repository.findDefaultOptionByCarId(1);
        assertEquals(3, defaultOptionByCarId.size());
        assertEquals("image_1", defaultOptionByCarId.get(0).getOptionName());
    }

    @Test
    @DisplayName("car에 있는 총 구매횟수 데이터를 반환")
    void findCarBoughtCountByCarId() {
        //given
        int carId = 1;
        //when
        Long boughtCount = repository.findCarBoughtCountByCarId(carId).orElse(-1L);
        //then
        assertEquals(234L, boughtCount);

    }
}