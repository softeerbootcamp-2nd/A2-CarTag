package autoever2.cartag.service;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ColorService {
    private final ColorRepository repository;

    // TODO : 어떤 에러를 반환할지 생각합니다.

    public List<String> changeImageToImages(int colorId) {
        Optional<String> images = repository.findOuterColorImagesByColorId(colorId);
        if (images.isEmpty()) {
            throw new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND);
        }
        List<String> outerColorCarImages = new ArrayList<>();
        String value = images.get();
        IntStream.rangeClosed(1, 60)
                .forEach(i -> {
                    outerColorCarImages.add(value.substring(0, value.indexOf("*")) + i + value.substring(value.indexOf("*") + 1, value.length()));
                });
        return outerColorCarImages;
    }

    public List<OuterColorDto> findOuterColorByCarId(int carId) {
        List<OuterColorDto> outerColors = repository.findOuterColorCarByCarId(carId);
        if (outerColors.isEmpty()) {
            throw new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND);
        }

        return outerColors;
    }

    public List<InnerColorDto> findInnerColorByCarId(int carId) {
        List<InnerColorDto> innerColors = repository.findInnerColorCarByCarId(carId);
        if (innerColors.isEmpty()) {
            throw new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND);
        }

        return innerColors;
    }
}
