package autoever2.cartag.cars;

import autoever2.cartag.cars.dto.*;
import autoever2.cartag.colors.dto.ColorDto;
import autoever2.cartag.models.dto.ModelDefaultDto;
import autoever2.cartag.options.dto.TrimDefaultOptionDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.colors.ColorRepository;
import autoever2.cartag.models.ModelRepository;
import autoever2.cartag.options.OptionRepository;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@DisplayName("UnitTest: CarService")
@ExtendWith({MockitoExtension.class, SoftAssertionsExtension.class})
class CarServiceTest {

    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    @InjectMocks
    private CarService carService;

    @Mock
    private CarRepository carRepository;
    @Mock
    private OptionRepository optionRepository;
    @Mock
    private ModelRepository modelRepository;
    @Mock
    private ColorRepository colorRepository;

    @Test
    @DisplayName("차종리스트를 반환")
    void carTypeList() {
        List<CarTypeDto> carTypeList = new ArrayList<>();
        carTypeList.add(CarTypeDto.builder().carTypeId(1).carTypeName("펠리세이드").carTypeImage("image_1").build());
        carTypeList.add(CarTypeDto.builder().carTypeId(2).carTypeImage("/cartype/santafe.png").carTypeName("싼타페").build());
        carTypeList.add(CarTypeDto.builder().carTypeId(3).carTypeImage("/cartype/the-all-new-kona-hybrid.png").carTypeName("디 올 뉴 코나 Hybrid").build());

        when(carRepository.findAllCarType()).thenReturn(carTypeList);

        softAssertions.assertThat(carService.getAllCarTypes()).usingRecursiveComparison().isEqualTo(carTypeList);
    }

    @Test
    @DisplayName("트림 리스트와 기본 옵션을 반환")
    void getCarType() {
        int carType = 1;
        List<CarInfoDto> carInfoDtoList = new ArrayList<>();
        carInfoDtoList.add(CarInfoDto.builder().carId(1).trim("Le Blanc").carDefaultPrice(123423).outerImage("image_1").innerImage("image_2").wheelImage("image_3").carDescription("Good").build());
        carInfoDtoList.add(CarInfoDto.builder().carId(2).trim("Exclusive").carDefaultPrice(123423).outerImage("image_1").innerImage("image_2").wheelImage("image_3").carDescription("Good").build());
        carInfoDtoList.add(CarInfoDto.builder().carId(3).trim("Calligraphy").carDefaultPrice(123423).outerImage("image_1").innerImage("image_2").wheelImage("image_3").carDescription("Good").build());
        carInfoDtoList.add(CarInfoDto.builder().carId(4).trim("Prestige").carDefaultPrice(123423).outerImage("image_1").innerImage("image_2").wheelImage("image_3").carDescription("Good").build());
        when(carRepository.findCarByCarType(carType)).thenReturn(carInfoDtoList);

        List<TrimDefaultOptionDto> trimDefaultOptionDtoList = new ArrayList<>();
        trimDefaultOptionDtoList.add(TrimDefaultOptionDto.builder().optionName("안전 하차 보조").optionImage("image_1").optionDescription("좋은 보조 장치").OptionUsedCount(42).build());
        trimDefaultOptionDtoList.add(TrimDefaultOptionDto.builder().optionName("후측방 충둘 경고").optionImage("image_2").optionDescription("좋은 보조 장치").OptionUsedCount(98).build());
        trimDefaultOptionDtoList.add(TrimDefaultOptionDto.builder().optionName("후방 교차 충돌 보조 장치").optionImage("image_3").optionDescription("좋은 보조 장치").OptionUsedCount(41).build());
        when(optionRepository.findDefaultOptionByCarId(1)).thenReturn(trimDefaultOptionDtoList);

        int invalidType = 4;
        List<CarInfoDto> invalid = new ArrayList<>();
        when(carRepository.findCarByCarType(invalidType)).thenReturn(invalid);

        List<CarVo> carByCarType = carService.getCarDtoByCarType(carType);

        CarVo expected = CarVo.builder().carId(1).trim("Le Blanc").carDefaultPrice(123423).outerImage("image_1").innerImage("image_2").wheelImage("image_3").carDescription("Good").options(trimDefaultOptionDtoList).build();

        softAssertions.assertThat(carByCarType.size()).isEqualTo(4);
        softAssertions.assertThat(carByCarType.get(0)).usingRecursiveComparison().isEqualTo(expected);
        softAssertions.assertThatThrownBy(() -> carService.getCarDtoByCarType(invalidType)).isInstanceOf(EmptyDataException.class);
    }

    @Test
    @DisplayName("차량의 기본 옵션 데이터를 반환")
    void getDefaultOptionData() {
        int carId = 1;
        ColorDto outer1 = ColorDto.builder().colorId(3).colorName("어비스 블랙 펄").colorImage("/color/outer/abyss-black.png").colorBoughtCount(38974L).colorCarImage("/color/outer/leblanc/abyss/image*.webp").build();
        ColorDto outer2 = ColorDto.builder().colorId(4).colorName("쉬머링 실버 메탈릭").colorImage("/color/outer/silver-metalic.png").colorBoughtCount(19364L).colorCarImage("/color/outer/leblanc/silver/image*.webp").build();

        ColorDto inner1 = ColorDto.builder().colorId(1).colorName("퀄팅천연(블랙)").colorImage("/color/inner/quilting-natural.png").colorBoughtCount(82065L).colorCarImage("/cartype/palisade/palisade-inner.png").build();
        ColorDto inner2 = ColorDto.builder().colorId(2).colorName("쿨그레이").colorImage("/color/inner/cool-gray.png").colorBoughtCount(67935L).colorCarImage("/color/inner/leblanc/cool-gray.png").build();

        ModelDefaultDto powerTrain = ModelDefaultDto.builder().modelId(1).modelName("디젤2.2").modelPrice(1480000L).modelImage("/model/diesel2-2.png").build();
        ModelDefaultDto operation = ModelDefaultDto.builder().modelId(3).modelName("2WD").modelImage("/model/2wd.png").build();
        ModelDefaultDto bodyType = ModelDefaultDto.builder().modelId(5).modelName("7인승").modelImage("/model/7seats.jpg").build();

        CarDefaultDto expected = CarDefaultDto.builder().powerTrainId(1).powerTrainName("디젤2.2").powerTrainImage("/model/diesel2-2.png").powerTrainPrice(1480000L).bodyTypeId(5).bodyTypeName("7인승").bodyTypeImage("/model/7seats.jpg").operationId(3).operationName("2WD").operationImage("/model/2wd.png").colorOuterId(3).colorOuterImageName("어비스 블랙 펄").colorOuterImage("/color/outer/abyss-black.png").colorCarOuterImage("/color/outer/leblanc/abyss/image1.webp").colorInnerId(1).colorInnerImageName("퀄팅천연(블랙)").colorInnerImage("/color/inner/quilting-natural.png").colorCarInnerImage("/cartype/palisade/palisade-inner.png").build();


        when(colorRepository.findOuterColorCarByCarId(carId)).thenReturn(List.of(outer1, outer2));
        when(colorRepository.findInnerColorCarByCarId(carId)).thenReturn(List.of(inner1, inner2));

        softAssertions.assertThatThrownBy(() -> carService.getCarDefaultDtoByCarId(carId)).isInstanceOf(EmptyDataException.class);

        when(modelRepository.findDefaultModelListByCarId(carId)).thenReturn(List.of(powerTrain, operation, bodyType));

        softAssertions.assertThat(carService.getCarDefaultDtoByCarId(carId)).usingRecursiveComparison().isEqualTo(expected);
    }
}