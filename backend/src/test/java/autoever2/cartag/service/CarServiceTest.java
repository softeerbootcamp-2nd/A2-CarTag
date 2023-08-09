package autoever2.cartag.service;

import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.domain.car.CarInfoDto;
import autoever2.cartag.domain.car.DefaultOptionDto;
import autoever2.cartag.repository.CarRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

    @InjectMocks
    private CarService service;

    @Mock
    private CarRepository repository;

    private List<CarInfoDto> carInfoDtoList;

    private List<DefaultOptionDto> defaultOptionDtoList;

    @BeforeEach
    void setup() {
        carInfoDtoList = new ArrayList<>();
        defaultOptionDtoList = new ArrayList<>();

        defaultOptionDtoList.add(DefaultOptionDto
                .builder()
                .optionName("안전 하차 보조")
                .optionImage("image_1")
                .optionDescription("좋은 보조 장치")
                .defaultOptionCount(42)
                .build());
        defaultOptionDtoList.add(DefaultOptionDto
                .builder()
                .optionName("후측방 충둘 경고")
                .optionImage("image_2")
                .optionDescription("좋은 보조 장치")
                .defaultOptionCount(98)
                .build());
        defaultOptionDtoList.add(DefaultOptionDto
                .builder()
                .optionName("후방 교차 충돌 보조 장치")
                .optionImage("image_3")
                .optionDescription("좋은 보조 장치")
                .defaultOptionCount(41)
                .build());

        carInfoDtoList.add(CarInfoDto
                .builder()
                .carId(1)
                .trim("Le Blanc")
                .carDefaultPrice(123423)
                .outerImage("image_1")
                .innerImage("image_2")
                .wheelImage("image_3")
                .carDescription("Good")
                .build());

        carInfoDtoList.add(CarInfoDto
                .builder()
                .carId(2)
                .trim("Exclusive")
                .carDefaultPrice(123423)
                .outerImage("image_1")
                .innerImage("image_2")
                .wheelImage("image_3")
                .carDescription("Good")
                .build());

        carInfoDtoList.add(CarInfoDto
                .builder()
                .carId(3)
                .trim("Calligraphy")
                .carDefaultPrice(123423)
                .outerImage("image_1")
                .innerImage("image_2")
                .wheelImage("image_3")
                .carDescription("Good")
                .build());

        carInfoDtoList.add(CarInfoDto
                .builder()
                .carId(4)
                .trim("Prestige")
                .carDefaultPrice(123423)
                .outerImage("image_1")
                .innerImage("image_2")
                .wheelImage("image_3")
                .carDescription("Good")
                .build());
    }

    @Test
    @DisplayName("트림 리스트와 기본 옵션을 반환")
    void getCarType() {
        //given
        int carId = 1;
        int carType = 1;

        when(repository.findCarByCarType(carType)).thenReturn(carInfoDtoList);
        when(repository.findDefaultOptionByCarId(carId)).thenReturn(defaultOptionDtoList);

        List<CarDto> carByCarType = service.findCarByCarType(carType);

        assertEquals(carByCarType.size(), 4);
        assertEquals(carByCarType.get(0).getOptions().size(), 3);


    }

}