package autoever2.cartag.domain.dto.car;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class DefaultOptionDto {
    private String optionName;
    private String optionImage;
    private String optionDescription;
    private int defaultOptionCount;
}
