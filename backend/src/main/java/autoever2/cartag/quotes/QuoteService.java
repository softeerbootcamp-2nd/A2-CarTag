package autoever2.cartag.quotes;

import autoever2.cartag.cars.CarRepository;
import autoever2.cartag.quotes.dtos.BoughtCarDto;
import autoever2.cartag.cars.dto.TrimDataDto;
import autoever2.cartag.quotes.dtos.QuoteModelPriceDto;
import autoever2.cartag.colors.dto.ColorDto;
import autoever2.cartag.models.dto.ModelDefaultDto;
import autoever2.cartag.options.dto.QuoteSubOptionDto;
import autoever2.cartag.options.dto.SubOptionIdAndPriceDto;
import autoever2.cartag.quotes.dtos.QuoteSearchDto;
import autoever2.cartag.quotes.dtos.HistoryShortDto;
import autoever2.cartag.quotes.dtos.QuoteRequestDto;
import autoever2.cartag.quotes.dtos.QuoteInfoDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.exception.InvalidDataException;
import autoever2.cartag.recommend.RecommendConnector;
import autoever2.cartag.colors.ColorRepository;
import autoever2.cartag.models.ModelRepository;
import autoever2.cartag.options.OptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static autoever2.cartag.parser.ImageUrlParser.changeUrl;
import static autoever2.cartag.parser.OptionStringParser.parseOptionId;

@Service
@RequiredArgsConstructor
public class QuoteService {

    private final QuoteRepository quoteRepository;
    private final OptionRepository optionRepository;
    private final CarRepository carRepository;
    private final RecommendConnector recommendConnector;
    private final ModelRepository modelRepository;
    private final ColorRepository colorRepository;

    public HistoryShortDto getMyQuoteShortData(QuoteRequestDto quoteRequestDto) {
        List<Integer> optionIds = quoteRequestDto.getOptionIdList();
        Collections.sort(optionIds);

        QuoteSearchDto quoteSearchDto = QuoteSearchDto.builder()
                .carId(quoteRequestDto.getCarId()).powerTrainId(quoteRequestDto.getPowerTrainId()).bodyTypeId(quoteRequestDto.getBodyTypeId()).operationId(quoteRequestDto.getOperationId()).optionIds(optionIds).build();
        return quoteRepository.findShortQuoteDataBySearchDto(quoteSearchDto).orElse(HistoryShortDto.builder().build());
    }

    public List<HistoryShortDto> getSuggestedQuoteShortData(QuoteRequestDto quoteRequestDto) {

        List<Integer> optionIds = quoteRequestDto.getOptionIdList();
        Collections.sort(optionIds);

        if (optionIds.isEmpty()) {
            return new ArrayList<>();
        }
        if (optionIds.size() != optionRepository.countExistingOptionsByOptionIds(quoteRequestDto.getCarId(), optionIds)) {
            throw new InvalidDataException(ErrorCode.INVALID_OPTIONS_REQUEST);
        }

        List<List<Integer>> responseFromRecommend = recommendConnector.request(quoteRequestDto);

        List<QuoteSearchDto> quoteSearchList = responseFromRecommend.stream().map(options -> {
            QuoteSearchDto quoteSearchDto = QuoteSearchDto.builder()
                    .carId(quoteRequestDto.getCarId()).powerTrainId(quoteRequestDto.getPowerTrainId()).bodyTypeId(quoteRequestDto.getBodyTypeId()).operationId(quoteRequestDto.getOperationId()).optionIds(optionIds).build();
            quoteSearchDto.addAllOption(options);

            return quoteSearchDto;
        }).collect(Collectors.toList());

        return quoteSearchList.stream()
                .map(quoteSearchDto -> quoteRepository.findShortQuoteDataBySearchDto(quoteSearchDto).orElse(null)).filter(Objects::nonNull).collect(Collectors.toList());
    }

