package autoever2.cartag.cars.dto;

import autoever2.cartag.domain.color.ColorDto;
import autoever2.cartag.models.dto.ModelDefaultDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@Schema(description = "차량의 모델타입, 색상의 기본값을 반환")
public class CarDefaultDto {
    @Schema(description = "기본 파워트레인 ID", example = "1")
    private int powerTrainId;
    @Schema(description = "기본 파워트레인명", example = "디젤 2.2")
    private String powerTrainName;
    @Schema(description = "기본 파워트레인 이미지 주소")
    private String powerTrainImage;
    @Schema(description = "기본 파워트레인 가격")
    private Long powerTrainPrice;

    @Schema(description = "기본 바디타입 ID", example = "5")
    private int bodyTypeId;
    @Schema(description = "기본 바디타입명", example = "7인승")
    private String bodyTypeName;
    @Schema(description = "기본 바디타입 이미지 주소")
    private String bodyTypeImage;
    @Schema(description = "기본 바디타입 가격")
    private Long bodyTypePrice;

    @Schema(description = "기본 구동방식 ID", example = "3")
    private int operationId;
    @Schema(description = "기본 구동방식 이름", example = "2WD")
    private String operationName;
    @Schema(description = "기본 구동방식 이미지 주소")
    private String operationImage;
    @Schema(description = "기본 구동방식 가격")
    private Long operationPrice;

    @Schema(description = "기본 외장색상 ID", example = "3")
    private int colorOuterId;
    @Schema(description = "기본 외장색상 이미지 주소")
    private String colorOuterImage;
    @Schema(description = "기본 외장색상이 적용된 트림 이미지 주소")
    private String colorCarOuterImage;
    @Schema(description = "기본 외장색상 가격")
    private Long colorOuterPrice;
    @Schema(description = "기본 외장색상 이름")
    private String colorOuterImageName;
    @Schema(description = "내장색상 ID", example = "1")
    private int colorInnerId;
    @Schema(description = "기본 내장색상 이미지 주소")
    private String colorInnerImage;
    @Schema(description = "기본 내장색상이 적용된 트림 이미지 주소")
    private String colorCarInnerImage;
    @Schema(description = "기본 내장색상 가격")
    private Long colorInnerPrice;
    @Schema(description = "기본 내장색상 이름")
    private String colorInnerImageName;

    public static CarDefaultDto toDefault(ColorDto outerColorDto, ColorDto innerColorDto, List<ModelDefaultDto> modelDefaultDto, String colorCarOuterImage) {
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
