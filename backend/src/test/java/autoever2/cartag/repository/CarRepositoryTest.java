package autoever2.cartag.repository;

import autoever2.cartag.domain.car.CarInfoDto;
import autoever2.cartag.domain.car.CarPriceDto;
import autoever2.cartag.domain.car.CarTypeDto;
import autoever2.cartag.domain.car.TrimInfoDto;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@JdbcTest
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insert-boughtinfo-h2.sql"})
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
    @DisplayName("차종 리스트 반환")
    void findAllCarTypeList() {
        //given
        List<CarTypeDto> expected = new ArrayList<>();
        expected.add(CarTypeDto.builder()
                .carTypeId(1)
                .carTypeName("펠리세이드")
                .carTypeImage("image_1")
                .build());
        expected.add(CarTypeDto.builder()
                .carTypeId(2)
                .carTypeImage("/cartype/santafe.png")
                .carTypeName("싼타페")
                .build());
        expected.add(CarTypeDto.builder()
                .carTypeId(3)
                .carTypeImage("/cartype/the-all-new-kona-hybrid.png")
                .carTypeName("디 올 뉴 코나 Hybrid")
                .build());

        //when
        List<CarTypeDto> result = carRepository.findAllCarType();

        //then
        softAssertions.assertThat(result).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("차량 트림 정보를 반환")
    void getTrimInfo() {
        Optional<TrimInfoDto> trimInfo = carRepository.findTrimInfoByCarId(1);
        assertTrue(trimInfo.isPresent());

        TrimInfoDto infoDto = trimInfo.get();
        assertEquals("Le Blanc", infoDto.getTrim());
        assertEquals(40000000, infoDto.getCarDefaultPrice());

        Optional<TrimInfoDto> trimNoFoundInfo = carRepository.findTrimInfoByCarId(7);
        assertTrue(trimNoFoundInfo.isEmpty());
    }

    @Test
    @DisplayName("차량 가격 정보와 optionIdList를 반환하는 로직")
    void getPriceAndOptionList(){
        List<CarPriceDto> totalInfo = carRepository.findCarPriceAndCount();

        assertEquals(11, totalInfo.size());
        assertEquals(41480000L, totalInfo.get(0).getPrice());

        String emptyOptionList = totalInfo.get(0).getOptionList();
        assertTrue(emptyOptionList.isEmpty());

        String optionList = totalInfo.get(10).getOptionList();
        assertTrue(!optionList.isEmpty());
        assertEquals(69, Integer.parseInt(optionList));
    }
}