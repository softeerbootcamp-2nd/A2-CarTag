package autoever2.cartag.quotes;

import autoever2.cartag.cars.CarRepository;
import autoever2.cartag.quotes.dtos.HistorySearchDto;
import autoever2.cartag.quotes.dtos.HistoryShortDto;
import autoever2.cartag.quotes.dtos.QuoteDataDto;
import autoever2.cartag.recommend.RecommendConnector;
import autoever2.cartag.repository.ColorRepository;
import autoever2.cartag.models.ModelRepository;
import autoever2.cartag.repository.OptionRepository;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SoftAssertionsExtension.class})
class QuoteServiceTest {

    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    @InjectMocks
    private QuoteService quoteService;

    @Mock
    private OptionRepository optionRepository;
    @Mock
    private CarRepository carRepository;
    @Mock
    private QuoteRepository quoteRepository;
    @Mock
    private ModelRepository modelRepository;
    @Mock
    private ColorRepository colorRepository;
    @Mock
    private RecommendConnector recommendConnector;

    @Test
    void findTopHistory() {
        //given
        QuoteDataDto quoteDataDto = QuoteDataDto.builder()
                .carId(1)
                .powerTrainId(1)
                .bodyTypeId(3)
                .operationId(5)
                .optionIdList(List.of(69))
                .build();

        List<List<Integer>> response = new ArrayList<>();
        response.add(List.of(70));
        response.add(List.of(74));
        response.add(List.of(71));
        response.add(List.of(84));

        List<HistoryShortDto> expected = new ArrayList<>();
        expected.add(HistoryShortDto.builder()
                .historyId(129L)
                .soldCount(155)
                .build());
        expected.add(HistoryShortDto.builder()
                .historyId(161L)
                .soldCount(140)
                .build());
        expected.add(HistoryShortDto.builder()
                .historyId(137L)
                .soldCount(162)
                .build());
        expected.add(HistoryShortDto.builder()
                .historyId(169L)
                .soldCount(140)
                .build());


        when(optionRepository.countExistOptions(quoteDataDto.getCarId(), quoteDataDto.getOptionIdList())).thenReturn(1L);
        when(recommendConnector.request(quoteDataDto)).thenReturn(response);

        when(quoteRepository.findShortData(HistorySearchDto.builder()
                .carId(1)
                .powerTrainId(1)
                .bodyTypeId(3)
                .operationId(5)
                .optionIds(List.of(69, 70))
                .build()))
                .thenReturn(Optional.of(HistoryShortDto.builder()
                        .historyId(129L)
                        .soldCount(155)
                        .build()));
        when(quoteRepository.findShortData(HistorySearchDto.builder()
                .carId(1)
                .powerTrainId(1)
                .bodyTypeId(3)
                .operationId(5)
                .optionIds(List.of(69, 74))
                .build()))
                .thenReturn(Optional.of(HistoryShortDto.builder()
                        .historyId(161L)
                        .soldCount(140)
                        .build()));
        when(quoteRepository.findShortData(HistorySearchDto.builder()
                .carId(1)
                .powerTrainId(1)
                .bodyTypeId(3)
                .operationId(5)
                .optionIds(List.of(69, 71))
                .build()))
                .thenReturn(Optional.of(HistoryShortDto.builder()
                        .historyId(137L)
                        .soldCount(162)
                        .build()));
        when(quoteRepository.findShortData(HistorySearchDto.builder()
                .carId(1)
                .powerTrainId(1)
                .bodyTypeId(3)
                .operationId(5)
                .optionIds(List.of(69, 84))
                .build()))
                .thenReturn(Optional.of(HistoryShortDto.builder()
                        .historyId(169L)
                        .soldCount(140)
                        .build()));

        //when
        List<HistoryShortDto> result = quoteService.findTopHistory(quoteDataDto);

        //then
        softAssertions.assertThat(result).usingRecursiveComparison().isEqualTo(expected);
    }

//    @Test
//    @DisplayName("service 영역에서 조합을 통한 정보 통합")
//    void getTotalInfo() {
//        List<HistoryTotalModelPriceDto> HistoryTotalModelPriceDtos = new ArrayList<>();
//        HistoryTotalModelPriceDtos.add(HistoryTotalModelPriceDto.builder().modelPrice(43000000L).soldOptionsId("12,14").build());
//        HistoryTotalModelPriceDtos.add(HistoryTotalModelPriceDto.builder().modelPrice(45660000L).soldOptionsId("22,25").build());
//        HistoryTotalModelPriceDtos.add(HistoryTotalModelPriceDto.builder().modelPrice(51200000L).soldOptionsId("30,33").build());
//        HistoryTotalModelPriceDtos.add(HistoryTotalModelPriceDto.builder().modelPrice(59900000L).soldOptionsId("41,42").build());
//
//        List<SubOptionIdAndPriceDto> subOptionIdAndPriceDtos = new ArrayList<>();
//        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto.builder().optionId(12).optionPrice(1000L).build());
//        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto.builder().optionId(14).optionPrice(0L).build());
//        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto.builder().optionId(22).optionPrice(1000L).build());
//        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto.builder().optionId(25).optionPrice(9000L).build());
//        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto.builder().optionId(30).optionPrice(45000L).build());
//        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto.builder().optionId(33).optionPrice(3000L).build());
//        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto.builder().optionId(41).optionPrice(1200L).build());
//        subOptionIdAndPriceDtos.add(SubOptionIdAndPriceDto.builder().optionId(42).optionPrice(90000L).build());
//        when(quoteRepository.findHistoryTotalModelPriceByCarId(1)).thenReturn(HistoryTotalModelPriceDtos);
//        when(optionRepository.findAllSubOptionInfo(1)).thenReturn(subOptionIdAndPriceDtos);
//
//        List<BoughtCarDto> allBoughInfos = quoteService.findAllBoughtInfos(1);
//
//        assertEquals(4, allBoughInfos.size());
//
//        BoughtCarDto boughtCarDto = allBoughInfos.get(0);
//        assertEquals(43000000L, boughtCarDto.getTotalPrice());
//        assertEquals(1, boughtCarDto.getCount());
//    }

//    @Test
//    @DisplayName("service에서 공유 정보를 통합합니다.")
//    void integrateAllInfo() {
//        int carId = 1;
//        TrimInfoDto trimInfo = TrimInfoDto.builder().carId(1).carDefaultPrice(4000000).trim("Le Blanc").build();
//        when(carRepository.findTrimInfoByCarId(carId)).thenReturn(Optional.of(trimInfo));
//
//        List<ModelDefaultDto> modelList = new ArrayList<>();
//        modelList.add(ModelDefaultDto.builder().modelId(1).modelName("디젤2.2").modelImage("/model/diesel2-2.jpg").modelTypeName("파워트레인").modelPrice(12999L).build());
//        modelList.add(ModelDefaultDto.builder().modelId(3).modelName("2WD").modelImage("/model/2wd.png").modelTypeName("구동방식").modelPrice(0L).build());
//        modelList.add(ModelDefaultDto.builder().modelId(5).modelName("7인승").modelImage("/model/7seats.jpg").modelTypeName("바디 타입").modelPrice(9999L).build());
//
//        OuterColorDto outerColor = OuterColorDto.builder().colorId(4).colorCarImage("red_*.jpg").colorPrice(1500L).colorImage("퍼플 펄").build();
//
//        InnerColorDto innerColor = InnerColorDto.builder().colorId(1).colorCarImage("black_1.jpg").colorPrice(2000L).colorImage("퀄팅 천연(블랙)").build();
//        when(colorRepository.findInnerColorByColorId(1)).thenReturn(Optional.of(innerColor));
//        when(colorRepository.findOuterColorByColorId(4)).thenReturn(Optional.of(outerColor));
//
//        ArrayList<Integer> idList = new ArrayList<>();
//        idList.add(1);
//
//        QuoteSubOptionDto subOption = QuoteSubOptionDto.builder().optionId(1).optionName("2열 통풍 시트").optionPrice(14999L).optionTitle("상세품목").optionImage("/images/options/sub/2seats.jpg").build();
//
//        when(optionRepository.findSubOptionByOptionId(1)).thenReturn(Optional.of(subOption));
//
//        QuoteInfoDto shareInfoDto = quoteService.getAllCarInfoByQuoteDataDto(QuoteDataDto.builder().carId(1).powerTrainId(1).bodyTypeId(3).operationId(5).innerColorId(1).outerColorId(4).optionIdList(idList).build());
//
//        assertEquals(1, shareInfoDto.getCarId());
//        assertEquals("내장 색상", shareInfoDto.getColorInnerTitle());
//        assertEquals(9999L, shareInfoDto.getBodyTypePrice());
//        assertEquals(1, shareInfoDto.getOptionList().size());
//        assertEquals("퍼플 펄", shareInfoDto.getColorOuterImage());
//        assertEquals("red_1.jpg", shareInfoDto.getColorCarOuterImage());
//    }
}