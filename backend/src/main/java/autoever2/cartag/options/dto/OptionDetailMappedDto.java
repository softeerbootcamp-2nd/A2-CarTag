package autoever2.cartag.options.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OptionDetailMappedDto {

    private String categoryName;
    private String optionName;
    private String optionDescription;
    private String optionImage;
    private Double optionUsedCount;
    private Long optionBoughtCount;

    @Builder
    public OptionDetailMappedDto(String categoryName, String optionName, String optionDescription, String optionImage, Double optionUsedCount, Long optionBoughtCount) {
        this.categoryName = categoryName;
        this.optionName = optionName;
        this.optionDescription = optionDescription;
        this.optionImage = optionImage;
        this.optionUsedCount = optionUsedCount;
        this.optionBoughtCount = optionBoughtCount;
    }

    public void setOptionUsedCount(Double value) {
        this.optionUsedCount = value;
        if(value == null || value == 0.0) {
            optionUsedCount = null;
        }
    }

    public void setOptionBoughtCount(Long value) {
        this.optionBoughtCount = value;
        if(value == 0.0) {
            optionBoughtCount = null;
        }
    }
}
