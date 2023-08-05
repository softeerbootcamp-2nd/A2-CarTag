package autoever2.cartag.domain.dto.car;

import autoever2.cartag.domain.entity.car.Car;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Builder
@Schema(description = "차량 반환 DTO")
public class CarDto {
    @Schema(description = "trim 명", example = "Le Blanc", nullable = true)
    private String trim;
    @Schema(description = "차량의 기본 가격", nullable = true)
    private int carDefaultPrice;
    @Schema(description = "차량 외부 이미지 url", nullable = true)
    private String outerImage;
    @Schema(description = "차량 내부 이미지 url", nullable = true)
    private String innerImage;
    @Schema(description = "차량 바퀴 이미지 url")
    private String wheelImage;
    @Schema(description = "차량에 대한 설명", nullable = true)
    private String carDescription;
    @Singular private List<DefaultOptionDto> options;

    public static CarDto toDto(Car car, List<DefaultOptionDto> optionDtos) {

        return CarDto.builder()
                .trim(car.getTrim())
                .carDefaultPrice(car.getCarDefaultPrice())
                .outerImage(car.getOuterImage())
                .innerImage(car.getInnerImage())
                .wheelImage(car.getWheelImage())
                .carDescription(car.getCarDescription())
                .options(optionDtos)
                .build();
    }
}
