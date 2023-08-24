package autoever2.cartag.cars.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TrimDataDto {

    @Schema(description = "트림 ID", example = "1")
    private int carId;
    @Schema(description = "트림명", example = "Le Blanc")
    private String trim;
    @Schema(description = "차량 기본 가격")
    private int carDefaultPrice;

    @Builder
    public TrimDataDto(int carId, String trim, int carDefaultPrice) {
        this.carId = carId;
        this.trim = trim;
        this.carDefaultPrice = carDefaultPrice;
    }
}
