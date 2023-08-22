package autoever2.cartag.service;

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
import autoever2.cartag.repository.CarRepository;
import autoever2.cartag.repository.ColorRepository;
import autoever2.cartag.repository.ModelRepository;
import autoever2.cartag.repository.OptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    private final OptionRepository optionRepository;

    private final ColorRepository colorRepository;

    private final ModelRepository modelRepository;

    public List<CarTypeDto> getAllCarTypes() {
        return carRepository.findAllCarType();
    }

    // TODO Optional로 감싸진 값이 empty일 경우 어떤 예외 발생시킬지 정하기
    public List<CarDto> findCarByCarType(int carType) {
        List<CarInfoDto> carInfos = carRepository.findCarByCarType(carType);
        if (carInfos.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }

        return carInfos.stream()
                .map(carInfoDto -> CarDto.toDto(carInfoDto, optionRepository.findDefaultOptionByCarId(carInfoDto.getCarId())))
                .collect(Collectors.toList());
    }

    public CarDefaultDto findCarDefaultDtoByCarId(int carId) {
        List<OuterColorDto> outerColorList = colorRepository.findOuterColorCarByCarId(carId);
        List<InnerColorDto> innerColorList = colorRepository.findInnerColorCarByCarId(carId);
        List<ModelDefaultDto> modelList = modelRepository.findModelDefaultDtoByCarId(carId);
        if (outerColorList.isEmpty() || innerColorList.isEmpty() || modelList.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        int colorId = outerColorList.get(0).getColorId();
        Optional<String> colorCarOuterImage = colorRepository.findOuterColorImagesByColorId(colorId);
        if (colorCarOuterImage.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        String value = colorCarOuterImage.get();
        String outerImageUrl = value.substring(0, value.indexOf("*")) + 1 + value.substring(value.indexOf("*") + 1, value.length());

        return CarDefaultDto.toDefault(outerColorList.get(0), innerColorList.get(0), modelList, outerImageUrl);
    }

    public List<BoughtCarDto> findAllBoughInfos() {
        List<CarPriceDto> carPriceAndCount = carRepository.findCarPriceAndCount();
        List<SubOptionIdAndPriceDto> allSubOptionInfo = optionRepository.findAllSubOptionInfo();
        Map<Integer, Long> subOptionPrice = allSubOptionInfo.stream()
                .collect(Collectors.toMap(SubOptionIdAndPriceDto::getOptionId, SubOptionIdAndPriceDto::getOptionPrice));
        Map<Long, Integer> map = new HashMap<>();
        for (int i = 0; i < carPriceAndCount.size(); i++) {
            Long sum = 0L;
            if(!carPriceAndCount.get(i).getOptionList().isEmpty()){
                String[] split = carPriceAndCount.get(i).getOptionList().split(",");
                for (String s : split) {
                    sum += subOptionPrice.get(Integer.parseInt(s));
                }
            }
            long key = ((carPriceAndCount.get(i).getPrice() + sum) / 100000) * 100000;
            map.put(key, map.getOrDefault(key, 0) + 1);
        }
        List<BoughtCarDto> list = map.entrySet().stream()
                .map(entry -> BoughtCarDto.builder()
                        .totalPrice(entry.getKey())
                        .count(entry.getValue())
                        .build())
                .collect(Collectors.toList());

        return list;

    }

    public QuoteInfoDto findShareInfoDto(QuoteDataDto idList) {
        int carId = idList.getCarId();
        int powerTrainId = idList.getPowerTrainId();
        int bodyTypeId = idList.getBodyTypeId();
        int operationId = idList.getOperationId();
        int outerColorId = idList.getOuterColorId();
        int innerColorId = idList.getInnerColorId();
        List<Integer> optionIdList = idList.getOptionIdList();

        Optional<TrimInfoDto> trimInfo = carRepository.findTrimInfoByCarId(carId);
        List<ModelDefaultDto> modelInfos = modelRepository.findModelListByModelId(powerTrainId, bodyTypeId, operationId);
        Optional<InnerColorDto> innerColorInfo = colorRepository.findInnerColorByColorId(innerColorId);
        Optional<OuterColorDto> outerColorInfo = colorRepository.findOuterColorByColorId(outerColorId);
        List<QuoteSubOptionDto> optionInfos = new ArrayList<>();
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
        OuterColorDto outerColorDto = outerColorInfo.get();
        String imageUrl = changeUrl(outerColorDto.getColorCarImage(), 1);
        return QuoteInfoDto.toInfoDto(trimInfo.get(), outerColorDto, innerColorInfo.get(), modelInfos, optionInfos, imageUrl);

    }

    public String changeUrl(String value, int index) {
        return value.substring(0, value.indexOf("*")) + index + value.substring(value.indexOf("*") + 1, value.length());
    }


}
