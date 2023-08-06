package autoever2.cartag.domain.dto.model;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ModelShortDataDTO {

    private int modelId;
    private String modelName;
    private String modelTypeName;
    private Long modelPrice;
    private boolean isDefaultOption;
    private int percentage;
}
