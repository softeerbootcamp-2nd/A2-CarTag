package autoever2.cartag.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ModelDefaultDto {
    private int modelId;
    private String modelName;
    private Long modelPrice;
    private String modelImage;
    private String modelTitle;
}
