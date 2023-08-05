package autoever2.cartag.service;

import autoever2.cartag.domain.dto.colordto.InnerColorDto;
import autoever2.cartag.domain.dto.colordto.OuterColorDto;
import autoever2.cartag.domain.entity.color.ColorCarMapper;
import autoever2.cartag.repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ColorService {
    private final ColorRepository repository;

    /**
     *
     * 어떤 예외를 반환할지를 고민합니다.
     */



    public List<InnerColorDto> findInnerColorByCarId(int carId) {
        List<ColorCarMapper> colorCars = repository.findInnerColorCarByCarId(carId).get();
        return colorCars.stream()
                .map(colorCar -> InnerColorDto.toDto(colorCar, repository.findColorByColorId(colorCar.getColorId()).get()))
                .collect(Collectors.toList());
    }
}
