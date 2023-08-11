package autoever2.cartag.service;

import autoever2.cartag.domain.model.ModelDetailMappedDto;
import autoever2.cartag.domain.model.ModelShortDataDto;
import autoever2.cartag.domain.model.PowerTrainMappedDto;
import autoever2.cartag.repository.CarRepository;
import autoever2.cartag.repository.ModelRepository;
import autoever2.cartag.domain.model.ModelShortMappedDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelService {

    private final ModelRepository modelRepository;
    private final CarRepository carRepository;

    public List<ModelShortDataDto> getModelTypeData(int carId) {
        List<ModelShortMappedDto> modelData = modelRepository.findAllModelTypeData(carId);
        Long carBoughtCount = carRepository.findCarBoughtCountByCarId(carId).orElse(0L);

        return modelData.stream().map(modelTypeMappedDto -> {
                            int percentage = 0;
                            if (carBoughtCount != 0) {
                                percentage = (int) (modelTypeMappedDto.getModelBoughtCount() * 100 / carBoughtCount);
                            }

                            return ModelShortDataDto.builder()
                                    .modelId(modelTypeMappedDto.getModelId())
                                    .modelName(modelTypeMappedDto.getModelName())
                                    .modelTypeName(modelTypeMappedDto.getModelTypeName())
                                    .modelPrice(modelTypeMappedDto.getModelPrice())
                                    .percentage(percentage)
                                    .build();
                        }
                )

                .collect(Collectors.toList());
    }

    //TODO: RuntimeException 처리
    public ModelDetailMappedDto getModelDetail(int modelId) {
        return modelRepository.findModelDetailData(modelId).orElseThrow(() -> new RuntimeException("데이터가 존재하지 않습니다."));
    }

    //TODO: RuntimeException 처리
    public PowerTrainMappedDto getPowerTrainHmgData(int powerTrainId) {
        return modelRepository.findPowerTrainData(powerTrainId).orElseThrow(() -> new RuntimeException("데이터가 존재하지 않습니다."));
    }
}
