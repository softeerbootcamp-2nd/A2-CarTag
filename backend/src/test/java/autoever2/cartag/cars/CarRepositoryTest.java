package autoever2.cartag.cars;

import autoever2.cartag.cars.dto.CarInfoDto;
import autoever2.cartag.cars.dto.CarTypeDto;
import autoever2.cartag.cars.dto.TrimInfoDto;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@JdbcTest
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insert-carinfo-h2.sql"})
@DisplayName("UnitTest: CarRepository")
@ExtendWith(SoftAssertionsExtension.class)
class CarRepositoryTest {

    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    private final CarRepository carRepository;

    @Autowired
    public CarRepositoryTest(DataSource dataSource) {
        carRepository = new CarRepository(dataSource);
    }

    @Test
    @DisplayName("CarType별 트림 리스트를 반환")
    void findCars() {
        CarInfoDto carInfoDto = CarInfoDto.builder()
                .carId(1).trim("Le Blanc").carDefaultPrice(40000000).outerImage("image_1").innerImage("image_2").wheelImage("image_3").carDescription("Good").build();

        List<CarInfoDto> carByCarType = carRepository.findCarByCarType(1);

        softAssertions.assertThat(carByCarType.size()).isEqualTo(4);
        softAssertions.assertThat(carByCarType.get(0)).usingRecursiveComparison().isEqualTo(carInfoDto);
    }

    @Test
    @DisplayName("car에 있는 총 구매횟수 데이터를 반환")
    void findCarBoughtCountByCarId() {
        int carId = 1;
        int invalidId = 7;
        Long boughtCount = carRepository.findCarBoughtCountByCarId(carId).orElse(-1L);
        softAssertions.assertThat(boughtCount).isEqualTo(234L);
        softAssertions.assertThat(carRepository.findCarBoughtCountByCarId(invalidId)).isNotPresent();
    }

    @Test
    @DisplayName("차종 리스트 반환")
    void findAllCarTypeList() {
        List<CarTypeDto> expected = new ArrayList<>();
        expected.add(CarTypeDto.builder().carTypeId(1).carTypeName("펠리세이드").carTypeImage("image_1").build());
        expected.add(CarTypeDto.builder().carTypeId(2).carTypeImage("/cartype/santafe.png").carTypeName("싼타페").build());
        expected.add(CarTypeDto.builder().carTypeId(3).carTypeImage("/cartype/the-all-new-kona-hybrid.png").carTypeName("디 올 뉴 코나 Hybrid").build());
        List<CarTypeDto> result = carRepository.findAllCarType();
        softAssertions.assertThat(result).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("차량 트림 정보를 반환")
    void getTrimInfo() {
        TrimInfoDto expected = TrimInfoDto.builder().carId(1).trim("Le Blanc").carDefaultPrice(40000000).build();
        Optional<TrimInfoDto> trimInfo = carRepository.findTrimInfoByCarId(1);
        softAssertions.assertThat(trimInfo).isPresent();
        softAssertions.assertThat(trimInfo.get()).usingRecursiveComparison().isEqualTo(expected);
        softAssertions.assertThat(carRepository.findTrimInfoByCarId(7)).isNotPresent();
    }

    @Test
    @DisplayName("차량 기본 금액을 반환")
    void getCarDefaultPrice() {
        int carId = 1;
        int invalidId = 7;
        int expected = 40000000;

        softAssertions.assertThat(carRepository.findCarPriceByCarId(carId)).isPresent();
        softAssertions.assertThat(carRepository.findCarPriceByCarId(carId).get()).isEqualTo(expected);
        softAssertions.assertThat(carRepository.findCarPriceByCarId(invalidId)).isNotPresent();
    }
}