package autoever2.cartag.domain.entity.option;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DefaultOption {
    private int defaultOption;
    private int categoryId;
    private String optionName;
    private String optionImage;
    private String optionDescription;
}
