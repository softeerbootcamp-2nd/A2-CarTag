package autoever2.cartag.domain.option;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class QuoteSubOptionDto {
    private int optionId;
    private String optionName;
    private Long optionPrice;
    private String optionTitle;
    private String optionImage;
}
