package autoever2.cartag.quotes;

import autoever2.cartag.cars.CarRepository;
import autoever2.cartag.cars.dto.TrimDataDto;
import autoever2.cartag.colors.dto.ColorDto;
import autoever2.cartag.options.dto.QuoteSubOptionDto;
import autoever2.cartag.options.dto.SubOptionIdAndPriceDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.InvalidDataException;
import autoever2.cartag.models.ModelRepository;
import autoever2.cartag.models.dto.ModelDefaultDto;
import autoever2.cartag.quotes.dtos.*;
import autoever2.cartag.recommend.RecommendConnector;
import autoever2.cartag.colors.ColorRepository;
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
import java.util.Optional;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SoftAssertionsExtension.class})
@DisplayName("UnitTest: QuoteService")
class QuoteServiceTest {

    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    @InjectMocks
    private QuoteService quoteService;
    @Mock
    private OptionRepository optionRepository;
    @Mock
    private QuoteRepository quoteRepository;
    @Mock
    private RecommendConnector recommendConnector;
    @Mock
    private CarRepository carRepository;
    @Mock
    private ModelRepository modelRepository;
    @Mock
    private ColorRepository colorRepository;

    @Test
    @DisplayName("내 견적의 ID와 판매량 반환")
    void getMyQuoteShortData() {
        QuoteRequestDto input = QuoteRequestDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).outerColorId(5).innerColorId(1).optionIdList(List.of(69, 70)).build();

        QuoteRequestDto notExistInput = QuoteRequestDto.builder()
                .carId(1).powerTrainId(1).operationId(4).bodyTypeId(6).outerColorId(5).innerColorId(1).optionIdList(List.of(75, 77)).build();

