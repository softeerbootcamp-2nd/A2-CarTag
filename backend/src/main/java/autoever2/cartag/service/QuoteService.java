package autoever2.cartag.service;

import autoever2.cartag.domain.quote.HistorySearchDto;
import autoever2.cartag.domain.quote.HistoryShortDto;
import autoever2.cartag.domain.quote.QuoteDataDto;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.exception.InvalidDataException;
import autoever2.cartag.recommend.RecommendConnector;
import autoever2.cartag.repository.OptionRepository;
import autoever2.cartag.repository.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuoteService {

    private final OptionRepository optionRepository;
    private final QuoteRepository quoteRepository;
    private final RecommendConnector recommendConnector;

    public HistoryShortDto findMyQuote(QuoteDataDto quoteDataDto) {
        List<Integer> optionIds = quoteDataDto.getOptionIdList();

        HistorySearchDto historyData = HistorySearchDto.builder()
                .carId(quoteDataDto.getCarId())
                .powerTrainId(quoteDataDto.getPowerTrainId())
                .bodyTypeId(quoteDataDto.getBodyTypeId())
                .operationId(quoteDataDto.getOperationId())
                .optionIds(optionIds)
                .build();
        return quoteRepository.findShortData(historyData).orElse(HistoryShortDto.builder().build());
    }

    public List<HistoryShortDto> findTopHistory(QuoteDataDto quoteDataDto) {

        List<Integer> optionIds = quoteDataDto.getOptionIdList();
        if(optionIds.size() != optionRepository.countExistOptions(quoteDataDto.getCarId(), optionIds)) {
            throw new InvalidDataException(ErrorCode.INVALID_OPTIONS_REQUEST);
        }

        List<List<Integer>> result = recommendConnector.request(quoteDataDto);

        List<HistorySearchDto> historyList = result.stream().map(options -> {
            HistorySearchDto historyData = HistorySearchDto.builder()
                    .carId(quoteDataDto.getCarId())
                    .powerTrainId(quoteDataDto.getPowerTrainId())
                    .bodyTypeId(quoteDataDto.getBodyTypeId())
                    .operationId(quoteDataDto.getOperationId())
                    .optionIds(optionIds)
                    .build();
            historyData.addAllOption(options);

            return historyData;
        }).collect(Collectors.toList());

        return historyList.stream().map(historySearchDto ->
                quoteRepository.findShortData(historySearchDto).orElse(null)
        ).collect(Collectors.toList());
    }
}
