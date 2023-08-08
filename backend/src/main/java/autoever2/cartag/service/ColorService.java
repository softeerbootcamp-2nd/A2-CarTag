package autoever2.cartag.service;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorService {
    private final ColorRepository repository;

    /**
     * 어떤 예외를 반환할지를 고민합니다.
     */

    public List<OuterColorDto> findOuterColorByCarId(int carId) {
        List<OuterColorDto> outerColors = repository.findOuterColorCarByCarId(carId);
        if (outerColors.isEmpty()) {
            throw new RuntimeException("미정");
        }

        return outerColors;
    }

    public List<InnerColorDto> findInnerColorByCarId(int carId) {
        List<InnerColorDto> innerColors = repository.findInnerColorCarByCarId(carId);
        if (innerColors.isEmpty()) {
            throw new RuntimeException("미정");
        }

        return innerColors;
    }
}
