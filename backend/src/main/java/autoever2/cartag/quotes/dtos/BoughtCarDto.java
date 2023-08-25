package autoever2.cartag.quotes.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.beans.ConstructorProperties;

@Getter
@Schema(description = "판매된 견적의 금액, 해당 금액의 판매량을 반환")
public class BoughtCarDto {

    @Schema(description = "판매된 견적의 금액", example = "45830000")
    private Long totalPrice;
    @Schema(description = "해당 견적의 판매 횟수, 동일한 금액이면 합산한 횟수", example = "91")
    private int count;

    @Builder
    @ConstructorProperties({"totalPrice", "count"})
    public BoughtCarDto(Long totalPrice, int count) {
        this.totalPrice = totalPrice;
        this.count = count;
    }
}
