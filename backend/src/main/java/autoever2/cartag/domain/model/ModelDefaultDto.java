package autoever2.cartag.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class ModelDefaultDto {
    private int modelId;
    private String modelName;
    private Long modelPrice;
    private String modelImage;
    private String modelTitle;

    @Builder
    public ModelDefaultDto(int modelId, String modelName, Long modelPrice, String modelImage, String modelTitle) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.modelPrice = modelPrice;
        this.modelImage = modelImage;
        this.modelTitle = modelTitle;
    }
}
