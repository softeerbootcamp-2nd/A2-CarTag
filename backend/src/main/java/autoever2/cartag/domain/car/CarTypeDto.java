package autoever2.cartag.domain.car;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Schema(description = "차종 ID와 이름, 이미지를 반환하는 dto")
public class CarTypeDto {

    @Schema(description = "차종 ID, 차량(트림) ID와 다름", example = "1")
    private int carTypeId;
    @Schema(description = "차종 이미지", example = "/cartype/palisade/palisade-thumbnail.png")
    private String carTypeImage;
    @Schema(description = "차종 명", example = "팰리세이드")
    private String carTypeName;

    @Builder
    public CarTypeDto(int carTypeId, String carTypeImage, String carTypeName) {
        this.carTypeId = carTypeId;
        this.carTypeImage = carTypeImage;
        this.carTypeName = carTypeName;
    }
}
