package autoever2.cartag.service;

import autoever2.cartag.domain.suboption.SubOptionDto;
import autoever2.cartag.domain.suboption.SubOptionMappedDto;
import autoever2.cartag.repository.CarRepository;
import autoever2.cartag.repository.SubOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubOptionService {

    private final SubOptionRepository subOptionRepository;
    private final CarRepository carRepository;

    public List<SubOptionDto> getSubOptionList(int carId) {
        List<SubOptionMappedDto> subOptionList = subOptionRepository.findAllSubOptionWithCategoryNameByCarId(carId);
        Long carBoughtCount = carRepository.findCarBoughtCountByCarId(carId).orElse(0L);

        return subOptionList.stream().map(subOptionMappedDto -> {
                    int percentage = 0;
                    if (carBoughtCount != 0) {
                        percentage = (int) (subOptionMappedDto.getOptionBoughtCount() * 100 / carBoughtCount);
                    }

                    boolean hasHmgData = subOptionMappedDto.getOptionUsedCount() != 0;

                    return SubOptionDto.builder()
                            .subOptionId(subOptionMappedDto.getSubOptionId())
                            .optionCategoryName(subOptionMappedDto.getOptionCategoryName())
                            .optionImage(subOptionMappedDto.getOptionImage())
                            .optionPrice(subOptionMappedDto.getOptionPrice())
                            .optionName(subOptionMappedDto.getOptionName())
                            .percentage(percentage)
                            .hashtagName(subOptionRepository.findAllHashtagNameBySubOptionId(subOptionMappedDto.getSubOptionId()))
                            .hasHmgData(hasHmgData)
                            .build();
                }
        ).collect(Collectors.toList());
    }

}
