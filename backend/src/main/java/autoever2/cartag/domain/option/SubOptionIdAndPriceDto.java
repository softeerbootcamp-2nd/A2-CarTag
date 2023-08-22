package autoever2.cartag.domain.option;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SubOptionIdAndPriceDto {
    private int optionId;
    private Long optionPrice;
    @Builder
    public SubOptionIdAndPriceDto(int optionId, Long optionPrice) {
        this.optionId = optionId;
        this.optionPrice = optionPrice;
    }
}
