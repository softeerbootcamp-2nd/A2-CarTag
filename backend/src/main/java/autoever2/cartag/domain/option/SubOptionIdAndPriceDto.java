package autoever2.cartag.domain.option;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SubOptionIdAndPriceDto {

    private int optionId;
    private Long optionPrice;

    @Builder
    public SubOptionIdAndPriceDto(int optionId, Long optionPrice) {
        this.optionId = optionId;
        this.optionPrice = optionPrice;
    }
}
