package autoever2.cartag.cars.dto;

import autoever2.cartag.domain.option.TrimDefaultOptionDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

import java.util.List;

@Getter
@Schema(description = "트림 ID와 트림명, 가격, 이미지 설명을 반환")
public class CarVo {
    @Schema(description = "CarId명", example = "1")
    private int carId;
    @Schema(description = "트림명", example = "Le Blanc")
    private String trim;
    @Schema(description = "기본 가격")
    private int carDefaultPrice;
    @Schema(description = "차량 외부 이미지 주소")
    private String outerImage;
    @Schema(description = "차량 내부 이미지 주소")
    private String innerImage;
    @Schema(description = "차량 바퀴 이미지 주소", nullable = true)
    private String wheelImage;
    @Schema(description = "차량에 대한 설명")
    private String carDescription;
    @Singular private List<TrimDefaultOptionDto> options;

    @Builder
    public CarVo(int carId, String trim, int carDefaultPrice, String outerImage, String innerImage, String wheelImage, String carDescription, List<TrimDefaultOptionDto> options) {
        this.carId = carId;
        this.trim = trim;
        this.carDefaultPrice = carDefaultPrice;
        this.outerImage = outerImage;
        this.innerImage = innerImage;
        this.wheelImage = wheelImage;
        this.carDescription = carDescription;
        this.options = options;
    }

    public static CarVo toVo(CarInfoDto carInfoDto, List<TrimDefaultOptionDto> optionDtos) {
        return CarVo.builder()
                .carId(carInfoDto.getCarId())
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
