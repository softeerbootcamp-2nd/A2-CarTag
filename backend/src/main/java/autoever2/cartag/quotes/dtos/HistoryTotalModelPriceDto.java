package autoever2.cartag.quotes.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HistoryTotalModelPriceDto {

    private String soldOptionsId;
    private int soldCount;
    private Long modelPrice;

    @Builder
    public HistoryTotalModelPriceDto(String soldOptionsId, int soldCount, Long modelPrice) {
        this.soldOptionsId = soldOptionsId;
        this.soldCount = soldCount;
        this.modelPrice = modelPrice;
    }
}
