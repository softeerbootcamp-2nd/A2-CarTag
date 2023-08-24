package autoever2.cartag.quotes.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuoteModelPriceDto {

    private String soldOptionsId;
    private int soldCount;
    private Long modelPrice;

    @Builder
    public QuoteModelPriceDto(String soldOptionsId, int soldCount, Long modelPrice) {
        this.soldOptionsId = soldOptionsId;
        this.soldCount = soldCount;
        this.modelPrice = modelPrice;
    }
}
