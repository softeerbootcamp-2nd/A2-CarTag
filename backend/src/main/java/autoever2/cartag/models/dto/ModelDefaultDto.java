package autoever2.cartag.models.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ModelDefaultDto {
    private int modelId;
    private String modelName;
    private Long modelPrice;
    private String modelImage;
    private String modelTitle;

    public ModelDefaultDto(int modelId, String modelName, Long modelPrice, String modelImage, String modelTitle) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.modelPrice = modelPrice;
        this.modelImage = modelImage;
        this.modelTitle = modelTitle;
    }
}
