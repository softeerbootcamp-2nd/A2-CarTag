package autoever2.cartag.service;

import autoever2.cartag.domain.car.*;
import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.domain.model.ModelDefaultDto;
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

    // TODO Optional로 감싸진 값이 empty일 경우 어떤 예외 발생시킬지 정하기
    public List<CarDto> findCarByCarType(int carType) {
        List<CarInfoDto> carInfos = carRepository.findCarByCarType(carType);
        if (carInfos.isEmpty()) {
            throw new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND);
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
            throw new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND);
        }
        int colorId = outerColorList.get(0).getColorId();
        Optional<String> colorCarOuterImage = colorRepository.findOuterColorImagesByColorId(colorId);
        if (colorCarOuterImage.isEmpty()) {
            throw new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND);
        }
        String value = colorCarOuterImage.get();
        String outerImageUrl = value.substring(0, value.indexOf("*")) + 1 + value.substring(value.indexOf("*") + 1, value.length());

        return CarDefaultDto.toDefault(outerColorList.get(0), innerColorList.get(0), modelList, outerImageUrl);
    }

    public List<BoughtCarDto> findAllBoughInfos() {
        List<CarPriceDto> carPriceAndCount = carRepository.findCarPriceAndCount();

        return carPriceAndCount.stream()
                .map(carPriceDto -> {
                    String optionList = carPriceDto.getOptionList();
                    String[] optionIdList = optionList.split(",");

                    Long sum = Arrays.stream(optionIdList)
                            .mapToLong(s -> optionRepository.findOptionPriceByOptionId(Integer.parseInt(s)).get())
                            .sum();

                    Long key = ((carPriceDto.getPrice() + sum) / 100000) * 1000000;

                    return Map.entry(key, 1);
                })
                .collect(Collectors.groupingByConcurrent(Map.Entry::getKey, Collectors.summingInt(Map.Entry::getValue)))
                .entrySet().stream()
                .map(entry -> BoughtCarDto.toBoughtCarDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }


}
