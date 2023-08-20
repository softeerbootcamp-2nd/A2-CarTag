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
    @Schema(description = "선택 차량의 타입", example = "펠리세이드")
    private String carType;
    @Schema(description = "선택 차량의 트림 명", example = "Le Blanc")
    private String trim;
    @Schema(description = "선택된 차량 트림의 기본 가격")
    private int carDefaultPrice;

    @Schema(description = "기본 powerTrain의 이름", example = "디젤 2.2")
    private String powerTrainName;
    @Schema(description = "기본 powerTrain의 이미지 url")
    private String powerTrainImage;
    @Schema(description = "기본 powerTrain의 가격")
    private Long powerTrainPrice;

    @Schema(description = "기본 bodyType의 이름", example = "7인승")
    private String bodyTypeName;
    @Schema(description = "기본 bodyType의 이미지 url")
    private String bodyTypeImage;
    @Schema(description = "기본 bodyType의 가격")
    private Long bodyTypePrice;

    @Schema(description = "기본 operation의 이름", example = "2WD")
    private String operationName;
    @Schema(description = "기본 operation의 이미지 url")
    private String operationImage;
    @Schema(description = "기본 operation의 가격")
    private Long operationPrice;

    @Schema(description = "기본 외장색상 이미지 url")
    private String colorOuterImage;
    @Schema(description = "기본 외장색상이 적용된 차량 url")
    private String colorCarOuterImage;
    @Schema(description = "기본 외장색상 가격")
    private Long colorOuterPrice;
    @Schema(description = "기본 외장색상 이름")
    private String colorOuterImageName;
    @Schema(description = "기본 내장색상 이미지 url")
    private String colorInnerImage;
    @Schema(description = "기본 내장색상이 적용된 차량 url")
    private String colorCarInnerImage;
    @Schema(description = "기본 내장색상 가격")
    private Long colorInnerPrice;
    @Schema(description = "기본 내장색상 이름")
    private String colorInnerImageName;

    public static CarDefaultDto toDefault(CarDefaultInfoDto carDefaultInfoDto, OuterColorDto outerColorDto, InnerColorDto innerColorDto, List<ModelDefaultDto> modelDefaultDto, String colorCarOuterImage) {
        return CarDefaultDto.builder()
                .carType(carDefaultInfoDto.getCarType())
                .trim(carDefaultInfoDto.getTrim())
                .carDefaultPrice(carDefaultInfoDto.getCarDefaultPrice())
                .powerTrainName(modelDefaultDto.get(0).getModelName())
                .powerTrainImage(modelDefaultDto.get(0).getModelImage())
                .powerTrainPrice(modelDefaultDto.get(0).getModelPrice())
                .bodyTypeName(modelDefaultDto.get(1).getModelName())
                .bodyTypeImage(modelDefaultDto.get(1).getModelImage())
                .bodyTypePrice(modelDefaultDto.get(1).getModelPrice())
                .operationName(modelDefaultDto.get(2).getModelName())
                .operationImage(modelDefaultDto.get(2).getModelImage())
                .operationPrice(modelDefaultDto.get(2).getModelPrice())
                .colorOuterImage(outerColorDto.getColorImage())
                .colorCarOuterImage(colorCarOuterImage)
                .colorOuterPrice(outerColorDto.getColorPrice())
                .colorOuterImageName(outerColorDto.getColorName())
                .colorInnerImage(innerColorDto.getColorImage())
                .colorCarInnerImage(innerColorDto.getColorCarImage())
                .colorInnerPrice(innerColorDto.getColorPrice())
                .colorInnerImageName(innerColorDto.getColorName())
                .build();

    }
}
