package autoever2.cartag.domain.option;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class QuoteSubOptionDto {
    private int optionId;
    private String optionName;
    private Long optionPrice;
    private String optionTitle;
    private String optionImage;

    @Builder
    public QuoteSubOptionDto(int optionId, String optionName, Long optionPrice, String optionTitle, String optionImage) {
        this.optionId = optionId;
        this.optionName = optionName;
        this.optionPrice = optionPrice;
        this.optionTitle = optionTitle;
        this.optionImage = optionImage;
    }
}
