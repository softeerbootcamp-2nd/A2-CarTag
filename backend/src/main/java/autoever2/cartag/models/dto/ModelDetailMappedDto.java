package autoever2.cartag.models.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Schema(description = "모델의 타입, 이름, 설명, 사진을 반환")
public class ModelDetailMappedDto {

    @Schema(description = "모델 타입 명", example = "파워트레인")
    private String modelTypeName;
    @Schema(description = "모델명", example = "디젤2.2")
    private String modelName;
    @Schema(description = "모델 설명", example = "높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다.")
    private String optionDescription;
    @Schema(description = "이미지 저장 주소", example = "/model/1234.jpg")
    private String modelImage;

    @Builder
    public ModelDetailMappedDto(String modelTypeName, String modelName, String optionDescription, String modelImage) {
        this.modelTypeName = modelTypeName;
        this.modelName = modelName;
        this.optionDescription = optionDescription;
        this.modelImage = modelImage;
    }
}
