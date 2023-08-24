package autoever2.cartag.models.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ModelShortMappedDto {

    private int modelId;
    private String modelName;
    private String modelTypeName;
    private Long modelPrice;
    private Long modelBoughtCount;
    private String modelImage;
    private int modelTypeId;
    private String maxPs;
    private String maxKgfm;

    @Builder
    public ModelShortMappedDto(int modelId, String modelName, String modelTypeName, Long modelPrice, Long modelBoughtCount, String modelImage, int modelTypeId, String maxPs, String maxKgfm) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.modelTypeName = modelTypeName;
        this.modelPrice = modelPrice;
        this.modelBoughtCount = modelBoughtCount;
        this.modelImage = modelImage;
        this.modelTypeId = modelTypeId;
        this.maxPs = maxPs;
        this.maxKgfm = maxKgfm;
    }
}
