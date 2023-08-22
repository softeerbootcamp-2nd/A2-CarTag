package autoever2.cartag.cars.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class CarPriceDto {
    @Schema(description = "차량의 가격")
    private Long price;

    @Schema(description = "차량의 optionId 리스트")
    private String optionList;

    @Builder
    public CarPriceDto(Long price, String optionList) {
        this.price = price;
        this.optionList = optionList;
    }
}