    public List<BoughtCarDto> getPriceDistribution(int carId) {
        int trimPrice = carRepository.findCarPriceByCarId(carId).orElseThrow(() -> new EmptyDataException(ErrorCode.INVALID_PARAMETER));

        List<QuoteModelPriceDto> modelPriceWithOptionIds = quoteRepository.findQuoteTotalModelPriceByCarId(carId);

        List<SubOptionIdAndPriceDto> allSubOptionInfo = optionRepository.findAllSubOptionPriceByCarId(carId);

        List<BoughtCarDto> allQuotePrice = modelPriceWithOptionIds.stream().map(totalModelPrice -> {
            List<Integer> optionIdList = parseOptionId(totalModelPrice.getSoldOptionsId());

            long optionPrice = allSubOptionInfo.stream()
                    .filter(subOptionIdAndPriceDto -> optionIdList.contains(subOptionIdAndPriceDto.getOptionId())).mapToLong(SubOptionIdAndPriceDto::getOptionPrice).sum();

            return BoughtCarDto.builder()
                    .count(totalModelPrice.getSoldCount()).totalPrice(((optionPrice + trimPrice + totalModelPrice.getModelPrice()) / 1000000) * 1000000).build();
        }).collect(Collectors.toList());

        List<BoughtCarDto> result = new ArrayList<>();
        allQuotePrice.stream()
                .collect(Collectors.groupingBy(BoughtCarDto::getTotalPrice, Collectors.summingInt(BoughtCarDto::getCount))).forEach((key, data) -> result.add(BoughtCarDto.builder().totalPrice(key).count(data).build()));

        result.sort(Comparator.comparing(BoughtCarDto::getTotalPrice));

        return result;
    }

    public QuoteInfoDto getAllCarInfoByQuoteDataDto(QuoteRequestDto quoteRequestDto) {
        int outerColorId = quoteRequestDto.getOuterColorId();
        int innerColorId = quoteRequestDto.getInnerColorId();
        List<Integer> optionIdList = quoteRequestDto.getOptionIdList();

        TrimDataDto trimData = carRepository.findTrimInfoByCarId(quoteRequestDto.getCarId()).orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS));
        List<ModelDefaultDto> modelInfos = modelRepository.findAllModelListByModel(quoteRequestDto.getPowerTrainId(), quoteRequestDto.getOperationId(), quoteRequestDto.getBodyTypeId());
        ColorDto innerColor = colorRepository.findColorDataByColorId(innerColorId, false).orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS));
        ColorDto outerColor = colorRepository.findColorDataByColorId(outerColorId, true).orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS));
        List<QuoteSubOptionDto> optionList = new ArrayList<>();

        innerColor.setColorType("내장 색상");
        outerColor.setColorType("외장 색상");

        if (modelInfos.size() != 3) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }

        if (!optionIdList.isEmpty()) {
            optionIdList.forEach(id -> optionList.add(optionRepository.findSubOptionByOptionId(id).orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS))));
        }
        String imageUrl = changeUrl(outerColor.getColorCarImage());
        outerColor.setColorCarImage(imageUrl);

        return QuoteInfoDto.builder()
                .trimData(trimData).powertrainData(modelInfos.get(0)).operationData(modelInfos.get(1)).bodyTypeData(modelInfos.get(2)).outerColor(outerColor).innerColor(innerColor).optionList(optionList).build();
    }

    public List<QuoteSubOptionDto> getOptionDifference(Long myQuoteId, Long quoteIdToCompare) {
        List<Integer> myQuoteOptions = quoteRepository.findOptionListFromHistoryId(myQuoteId);
        List<Integer> historyOptions = quoteRepository.findOptionListFromHistoryId(quoteIdToCompare);

        historyOptions = historyOptions.stream().filter(id -> !myQuoteOptions.contains(id)).collect(Collectors.toList());

        return historyOptions.stream()
                .map(id -> optionRepository.findSubOptionByOptionId(id).orElseThrow(() -> new EmptyDataException(ErrorCode.INTERNAL_SERVER_ERROR))).collect(Collectors.toList());
    }
}
