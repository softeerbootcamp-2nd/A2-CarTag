package autoever2.cartag.domain.car;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CarDefaultInfoDto {
    @Schema(description = "선택 차량의 타입", example = "펠리세이드")
    private String carType;
    @Schema(description = "선택 차량의 트림 명", example = "Le Blanc")
    private String trim;
    @Schema(description = "선택된 차량 트림의 기본 가격")
    private int carDefaultPrice;
}
