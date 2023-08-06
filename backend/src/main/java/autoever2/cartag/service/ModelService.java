package autoever2.cartag.service;

import autoever2.cartag.domain.dto.model.ModelShortDataDTO;
import autoever2.cartag.repository.model.ModelRepository;
import autoever2.cartag.repository.model.ModelTypeMappedDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelService {

    private final ModelRepository modelRepository;

    public List<ModelShortDataDTO> getModelTypeData(int carId) {
        List<ModelTypeMappedDto> modelData = modelRepository.findAllModelTypeData(carId);
        Long carBoughtCount = modelRepository.findCarBoughtCountByCarId(carId);

        return modelData.stream().map(modelTypeMappedDto ->
                ModelShortDataDTO.builder()
                        .modelId(modelTypeMappedDto.getModelId())
                        .modelName(modelTypeMappedDto.getModelName())
                        .modelTypeName(modelTypeMappedDto.getModelTypeName())
                        .modelPrice(modelTypeMappedDto.getModelPrice())
                        .isDefaultOption(modelTypeMappedDto.isDefaultOption())
                        .percentage((int) (modelTypeMappedDto.getModelBoughtCount() * 100 / carBoughtCount))
                        .build())
                .collect(Collectors.toList());
    }
}
