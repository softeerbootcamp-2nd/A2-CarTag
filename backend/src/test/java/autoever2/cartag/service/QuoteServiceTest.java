package autoever2.cartag.service;

import autoever2.cartag.domain.quote.HistorySearchDto;
import autoever2.cartag.domain.quote.HistoryShortDto;
import autoever2.cartag.domain.quote.QuoteDataDto;
import autoever2.cartag.recommend.RecommendConnector;
import autoever2.cartag.repository.OptionRepository;
import autoever2.cartag.repository.QuoteRepository;
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
    private QuoteRepository quoteRepository;

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
}