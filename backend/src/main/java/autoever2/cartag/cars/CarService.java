package autoever2.cartag.cars;

import autoever2.cartag.cars.dto.*;
import autoever2.cartag.domain.color.ColorDto;
import autoever2.cartag.models.dto.ModelDefaultDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.repository.ColorRepository;
import autoever2.cartag.models.ModelRepository;
import autoever2.cartag.repository.OptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static autoever2.cartag.parser.ImageUrlParser.changeUrl;

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

    public List<CarVo> getCarDtoByCarType(int carType) {
        List<CarInfoDto> carInfos = carRepository.findCarByCarType(carType);
        if (carInfos.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }

        return carInfos.stream()
                .map(carInfoDto -> CarVo.toVo(carInfoDto, optionRepository.findDefaultOptionByCarId(carInfoDto.getCarId())))
                .collect(Collectors.toList());
    }

    public CarDefaultDto getCarDefaultDtoByCarId(int carId) {
        List<ColorDto> outerColorList = colorRepository.findOuterColorCarByCarId(carId);
        List<ColorDto> innerColorList = colorRepository.findInnerColorCarByCarId(carId);
        List<ModelDefaultDto> modelList = modelRepository.findDefaultModelListByCarId(carId);
        if (outerColorList.isEmpty() || innerColorList.isEmpty() || modelList.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        String outerImageUrl = changeUrl(outerColorList.get(0).getColorCarImage());

        return CarDefaultDto.toDefault(outerColorList.get(0), innerColorList.get(0), modelList, outerImageUrl);
    }

}
