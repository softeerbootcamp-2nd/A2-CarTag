package autoever2.cartag.domain.quote;

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
}
