package autoever2.cartag.service;

import autoever2.cartag.cars.CarService;
import autoever2.cartag.cars.dto.*;
import autoever2.cartag.domain.car.*;
import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.domain.model.ModelDefaultDto;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import autoever2.cartag.domain.option.SubOptionIdAndPriceDto;
import autoever2.cartag.domain.quote.QuoteDataDto;
import autoever2.cartag.domain.quote.QuoteInfoDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.cars.CarRepository;
import autoever2.cartag.repository.ColorRepository;
import autoever2.cartag.repository.ModelRepository;
import autoever2.cartag.repository.OptionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

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
        when(carRepository.findCarByCarType(2)).thenThrow(new EmptyDataException(ErrorCode.DATA_NOT_EXISTS));

        List<CarDto> carByCarType = carService.findCarByCarType(carType);

        assertEquals(carByCarType.size(), 4);
        assertEquals(carByCarType.get(0).getOptions().size(), 3);
        assertThatThrownBy(() -> carService.findCarByCarType(2)).isInstanceOf(EmptyDataException.class);
    }

    @Test
    @DisplayName("DB에서 받아온 차종을 Controller로 전달")
    void carTypeList() {
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

        when(carRepository.findAllCarType()).thenReturn(carTypeList);

        assertEquals(carTypeList, carService.getAllCarTypes());
    }

    @Test
    @DisplayName("service에서 공유 정보를 통합합니다.")
    void integrateAllInfo() {

        TrimInfoDto trimInfo = TrimInfoDto
                .builder()
                .carId(1)
                .carDefaultPrice(4000000)
                .trim("Le Blanc")
                .build();
        when(carRepository.findTrimInfoByCarId(1)).thenReturn(Optional.of(trimInfo));

        List<ModelDefaultDto> modelList = new ArrayList<>();
        modelList.add(ModelDefaultDto
                .builder()
                .modelId(1)
                .modelName("디젤2.2")
                .modelImage("/model/diesel2-2.jpg")
                .modelTitle("파워트레인")
                .modelPrice(12999L)
                .build());
        modelList.add(ModelDefaultDto
                .builder()
                .modelId(3)
                .modelName("2WD")
                .modelImage("/model/2wd.png")
                .modelTitle("구동방식")
                .modelPrice(0L)
                .build());
        modelList.add(ModelDefaultDto
                .builder()
                .modelId(5)
                .modelName("7인승")
                .modelImage("/model/7seats.jpg")
                .modelTitle("바디 타입")
                .modelPrice(9999L)
                .build());
        when(modelRepository.findModelListByModelId(1, 3, 5)).thenReturn(modelList);


        OuterColorDto outerColor = OuterColorDto
                .builder()
                .colorId(4)
                .colorCarImage("red_*.jpg")
                .colorPrice(1500L)
                .colorImage("퍼플 펄")
                .build();

        InnerColorDto innerColor = InnerColorDto
                .builder()
                .colorId(1)
                .colorCarImage("black_1.jpg")
                .colorPrice(2000L)
                .colorImage("퀄팅 천연(블랙)")
                .build();
        when(colorRepository.findInnerColorByColorId(1)).thenReturn(Optional.of(innerColor));
        when(colorRepository.findOuterColorByColorId(4)).thenReturn(Optional.of(outerColor));


        ArrayList<Integer> idList = new ArrayList<>();
        idList.add(1);

        QuoteSubOptionDto subOption = QuoteSubOptionDto
                .builder()
                .optionId(1)
                .optionName("2열 통풍 시트")
                .optionPrice(14999L)
                .optionTitle("상세품목")
                .optionImage("/images/options/sub/2seats.jpg")
                .build();

        when(optionRepository.findSubOptionByOptionId(1)).thenReturn(Optional.of(subOption));

        QuoteInfoDto shareInfoDto = carService.findShareInfoDto(QuoteDataDto.builder()
                .carId(1)
                .powerTrainId(1)
                .bodyTypeId(3)
                .operationId(5)
                .innerColorId(1)
                .outerColorId(4)
                .optionIdList(idList)
                .build());

        assertEquals(1, shareInfoDto.getCarId());
        assertEquals("내장 색상", shareInfoDto.getColorInnerTitle());
        assertEquals(9999L, shareInfoDto.getBodyTypePrice());
        assertEquals(1, shareInfoDto.getOptionList().size());
        assertEquals("퍼플 펄", shareInfoDto.getColorOuterImage());
        assertEquals("red_1.jpg", shareInfoDto.getColorCarOuterImage());
    }

    @Test
    @DisplayName("service 영역에서 조합을 통한 정보 통합")
    void getTotalInfo() {
        List<CarPriceDto> carPriceDtos = new ArrayList<>();
        carPriceDtos.add(CarPriceDto
                .builder()
                .price(43000000L)
                .optionList("12,14")
                .build());
        carPriceDtos.add(CarPriceDto
                .builder()
                .price(45660000L)
                .optionList("22,25")
                .build());
        carPriceDtos.add(CarPriceDto
                .builder()
                .price(51200000L)
                .optionList("30,33")
                .build());
        carPriceDtos.add(CarPriceDto
                .builder()
                .price(59900000L)
                .optionList("41,42")
                .build());

        List<SubOptionIdAndPriceDto> subOptionIdAndPriceDtos = new ArrayList<>();
        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto
                .builder()
                .optionId(12)
                .optionPrice(1000L)
                .build());
        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto
                .builder()
                .optionId(14)
                .optionPrice(0L)
                .build());
        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto
                .builder()
                .optionId(22)
                .optionPrice(1000L)
                .build());
        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto
                .builder()
                .optionId(25)
                .optionPrice(9000L)
                .build());
        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto
                .builder()
                .optionId(30)
                .optionPrice(45000L)
                .build());
        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto
                .builder()
                .optionId(33)
                .optionPrice(3000L)
                .build());
        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto
                .builder()
                .optionId(41)
                .optionPrice(1200L)
                .build());
        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto
                .builder()
                .optionId(42)
                .optionPrice(90000L)
                .build());
        when(carRepository.findCarPriceAndCount()).thenReturn(carPriceDtos);
        when(optionRepository.findAllSubOptionInfo()).thenReturn(subOptionIdAndPriceDtos);

        List<BoughtCarDto> allBoughInfos = carService.findAllBoughInfos();

        assertEquals(4, allBoughInfos.size());

        BoughtCarDto boughtCarDto = allBoughInfos.get(0);
        assertEquals(43000000L, boughtCarDto.getTotalPrice());
        assertEquals(1, boughtCarDto.getCount());
    }

}