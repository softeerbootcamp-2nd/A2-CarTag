package autoever2.cartag.service;

import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.domain.car.CarInfoDto;
import autoever2.cartag.domain.car.TrimDefaultOptionDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.repository.CarRepository;
import autoever2.cartag.repository.OptionRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

    @InjectMocks
    private CarService service;

    @Mock
    private CarRepository carRepository;

    @Mock
    private OptionRepository optionRepository;

    private List<CarInfoDto> carInfoDtoList;

    private List<TrimDefaultOptionDto> trimDefaultOptionDtoList;

    @BeforeEach
    void setup() {
        carInfoDtoList = new ArrayList<>();
        trimDefaultOptionDtoList = new ArrayList<>();

        trimDefaultOptionDtoList.add(TrimDefaultOptionDto
                .builder()
                .optionName("안전 하차 보조")
                .optionImage("image_1")
                .optionDescription("좋은 보조 장치")
                .OptionUsedCount(42)
                .build());
        trimDefaultOptionDtoList.add(TrimDefaultOptionDto
                .builder()
                .optionName("후측방 충둘 경고")
                .optionImage("image_2")
                .optionDescription("좋은 보조 장치")
                .OptionUsedCount(98)
                .build());
        trimDefaultOptionDtoList.add(TrimDefaultOptionDto
                .builder()
                .optionName("후방 교차 충돌 보조 장치")
                .optionImage("image_3")
                .optionDescription("좋은 보조 장치")
                .OptionUsedCount(41)
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

        when(carRepository.findCarByCarType(carType)).thenReturn(carInfoDtoList);
        when(optionRepository.findDefaultOptionByCarId(carId)).thenReturn(trimDefaultOptionDtoList);
        when(carRepository.findCarByCarType(2)).thenThrow(new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND));

        List<CarDto> carByCarType = service.findCarByCarType(carType);

        assertEquals(carByCarType.size(), 4);
        assertEquals(carByCarType.get(0).getOptions().size(), 3);
        assertThatThrownBy(() -> service.findCarByCarType(2)).isInstanceOf(EmptyDataException.class);
    }

}