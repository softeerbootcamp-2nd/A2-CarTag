package autoever2.cartag.quotes;

import autoever2.cartag.cars.CarRepository;
import autoever2.cartag.quotes.dtos.BoughtCarDto;
import autoever2.cartag.cars.dto.TrimInfoDto;
import autoever2.cartag.quotes.dtos.HistoryTotalModelPriceDto;
import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.models.dto.ModelDefaultDto;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import autoever2.cartag.domain.option.SubOptionIdAndPriceDto;
import autoever2.cartag.quotes.dtos.HistorySearchDto;
import autoever2.cartag.quotes.dtos.HistoryShortDto;
import autoever2.cartag.quotes.dtos.QuoteDataDto;
import autoever2.cartag.quotes.dtos.QuoteInfoDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.exception.InvalidDataException;
import autoever2.cartag.recommend.RecommendConnector;
import autoever2.cartag.repository.ColorRepository;
import autoever2.cartag.models.ModelRepository;
import autoever2.cartag.repository.OptionRepository;
import autoever2.cartag.quotes.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import static autoever2.cartag.parser.ImageUrlParser.changeUrl;

@Service
@RequiredArgsConstructor
public class QuoteService {

    private final OptionRepository optionRepository;
    private final QuoteRepository quoteRepository;
    private final CarRepository carRepository;
    private final RecommendConnector recommendConnector;
    private final ModelRepository modelRepository;
    private final ColorRepository colorRepository;

    public HistoryShortDto findMyQuote(QuoteDataDto quoteDataDto) {
        List<Integer> optionIds = quoteDataDto.getOptionIdList();
        Collections.sort(optionIds);

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
        Collections.sort(optionIds);

        if(optionIds.isEmpty()) {
            throw new InvalidDataException(ErrorCode.INVALID_PARAMETER);
        }
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

    public List<Integer> getHistoryById(Long historyId) {
        return quoteRepository.findOptionListFromHistoryId(historyId);
    }

    public List<QuoteSubOptionDto> getOptionDifference(List<Integer> optionsToCompare, Long historyId) {
        List<Integer> historyOptions = quoteRepository.findOptionListFromHistoryId(historyId);
        historyOptions = historyOptions.stream().filter(id -> !optionsToCompare.contains(id)).collect(Collectors.toList());

        return historyOptions.stream().map(id -> optionRepository.findSubOptionByOptionId(id).orElseThrow(() -> new EmptyDataException(ErrorCode.INTERNAL_SERVER_ERROR))).collect(Collectors.toList());
    }

    public List<BoughtCarDto> findAllBoughtInfos(int carId) {

        int trimPrice = carRepository.findCarPriceByCarId(carId).orElseThrow(() -> new EmptyDataException(ErrorCode.INVALID_PARAMETER));

        List<HistoryTotalModelPriceDto> defaultModelPriceWithOptionIds = quoteRepository.findHistoryTotalModelPriceByCarId(carId);

        List<SubOptionIdAndPriceDto> allSubOptionInfo = optionRepository.findAllSubOptionInfo(carId);

        return defaultModelPriceWithOptionIds.stream().map(HistoryTotalModelPriceDto -> {
            List<Integer> optionIdList = parseOptionId(HistoryTotalModelPriceDto.getSoldOptionsId());
            long optionPrice = allSubOptionInfo.stream()
                    .filter(subOptionIdAndPriceDto -> optionIdList.contains(subOptionIdAndPriceDto.getOptionId()))
                    .mapToLong(SubOptionIdAndPriceDto::getOptionPrice).sum();

            return BoughtCarDto.builder()
                    .count(HistoryTotalModelPriceDto.getSoldCount())
                    .totalPrice(optionPrice + trimPrice + HistoryTotalModelPriceDto.getModelPrice())
                    .build();
        }).collect(Collectors.toList());
    }

    private List<Integer> parseOptionId(String optionIds) {
        StringTokenizer stringTokenizer = new StringTokenizer(optionIds, ",");
        List<Integer> optionIdList = new ArrayList<>();
        while (stringTokenizer.hasMoreTokens()) {
            optionIdList.add(Integer.parseInt(stringTokenizer.nextToken()));
        }

        return optionIdList;
    }

    public QuoteInfoDto getAllCarInfoByQuoteDataDto(QuoteDataDto quoteDataDto) {
        int carId = quoteDataDto.getCarId();
        int powerTrainId = quoteDataDto.getPowerTrainId();
        int bodyTypeId = quoteDataDto.getBodyTypeId();
        int operationId = quoteDataDto.getOperationId();
        int outerColorId = quoteDataDto.getOuterColorId();
        int innerColorId = quoteDataDto.getInnerColorId();
        List<Integer> optionIdList = quoteDataDto.getOptionIdList();

        Optional<TrimInfoDto> trimInfo = carRepository.findTrimInfoByCarId(carId);
        List<ModelDefaultDto> modelInfos = modelRepository.findAllModelListByModel(powerTrainId, operationId, bodyTypeId);
        Optional<InnerColorDto> innerColorInfo = colorRepository.findInnerColorByColorId(innerColorId);
        Optional<OuterColorDto> outerColorInfo = colorRepository.findOuterColorByColorId(outerColorId);
        List<QuoteSubOptionDto> optionInfos = new ArrayList<>();
        if(modelInfos.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }

        if(!optionIdList.isEmpty()) {
            for (Integer id : optionIdList) {
                Optional<QuoteSubOptionDto> optionInfo = optionRepository.findSubOptionByOptionId(id);
                if (optionInfo.isPresent()) {
                    optionInfos.add(optionInfo.get());
                    continue;
                }
                throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
            }
        }
        OuterColorDto outerColorDto = outerColorInfo.orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS));
        String imageUrl = changeUrl(outerColorDto.getColorCarImage());
        return QuoteInfoDto.toInfoDto(trimInfo.orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS)), outerColorDto, innerColorInfo.orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS)), modelInfos, optionInfos, imageUrl);

    }
}
