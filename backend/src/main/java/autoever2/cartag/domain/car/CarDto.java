package autoever2.cartag.domain.car;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

import java.util.List;

@Getter
@Builder
@Schema(description = "차량 반환 DTO")
public class CarDto {
    @Schema(description = "trim 명", example = "Le Blanc")
    private String trim;
    @Schema(description = "차량의 기본 가격")
    private int carDefaultPrice;
    @Schema(description = "차량 외부 이미지 url")
    private String outerImage;
    @Schema(description = "차량 내부 이미지 url")
    private String innerImage;
    @Schema(description = "차량 바퀴 이미지 url", nullable = true)
    private String wheelImage;
    @Schema(description = "차량에 대한 설명")
    private String carDescription;
    @Singular private List<DefaultOptionDto> options;

    public static CarDto toDto(CarInfoDto carInfoDto, List<DefaultOptionDto> optionDtos) {
        return CarDto.builder()
                .trim(carInfoDto.getTrim())
                .carDefaultPrice(carInfoDto.getCarDefaultPrice())
                .outerImage(carInfoDto.getOuterImage())
                .innerImage(carInfoDto.getInnerImage())
                .wheelImage(carInfoDto.getWheelImage())
                .carDescription(carInfoDto.getCarDescription())
                .options(optionDtos)
                .build();
    }
}
