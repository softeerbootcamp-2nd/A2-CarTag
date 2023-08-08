package autoever2.cartag.domain.suboption;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class SubOptionMappedDto {

    private int subOptionId;
    private String optionName;
    private String optionCategoryName;
    private String optionImage;
    private Long optionBoughtCount;
    private double optionUsedCount;
    private Long optionPrice;

    @Builder
    public SubOptionMappedDto(int subOptionId, String optionName, String optionCategoryName, String optionImage, Long optionBoughtCount, double optionUsedCount, Long optionPrice) {
        this.subOptionId = subOptionId;
        this.optionName = optionName;
        this.optionCategoryName = optionCategoryName;
        this.optionImage = optionImage;
        this.optionBoughtCount = optionBoughtCount;
        this.optionUsedCount = optionUsedCount;
        this.optionPrice = optionPrice;
    }
}
