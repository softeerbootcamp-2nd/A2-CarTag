package autoever2.cartag.models;

import autoever2.cartag.domain.model.*;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.cars.CarRepository;
import autoever2.cartag.models.dto.*;
import autoever2.cartag.models.ModelRepository;
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
        if (modelData.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        Long carBoughtCount = carRepository.findCarBoughtCountByCarId(carId).orElse(0L);
        List<ModelShortMappedDto> powerTrainData = modelData.stream().filter(modelShortMappedDto -> modelShortMappedDto.getModelTypeId() == 1).collect(Collectors.toList());

        List<ModelShortDataDto> result = getPowerTrainDataWithRatio(powerTrainData, carBoughtCount);

        result.addAll(modelData.stream().filter(modelShortMappedDto -> modelShortMappedDto.getModelTypeId() != 1).map(modelTypeMappedDto -> {
                            int percentage = 0;
                            if (carBoughtCount != 0) {
                                percentage = (int) (modelTypeMappedDto.getModelBoughtCount() * 100 / carBoughtCount);
                            }

                            return ModelShortDataDto.builder()
                                    .modelId(modelTypeMappedDto.getModelId())
                                    .modelName(modelTypeMappedDto.getModelName())
                                    .modelTypeName(modelTypeMappedDto.getModelTypeName())
                                    .modelPrice(modelTypeMappedDto.getModelPrice())
                                    .modelImage(modelTypeMappedDto.getModelImage())
                                    .percentage(percentage)
                                    .build();
                        }
                )
                .collect(Collectors.toList()));

        return result;
    }

    private List<ModelShortDataDto> getPowerTrainDataWithRatio(List<ModelShortMappedDto> powerTrainData, Long carBoughtCount) {
        double maxPs = 0.0;
        double maxKgfm = 0.0;

        for(ModelShortMappedDto data : powerTrainData) {
            if(data.getMaxPs() == null) {
                continue;
            }
            maxPs = Double.max(maxPs, calculateHmgString(data.getMaxPs()));
            maxKgfm = Double.max(maxKgfm, calculateHmgString(data.getMaxKgfm()));
        }

        final double finalPs = maxPs;
        final double finalKgfm = maxKgfm;

        return powerTrainData.stream().map(data -> {
            int percentage = 0;
            if(carBoughtCount != 0) {
                percentage = (int) (data.getModelBoughtCount() * 100 / carBoughtCount);
            }

            ModelShortDataDto result = ModelShortDataDto.builder()
                    .modelId(data.getModelId())
                    .modelName(data.getModelName())
                    .modelPrice(data.getModelPrice())
                    .modelTypeName(data.getModelTypeName())
                    .percentage(percentage)
                    .modelImage(data.getModelImage())
                    .build();

            if(finalPs <= 0 || finalKgfm <= 0) {
                return result;
            }
            result.setHmgData(PowerTrainDataDto.builder()
                    .maxPs(data.getMaxPs())
                    .maxKgfm(data.getMaxKgfm())
                    .ratioPs(calculateHmgString(data.getMaxPs()) / finalPs)
                    .ratioKgfm(calculateHmgString(data.getMaxKgfm()) / finalKgfm)
                    .build());

            return result;
        }).collect(Collectors.toList());
    }
    
    private Double calculateHmgString(String input) {
        String[] token = input.split("/");

        int denominator = 0;
        if(token[1].contains("~")) {
            String[] subToken = token[1].split("~");
            denominator = Integer.parseInt(subToken[0]) + Integer.parseInt(subToken[1]) / 2;
        }
        if(!token[1].contains("~")) {
            denominator = Integer.parseInt(token[1]);
        }

        if(denominator == 0) {
            return 0.0;
        }

        return Double.parseDouble(token[0]) / denominator;
    }

    //TODO: RuntimeException 처리
    public ModelDetailMappedDto getModelDetail(int modelId) {
        return modelRepository.findModelDetailData(modelId).orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS));
    }

    //TODO: RuntimeException 처리
    public ModelEfficiencyDataDto getEfficiencyData(int powerTrainId, int operationId) {
        return modelRepository.findEfficiencyData(powerTrainId, operationId).orElseThrow(() -> new EmptyDataException(ErrorCode.INVALID_PARAMETER));
    }
}
