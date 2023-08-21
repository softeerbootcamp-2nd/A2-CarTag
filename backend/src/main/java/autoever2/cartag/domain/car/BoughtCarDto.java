package autoever2.cartag.domain.car;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "구매된 차량의 가격과 그에 따른 갯수 반환 DTO")
public class BoughtCarDto {
    private Long totalPrice;
    private int count;


    public static BoughtCarDto toBoughtCarDto(Long totalPrice, int count) {
        return BoughtCarDto.builder()
                .totalPrice(totalPrice)
                .count(count)
                .build();
    }
}
