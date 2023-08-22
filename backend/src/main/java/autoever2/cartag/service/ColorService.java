package autoever2.cartag.service;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.InnerColorPercentDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.domain.color.OuterColorPercentDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.repository.CarRepository;
import autoever2.cartag.repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Service
@RequiredArgsConstructor
public class ColorService {
    private final ColorRepository colorRepository;
    private final CarRepository carRepository;

    // TODO : 어떤 에러를 반환할지 생각합니다.

    public List<String> changeImageToImages(int colorId) {
        Optional<String> images = colorRepository.findOuterColorImagesByColorId(colorId);
        if (images.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        List<String> outerColorCarImages = new ArrayList<>();
        String value = images.get();
        IntStream.rangeClosed(1, 60)
                .forEach(i -> {
                    outerColorCarImages.add(changeUrl(value, i));
                });
        return outerColorCarImages;
    }

    public List<OuterColorPercentDto> findOuterColorByCarId(int carId) {
        List<OuterColorDto> outerColors = colorRepository.findOuterColorCarByCarId(carId);
        if (outerColors.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        Optional<Long> totalCount = carRepository.findCarBoughtCountByCarId(carId);
        return outerColors.stream()
                .map(outerColorDto -> OuterColorPercentDto.toPercent(outerColorDto, getPercent(totalCount,
                        outerColorDto.getColorBoughtCount()), changeUrl(outerColorDto.getColorCarImage(), 1)))
                .collect(Collectors.toList());
    }

    public List<InnerColorPercentDto> findInnerColorByCarId(int carId) {
        List<InnerColorDto> innerColors = colorRepository.findInnerColorCarByCarId(carId);
        if (innerColors.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        Optional<Long> totalCount = carRepository.findCarBoughtCountByCarId(carId);
        return innerColors.stream()
                .map(innerColorDto -> InnerColorPercentDto.toPercent(innerColorDto, getPercent(totalCount, innerColorDto.getColorBoughtCount())))
                .collect(Collectors.toList());
    }

    public int getPercent(Optional<Long> count, Long boughtCount) {
        if (count.isEmpty()) {
            return 0;
        }
        return boughtCount.intValue() * 100 / count.get().intValue();
    }

    public String changeUrl(String value, int index) {
        return value.substring(0, value.indexOf("*")) + index + value.substring(value.indexOf("*") + 1, value.length());
    }
}
