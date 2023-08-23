package autoever2.cartag.models.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ModelShortMappedDto {

    private int modelId;
    private String modelName;
    private String modelTypeName;
    private Long modelPrice;
    private Long modelBoughtCount;
    private boolean isDefaultModel;
    private String modelImage;
    private int modelTypeId;
    private String maxPs;
    private String maxKgfm;

    public void setIsDefaultModel(int isDefaultModel) {
        this.isDefaultModel = isDefaultModel > 0;
    }
}
