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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OptionDetailMappedDto that = (OptionDetailMappedDto) o;
        return Objects.equals(categoryName, that.categoryName) && Objects.equals(optionName, that.optionName) && Objects.equals(optionDescription, that.optionDescription) && Objects.equals(optionImage, that.optionImage) && Objects.equals(optionUsedCount, that.optionUsedCount) && Objects.equals(optionBoughtCount, that.optionBoughtCount);
    }
}
