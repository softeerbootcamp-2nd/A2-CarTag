package autoever2.cartag.cars.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(description = "차종 ID와, 차종의 대표이미지, 차종명을 반환")
public class CarTypeDto {

    @Schema(description = "차종 ID", example = "1")
    private int carTypeId;
    @Schema(description = "차종 대표이미지", example = "/cartype/palisade/palisade-thumbnail.png")
    private String carTypeImage;
    @Schema(description = "차종명", example = "팰리세이드")
    private String carTypeName;

    @Builder
    public CarTypeDto(int carTypeId, String carTypeImage, String carTypeName) {
        this.carTypeId = carTypeId;
        this.carTypeImage = carTypeImage;
        this.carTypeName = carTypeName;
    }
}
