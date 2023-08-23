package autoever2.cartag.models.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ModelDefaultDto {
    private int modelId;
    private String modelName;
    private Long modelPrice;
    private String modelImage;
    private String modelTypeName;

    @Builder
    public ModelDefaultDto(int modelId, String modelName, Long modelPrice, String modelImage, String modelTypeName) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.modelPrice = modelPrice;
        this.modelImage = modelImage;
        this.modelTypeName = modelTypeName;
    }
}
