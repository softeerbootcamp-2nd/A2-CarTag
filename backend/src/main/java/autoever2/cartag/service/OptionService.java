package autoever2.cartag.service;

import autoever2.cartag.domain.option.*;
import autoever2.cartag.repository.CarRepository;
import autoever2.cartag.repository.OptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OptionService {

    private final OptionRepository optionRepository;
    private final CarRepository carRepository;

    public List<SubOptionDto> getSubOptionList(int carId) {
        List<OptionShortMappedDto> subOptionList = optionRepository.findOptionList(carId, false);
        Long carBoughtCount = carRepository.findCarBoughtCountByCarId(carId).orElse(0L);

        return subOptionList.stream().map(subOptionMappedDto -> {
                    int percentage = 0;
                    if (carBoughtCount != 0) {
                        percentage = (int) (subOptionMappedDto.getOptionBoughtCount() * 100 / carBoughtCount);
                    }

                    boolean hasHmgData = subOptionMappedDto.getOptionUsedCount() != null || subOptionMappedDto.getOptionBoughtCount() != null;

            return SubOptionDto.builder()
                            .subOptionId(subOptionMappedDto.getOptionId())
                            .optionCategoryName(subOptionMappedDto.getOptionCategoryName())
                            .optionImage(subOptionMappedDto.getOptionImage())
                            .optionPrice(subOptionMappedDto.getOptionPrice())
                            .optionName(subOptionMappedDto.getOptionName())
                            .percentage(percentage)
                            .hashtagName(optionRepository.findAllHashtagNameBySubOptionId(subOptionMappedDto.getOptionId()))
                            .hasHmgData(hasHmgData)
                            .build();
                }
        ).collect(Collectors.toList());
    }

    public List<DefaultOptionDto> getDefaultOptionList(int carId) {
        List<OptionShortMappedDto> dataList = optionRepository.findOptionList(carId, true);

        return dataList.stream().map(data -> DefaultOptionDto.builder()
                .optionId(data.getOptionId())
                .optionName(data.getOptionName())
                .optionCategoryName(data.getOptionCategoryName())
                .optionImage(data.getOptionImage())
            .hasHmgData(data.getOptionUsedCount() != null).build()).collect(Collectors.toList());
    }

    //TODO: RuntimeException 처리
    public OptionDetailDto getOptionDetailData(int carId, int optionId, boolean isDefault) {
        OptionDetailMappedDto detail = optionRepository.findOptionDetail(carId, optionId, isDefault).orElseThrow(() -> new RuntimeException("데이터가 존재하지 않습니다."));

        List<OptionDetailMappedDto> packageSubOptions = optionRepository.findPackageSubOptions(optionId);

        OptionDetailDto result = OptionDetailDto.builder()
                .categoryName(detail.getCategoryName())
                .optionName(detail.getOptionName())
                .optionDescription(detail.getOptionDescription())
                .optionImage(detail.getOptionImage())
                .hmgData(OptionHmgDataVo.builder().optionBoughtCount(detail.getOptionBoughtCount()).optionUsedCount(detail.getOptionUsedCount()).build())
                .build();

        if(detail.getOptionBoughtCount() != null) {
            Long totalBoughtCount = carRepository.findCarBoughtCountByCarId(carId).orElseThrow(() -> new RuntimeException("알수 없는 에러"));
            result.getHmgData().setOverHalf(detail.getOptionBoughtCount() * 2 > totalBoughtCount);
        }
        if(!packageSubOptions.isEmpty()) {
            result.setIsPackage(true);

            result.setSubOptionList(packageSubOptions.stream().map(option -> {
                OptionDetailDto detailDto = OptionDetailDto.builder()
                        .categoryName(option.getCategoryName())
                        .isPackage(false)
                        .optionDescription(option.getOptionDescription())
                        .optionImage(option.getOptionImage())
                        .optionName(option.getOptionName())
                        .hmgData(OptionHmgDataVo.builder().optionUsedCount(option.getOptionUsedCount()).optionBoughtCount(result.getHmgData().getOptionBoughtCount()).isOverHalf(result.getHmgData().isOverHalf()).build())
                        .build();

                detailDto.setHmgData(OptionHmgDataVo.builder().optionBoughtCount(detail.getOptionBoughtCount()).optionUsedCount(option.getOptionUsedCount()).build());

                return detailDto;
            }).collect(Collectors.toList()));
        }

        return result;
    }

}
