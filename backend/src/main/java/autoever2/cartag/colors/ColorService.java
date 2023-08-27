package autoever2.cartag.colors;

import autoever2.cartag.colors.dto.ColorDto;
import autoever2.cartag.colors.dto.InnerColorPercentDto;
import autoever2.cartag.colors.dto.OuterColorPercentDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.cars.CarRepository;
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
        List<ColorDto> outerColors = colorRepository.findOuterColorCarByCarId(carId);
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
        List<ColorDto> innerColors = colorRepository.findInnerColorCarByCarId(carId);
        if (innerColors.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        Optional<Long> totalCount = carRepository.findCarBoughtCountByCarId(carId);
        return innerColors.stream()
                .map(innerColorDto -> InnerColorPercentDto.toPercent(innerColorDto, getPercent(totalCount, innerColorDto.getColorBoughtCount())))
                .collect(Collectors.toList());
    }

    public int getPercent(Optional<Long> count, Long boughtCount) {
        return count.map(aLong -> (int) (boughtCount * 100 / aLong)).orElse(0);
    }

    public String changeUrl(String value, int index) {
        return value.substring(0, value.indexOf("*")) + index + value.substring(value.indexOf("*") + 1, value.length());
    }
}
