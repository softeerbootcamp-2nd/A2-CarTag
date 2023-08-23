package autoever2.cartag.domain.quote;

import autoever2.cartag.cars.dto.TrimInfoDto;
import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.models.dto.ModelDefaultDto;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class QuoteInfoDto {
    @Schema(description = "car의 id")
    private int carId;
    @Schema(description = "차량의 trim명")
    private String trim;
    @Schema(description = "차량 기본 가격")
    private int carDefaultPrice;
    @Schema(description = "powerTrain의 id")
    private int powerTrainId;
    @Schema(description = "파워트레인 명")
    private String powerTrainTitle;
    @Schema(description = "기본 powerTrain의 이름", example = "디젤 2.2")
    private String powerTrainName;
    @Schema(description = "기본 powerTrain의 이미지 url")
    private String powerTrainImage;
    @Schema(description = "기본 powerTrain의 가격")
    private Long powerTrainPrice;

    @Schema(description = "bodyType의 id")
    private int bodyTypeId;
    @Schema(description = "bodyType 명")
    private String bodyTypeTitle;
    @Schema(description = "기본 bodyType의 이름", example = "7인승")
    private String bodyTypeName;
    @Schema(description = "기본 bodyType의 이미지 url")
    private String bodyTypeImage;
    @Schema(description = "기본 bodyType의 가격")
    private Long bodyTypePrice;

    @Schema(description = "operation의 id")
    private int operationId;
    @Schema(description = "operation 명")
    private String operationTitle;
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
    @Schema(description = "외장색상 명")
    private String colorOuterTitle;


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
    @Schema(description = "내장색상 명")
    private String colorInnerTitle;
    @Schema(description = "option들의 리스트")
    List<QuoteSubOptionDto> optionList;

    public static QuoteInfoDto toInfoDto(TrimInfoDto trimInfoDto, OuterColorDto outerColorDto, InnerColorDto innerColorDto,
                                         List<ModelDefaultDto> modelDefaultDto, List<QuoteSubOptionDto> optionInfos, String colorCarOuterImage) {
        return QuoteInfoDto.builder()
                .carId(trimInfoDto.getCarId())
                .trim(trimInfoDto.getTrim())
                .carDefaultPrice(trimInfoDto.getCarDefaultPrice())
                .powerTrainId(modelDefaultDto.get(0).getModelId())
                .powerTrainName(modelDefaultDto.get(0).getModelName())
                .powerTrainImage(modelDefaultDto.get(0).getModelImage())
                .powerTrainPrice(modelDefaultDto.get(0).getModelPrice())
                .powerTrainTitle(modelDefaultDto.get(0).getModelTitle())
                .operationId(modelDefaultDto.get(1).getModelId())
                .operationName(modelDefaultDto.get(1).getModelName())
                .operationImage(modelDefaultDto.get(1).getModelImage())
                .operationPrice(modelDefaultDto.get(1).getModelPrice())
                .operationTitle(modelDefaultDto.get(1).getModelTitle())
                .bodyTypeId(modelDefaultDto.get(2).getModelId())
                .bodyTypeName(modelDefaultDto.get(2).getModelName())
                .bodyTypeImage(modelDefaultDto.get(2).getModelImage())
                .bodyTypePrice(modelDefaultDto.get(2).getModelPrice())
                .bodyTypeTitle(modelDefaultDto.get(2).getModelTitle())
                .colorOuterId(outerColorDto.getColorId())
                .colorOuterImage(outerColorDto.getColorImage())
                .colorCarOuterImage(colorCarOuterImage)
                .colorOuterPrice(outerColorDto.getColorPrice())
                .colorOuterImageName(outerColorDto.getColorName())
                .colorOuterTitle("외장 색상")
                .colorInnerTitle("내장 색상")
                .colorInnerId(innerColorDto.getColorId())
                .colorInnerImage(innerColorDto.getColorImage())
                .colorCarInnerImage(innerColorDto.getColorCarImage())
                .colorInnerPrice(innerColorDto.getColorPrice())
                .colorInnerImageName(innerColorDto.getColorName())
                .optionList(optionInfos)
                .build();

    }
}
