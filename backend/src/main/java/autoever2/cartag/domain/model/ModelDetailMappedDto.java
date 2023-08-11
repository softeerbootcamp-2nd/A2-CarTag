package autoever2.cartag.domain.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Setter
@NoArgsConstructor
@Getter
@Schema(description = "모델 상세정보(이름, 설명, 사진) 데이터")
public class ModelDetailMappedDto {

    @Schema(description = "모델 타입 명", example = "파워트레인")
    private String modelTypeName;
    @Schema(description = "모델명", example = "디젤2.2")
    private String modelName;
    @Schema(description = "모델 설명", example = "높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다.")
    private String optionDescription;
    @Schema(description = "이미지 저장 URL", example = "/model/1234.jpg")
    private String modelImage;

    @Builder
    public ModelDetailMappedDto(String modelTypeName, String modelName, String optionDescription, String modelImage) {
        this.modelTypeName = modelTypeName;
        this.modelName = modelName;
        this.optionDescription = optionDescription;
        this.modelImage = modelImage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ModelDetailMappedDto that = (ModelDetailMappedDto) o;
        return Objects.equals(modelTypeName, that.modelTypeName) && Objects.equals(modelName, that.modelName) && Objects.equals(optionDescription, that.optionDescription) && Objects.equals(modelImage, that.modelImage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(modelTypeName, modelName, optionDescription, modelImage);
    }
}
