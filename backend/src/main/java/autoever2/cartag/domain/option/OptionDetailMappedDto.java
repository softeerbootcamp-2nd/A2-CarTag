package autoever2.cartag.domain.option;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

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
}
