package autoever2.cartag.models.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(description = "기본값 모델의 ID, 이름, 타입명, 추가금액, 이미지를 반환")
public class ModelDefaultDto {

    @Schema(description = "모델 ID", example = "1")
    private int modelId;
    @Schema(description = "모델명", example = "디젤 2.2")
    private String modelName;
    @Schema(description = "모델 추가금액", example = "100000")
    private Long modelPrice;
    @Schema(description = "모델 이미지 주소")
    private String modelImage;
    @Schema(description = "모델 타입명", example = "파워트레인")
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
