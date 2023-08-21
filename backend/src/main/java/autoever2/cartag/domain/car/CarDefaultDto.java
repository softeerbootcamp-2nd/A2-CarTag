package autoever2.cartag.domain.car;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.domain.model.ModelDefaultDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@Schema(description = "차량 Default value를 반환하는 dto")
public class CarDefaultDto {
    @Schema(description = "powerTrain의 id")
    private int powerTrainId;
    @Schema(description = "기본 powerTrain의 이름", example = "디젤 2.2")
    private String powerTrainName;
    @Schema(description = "기본 powerTrain의 이미지 url")
    private String powerTrainImage;
    @Schema(description = "기본 powerTrain의 가격")
    private Long powerTrainPrice;

    @Schema(description = "bodyType의 id")
    private int bodyTypeId;
    @Schema(description = "기본 bodyType의 이름", example = "7인승")
    private String bodyTypeName;
    @Schema(description = "기본 bodyType의 이미지 url")
    private String bodyTypeImage;
    @Schema(description = "기본 bodyType의 가격")
    private Long bodyTypePrice;

    @Schema(description = "operation의 id")
    private int operationId;
    @Schema(description = "기본 operation의 이름", example = "2WD")
    private String operationName;
    @Schema(description = "기본 operation의 이미지 url")
    private String operationImage;
    @Schema(description = "기본 operation의 가격")
    private Long operationPrice;

    @Schema(description = "외장색상의 id")
    private int colorOuterId;
    @Schema(description = "기본 외장색상 이미지 url")
    private String colorOuterImage;
    @Schema(description = "기본 외장색상이 적용된 차량 url")
    private String colorCarOuterImage;
    @Schema(description = "기본 외장색상 가격")
    private Long colorOuterPrice;
    @Schema(description = "기본 외장색상 이름")
    private String colorOuterImageName;
    @Schema(description = "내장색상의 id")
    private int colorInnerId;
    @Schema(description = "기본 내장색상 이미지 url")
    private String colorInnerImage;
    @Schema(description = "기본 내장색상이 적용된 차량 url")
    private String colorCarInnerImage;
    @Schema(description = "기본 내장색상 가격")
    private Long colorInnerPrice;
    @Schema(description = "기본 내장색상 이름")
    private String colorInnerImageName;

    public static CarDefaultDto toDefault(OuterColorDto outerColorDto, InnerColorDto innerColorDto, List<ModelDefaultDto> modelDefaultDto, String colorCarOuterImage) {
        return CarDefaultDto.builder()
                .powerTrainId(modelDefaultDto.get(0).getModelId())
                .powerTrainName(modelDefaultDto.get(0).getModelName())
                .powerTrainImage(modelDefaultDto.get(0).getModelImage())
                .powerTrainPrice(modelDefaultDto.get(0).getModelPrice())
                .operationId(modelDefaultDto.get(1).getModelId())
                .operationName(modelDefaultDto.get(1).getModelName())
                .operationImage(modelDefaultDto.get(1).getModelImage())
                .operationPrice(modelDefaultDto.get(1).getModelPrice())
                .bodyTypeId(modelDefaultDto.get(2).getModelId())
                .bodyTypeName(modelDefaultDto.get(2).getModelName())
                .bodyTypeImage(modelDefaultDto.get(2).getModelImage())
                .bodyTypePrice(modelDefaultDto.get(2).getModelPrice())
                .colorOuterId(outerColorDto.getColorId())
                .colorOuterImage(outerColorDto.getColorImage())
                .colorCarOuterImage(colorCarOuterImage)
                .colorOuterPrice(outerColorDto.getColorPrice())
                .colorOuterImageName(outerColorDto.getColorName())
                .colorInnerId(innerColorDto.getColorId())
                .colorInnerImage(innerColorDto.getColorImage())
                .colorCarInnerImage(innerColorDto.getColorCarImage())
                .colorInnerPrice(innerColorDto.getColorPrice())
                .colorInnerImageName(innerColorDto.getColorName())
                .build();

    }
}
