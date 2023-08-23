package autoever2.cartag.models;

import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.cars.CarRepository;
import autoever2.cartag.exception.ServerException;
import autoever2.cartag.models.dto.*;
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
        List<ModelShortMappedDto> modelData = modelRepository.findAllModelTypeDataByCarId(carId);
        if (modelData.isEmpty()) {
            throw new EmptyDataException(ErrorCode.DATA_NOT_EXISTS);
        }
        long carBoughtCount = carRepository.findCarBoughtCountByCarId(carId).orElse(0L);
        List<ModelShortMappedDto> powerTrainData = modelData.stream().filter(modelShortMappedDto -> modelShortMappedDto.getModelTypeId() == 1).collect(Collectors.toList());

        List<PowerTrainDataDto> hmgDataList = getPowerTrainDataWithRatio(powerTrainData);

        List<ModelShortDataDto> result = modelData.stream().map(modelShortMappedDto -> {
            int percentage = 0;
            if (carBoughtCount != 0) {
                percentage = (int) (modelShortMappedDto.getModelBoughtCount() * 100 / carBoughtCount);
            }

            return ModelShortDataDto.builder()
                    .modelId(modelShortMappedDto.getModelId())
                    .modelName(modelShortMappedDto.getModelName())
                    .modelTypeName(modelShortMappedDto.getModelTypeName())
                    .modelPrice(modelShortMappedDto.getModelPrice())
                    .modelImage(modelShortMappedDto.getModelImage())
                    .percentage(percentage)
                    .build();
        }).collect(Collectors.toList());

        int index = 0;
        for(ModelShortDataDto dataDto : result) {
            if(dataDto.getModelTypeName().equals("파워트레인")) {
                dataDto.setHmgData(hmgDataList.get(index));
                index++;
            }
        }

        return result;
    }

    private List<PowerTrainDataDto> getPowerTrainDataWithRatio(List<ModelShortMappedDto> powerTrainData) {
        double maxPs = 0.0;
        double maxKgfm = 0.0;

        for (ModelShortMappedDto data : powerTrainData) {
            if (data.getMaxPs().isEmpty() || data.getMaxKgfm().isEmpty()) {
                throw new ServerException(ErrorCode.INTERNAL_SERVER_ERROR, "데이터가 저장되어 있지 않습니다.");
            }
            maxPs = Double.max(maxPs, calculateHmgString(data.getMaxPs()));
            maxKgfm = Double.max(maxKgfm, calculateHmgString(data.getMaxKgfm()));
        }

        final double finalPs = maxPs;
        final double finalKgfm = maxKgfm;

        return powerTrainData.stream().map(data -> PowerTrainDataDto.builder()
                .maxPs(data.getMaxPs())
                .maxKgfm(data.getMaxKgfm())
                .ratioPs(calculateHmgString(data.getMaxPs()) / finalPs)
                .ratioKgfm(calculateHmgString(data.getMaxKgfm()) / finalKgfm)
                .build()).collect(Collectors.toList());
    }

    private Double calculateHmgString(String input) {
        String[] token = input.split("/");
        if(token.length != 2) {
            throw new ServerException(ErrorCode.INTERNAL_SERVER_ERROR, "잘못된 데이터가 저장되어 있습니다.");
        }
        int denominator = 0;
        if (token[1].contains("~")) {
            String[] subToken = token[1].split("~");
            denominator = (Integer.parseInt(subToken[0]) + Integer.parseInt(subToken[1])) / 2;
        }
        if (!token[1].contains("~")) {
            denominator = Integer.parseInt(token[1]);
        }

        if (denominator == 0) {
            throw new ServerException(ErrorCode.INTERNAL_SERVER_ERROR, "데이터의 숫자가 잘못 저장되어 있습니다.");
        }

        return Double.parseDouble(token[0]) / denominator;
    }

    public ModelDetailMappedDto getModelDetail(int modelId) {
        return modelRepository.findModelDetailDataMyModelId(modelId).orElseThrow(() -> new EmptyDataException(ErrorCode.DATA_NOT_EXISTS));
    }

    public ModelEfficiencyDataDto getEfficiencyData(int powerTrainId, int operationId) {
        return modelRepository.findEfficiencyData(powerTrainId, operationId).orElseThrow(() -> new EmptyDataException(ErrorCode.INVALID_PARAMETER));
    }
}
