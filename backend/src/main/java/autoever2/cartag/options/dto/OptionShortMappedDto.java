package autoever2.cartag.options.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@NoArgsConstructor
@Setter
public class OptionShortMappedDto {

    private int optionId;
    private String optionName;
    private String optionCategoryName;
    private String optionImage;
    private Long optionBoughtCount;
    private Double optionUsedCount;
    private Long optionPrice;

    @Builder
    public OptionShortMappedDto(int optionId, String optionName, String optionCategoryName, String optionImage, Long optionBoughtCount, Double optionUsedCount, Long optionPrice) {
        this.optionId = optionId;
        this.optionName = optionName;
        this.optionCategoryName = optionCategoryName;
        this.optionImage = optionImage;
        this.optionBoughtCount = optionBoughtCount;
        this.optionUsedCount = optionUsedCount;
        this.optionPrice = optionPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OptionShortMappedDto that = (OptionShortMappedDto) o;
        return optionId == that.optionId && Double.compare(optionUsedCount, that.optionUsedCount) == 0 && Objects.equals(optionName, that.optionName) && Objects.equals(optionCategoryName, that.optionCategoryName) && Objects.equals(optionImage, that.optionImage) && Objects.equals(optionBoughtCount, that.optionBoughtCount) && Objects.equals(optionPrice, that.optionPrice);
    }
}