        QuoteSearchDto quoteSearchDto = QuoteSearchDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).optionIds(List.of(69, 70)).build();

        HistoryShortDto expected = HistoryShortDto.builder().historyId(129L).soldCount(155).build();
        Optional<HistoryShortDto> historyDto = Optional.of(expected);

        when(quoteRepository.findShortQuoteDataBySearchDto(quoteSearchDto)).thenReturn(historyDto);

        softAssertions.assertThat(quoteService.getMyQuoteShortData(input)).usingRecursiveComparison().isEqualTo(expected);
        softAssertions.assertThat(quoteService.getMyQuoteShortData(notExistInput)).usingRecursiveComparison().isEqualTo(HistoryShortDto.builder().build());
    }

    @Test
    @DisplayName("추천 견적들의 ID와 판매량 반환")
    void getSuggestedQuoteShortData() {
        QuoteRequestDto input = QuoteRequestDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).outerColorId(5).innerColorId(1).optionIdList(List.of(70, 69)).build();

        QuoteRequestDto invalidInput = QuoteRequestDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).outerColorId(5).innerColorId(1).optionIdList(List.of(70, 75)).build();

        QuoteRequestDto emptyInput = QuoteRequestDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).outerColorId(5).innerColorId(1).optionIdList(new ArrayList<>()).build();

        when(optionRepository.countExistingOptionsByOptionIds(input.getCarId(), input.getOptionIdList())).thenReturn(2L);
        when(optionRepository.countExistingOptionsByOptionIds(invalidInput.getCarId(), invalidInput.getOptionIdList())).thenReturn(1L);

        List<List<Integer>> response = new ArrayList<>();
        response.add(List.of(72));
        response.add(List.of(74));
        response.add(List.of(71));
        response.add(List.of(84));

        when(recommendConnector.request(input)).thenReturn(response);

        when(quoteRepository.findShortQuoteDataBySearchDto(QuoteSearchDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).optionIds(List.of(69, 70, 72)).build())).thenReturn(Optional.of(HistoryShortDto.builder().historyId(129L).soldCount(155).build()));

        lenient().when(quoteRepository.findShortQuoteDataBySearchDto(QuoteSearchDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).optionIds(List.of(69, 70, 74)).build())).thenReturn(Optional.of(HistoryShortDto.builder().historyId(161L).soldCount(140).build()));
        lenient().when(quoteRepository.findShortQuoteDataBySearchDto(QuoteSearchDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).optionIds(List.of(69, 70, 71)).build())).thenReturn(Optional.empty());
        lenient().when(quoteRepository.findShortQuoteDataBySearchDto(QuoteSearchDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).optionIds(List.of(69, 70, 84)).build())).thenReturn(Optional.of(HistoryShortDto.builder().historyId(169L).soldCount(140).build()));

        List<HistoryShortDto> expected = List.of(HistoryShortDto
                .builder().historyId(129L).soldCount(155).build(), HistoryShortDto.builder()
                .historyId(161L).soldCount(140).build(), HistoryShortDto.builder().historyId(169L).soldCount(140).build());

        List<HistoryShortDto> result = quoteService.getSuggestedQuoteShortData(input);

        softAssertions.assertThat(quoteService.getSuggestedQuoteShortData(emptyInput)).isEqualTo(new ArrayList<>());
        softAssertions.assertThat(quoteService.getSuggestedQuoteShortData(input)).usingRecursiveComparison().isEqualTo(expected);
        softAssertions.assertThatThrownBy(() -> quoteService.getSuggestedQuoteShortData(invalidInput)).isInstanceOf(InvalidDataException.class);
    }

    @Test
    @DisplayName("판매 견적들의 금액 분포 반환")
    void getPriceDistribution() {
        int carId = 1;
        when(carRepository.findCarPriceByCarId(carId)).thenReturn(Optional.of(41980000));

        List<QuoteModelPriceDto> modelPriceDtos = List.of(
                QuoteModelPriceDto.builder().modelPrice(1480000L).soldCount(91).soldOptionsId("").build(),
                QuoteModelPriceDto.builder().modelPrice(1480000L).soldCount(71).soldOptionsId("").build(),
                QuoteModelPriceDto.builder().modelPrice(3850000L).soldCount(84).soldOptionsId("").build(),
                QuoteModelPriceDto.builder().modelPrice(2370000L).soldCount(80).soldOptionsId("69").build(),
                QuoteModelPriceDto.builder().modelPrice(3850000L).soldCount(152).soldOptionsId("69,70").build());

        when(quoteRepository.findQuoteTotalModelPriceByCarId(carId)).thenReturn(modelPriceDtos);

        List<SubOptionIdAndPriceDto> subOptionDtos = List.of(SubOptionIdAndPriceDto.builder()
                .optionId(69).optionPrice(1090000L).build(), SubOptionIdAndPriceDto.builder().optionId(70).optionPrice(790000L).build());

        when(optionRepository.findAllSubOptionPriceByCarId(carId)).thenReturn(subOptionDtos);

        List<BoughtCarDto> expected = List.of(
                BoughtCarDto.builder().totalPrice(43000000L).count(162).build(),
                BoughtCarDto.builder().totalPrice(45000000L).count(164).build(),
                BoughtCarDto.builder().totalPrice(47000000L).count(152).build());

        softAssertions.assertThat(quoteService.getPriceDistribution(carId)).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("내 견적의 상세 데이터 반환")
    void integrateAllInfo() {
        int carId = 1;
        TrimDataDto trimInfo = TrimDataDto.builder().carId(1).carDefaultPrice(41980000).trim("Le Blanc").build();
        when(carRepository.findTrimInfoByCarId(carId)).thenReturn(Optional.of(trimInfo));

        ModelDefaultDto model1 = ModelDefaultDto.builder()
                .modelId(1).modelName("디젤2.2").modelImage("/model/diesel2-2.jpg").modelTypeName("파워트레인").modelPrice(1480000L).build();
        ModelDefaultDto model2 = ModelDefaultDto.builder()
                .modelId(3).modelName("2WD").modelImage("/model/2wd.png").modelTypeName("구동방식").modelPrice(0L).build();
        ModelDefaultDto model3 = ModelDefaultDto.builder()
                .modelId(5).modelName("7인승").modelImage("/model/7seats.jpg").modelTypeName("바디 타입").modelPrice(0L).build();
        List<ModelDefaultDto> modelInfos = List.of(model1, model2, model3);

        List<ModelDefaultDto> invalidModelInfos = List.of(model1, model2);
        int powerTrainId = 1;
        int operationId = 3;
        int bodyTypeId = 5;
        when(modelRepository.findAllModelListByModel(powerTrainId, operationId, bodyTypeId)).thenReturn(modelInfos);
        when(modelRepository.findAllModelListByModel(powerTrainId, operationId, 4)).thenReturn(invalidModelInfos);

        int innerColorId = 1;
        int outerColorId = 4;
        ColorDto innerColor = ColorDto.builder().colorId(innerColorId).colorCarImage("black_1.jpg").colorPrice(2000L).colorImage("퀄팅 천연(블랙)").build();
        ColorDto outerColor = ColorDto.builder().colorId(outerColorId).colorCarImage("red_*.jpg").colorPrice(0L).colorImage("퍼플 펄").build();

        when(colorRepository.findColorDataByColorId(innerColorId, false)).thenReturn(Optional.of(innerColor));
        when(colorRepository.findColorDataByColorId(outerColorId, true)).thenReturn(Optional.of(outerColor));

        QuoteSubOptionDto option69 = QuoteSubOptionDto.builder()
                .optionId(69).optionName("컴포트2").optionPrice(1090000L).optionTitle("상세품목").optionImage("/options/rear-passenger.png").build();
        QuoteSubOptionDto option70 = QuoteSubOptionDto.builder()
                .optionId(70).optionName("현대스마트센스1").optionPrice(790000L).optionTitle("상세품목").optionImage("/forward-distance.png").build();
        List<QuoteSubOptionDto> optionList = List.of(option69, option70);

        when(optionRepository.findSubOptionByOptionId(69)).thenReturn(Optional.of(option69));
        when(optionRepository.findSubOptionByOptionId(70)).thenReturn(Optional.of(option70));

        QuoteRequestDto requestDto = QuoteRequestDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(5).innerColorId(1).outerColorId(4).optionIdList(List.of(69, 70)).build();

        QuoteRequestDto invalidRequest = QuoteRequestDto.builder()
                .carId(1).powerTrainId(1).operationId(3).bodyTypeId(4).innerColorId(1).outerColorId(4).optionIdList(List.of(69, 70)).build();

        QuoteInfoDto expected = QuoteInfoDto.builder()
                .trimData(trimInfo).powertrainData(modelInfos.get(0)).operationData(modelInfos.get(1)).bodyTypeData(modelInfos.get(2)).outerColor(outerColor).innerColor(innerColor).optionList(optionList).build();

        softAssertions.assertThatThrownBy(() -> quoteService.getAllCarInfoByQuoteDataDto(invalidRequest)).isInstanceOf(EmptyDataException.class);
        softAssertions.assertThat(quoteService.getAllCarInfoByQuoteDataDto(requestDto)).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("내 견적과 유사견적의 옵션 차이 반환")
    void getOptionDifference() {
        Long myQuoteId = 129L;
        Long quoteIdToCompare = 945L;

        when(quoteRepository.findOptionListFromHistoryId(myQuoteId)).thenReturn(List.of(69, 70));
        when(quoteRepository.findOptionListFromHistoryId(quoteIdToCompare)).thenReturn(List.of(69, 70, 71));

        QuoteSubOptionDto subOptionDto = QuoteSubOptionDto.builder()
                .optionId(71).optionName("주차보조 시스템2").optionImage("/options/pca.png").optionPrice(690000L).optionTitle("상세품목").build();

        when(optionRepository.findSubOptionByOptionId(71)).thenReturn(Optional.of(subOptionDto));

        softAssertions.assertThat(quoteService.getOptionDifference(myQuoteId, quoteIdToCompare)).usingRecursiveComparison().isEqualTo(List.of(subOptionDto));
    }
}