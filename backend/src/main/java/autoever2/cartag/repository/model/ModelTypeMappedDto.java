package autoever2.cartag.repository.model;

import lombok.Builder;
import lombok.Getter;

import java.util.Objects;

@Getter
public class ModelTypeMappedDto {

    private int modelId;
    private String modelName;
    private String modelTypeName;
    private Long modelPrice;
    private Long modelBoughtCount;
    private boolean isDefaultOption;

    @Builder
    public ModelTypeMappedDto(int modelId, String modelName, String modelTypeName, Long modelPrice, Long modelBoughtCount, boolean isDefaultOption) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.modelTypeName = modelTypeName;
        this.modelPrice = modelPrice;
        this.modelBoughtCount = modelBoughtCount;
        this.isDefaultOption = isDefaultOption;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ModelTypeMappedDto that = (ModelTypeMappedDto) o;
        return modelId == that.modelId && isDefaultOption == that.isDefaultOption && Objects.equals(modelName, that.modelName) && Objects.equals(modelTypeName, that.modelTypeName) && Objects.equals(modelPrice, that.modelPrice) && Objects.equals(modelBoughtCount, that.modelBoughtCount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(modelId, modelName, modelTypeName, modelPrice, modelBoughtCount, isDefaultOption);
    }
}
