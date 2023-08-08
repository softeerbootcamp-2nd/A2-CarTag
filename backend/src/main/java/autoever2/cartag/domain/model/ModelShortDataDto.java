package autoever2.cartag.domain.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "모델 타입 + 이름 + 선택 비율 반환")
public class ModelShortDataDto {

    @Schema(description = "모델ID", example = "1")
    private int modelId;
    @Schema(description = "모델명", example = "디젤 2.2")
    private String modelName;
    @Schema(description = "모델 타입명", example = "파워트레인")
    private String modelTypeName;
    @Schema(description = "모델 추가금액", example = "100000")
    private Long modelPrice;
    @Schema(description = "기본 옵션 여부, 기본 옵션이면 처음 진입 시 자동 체크", example = "1")
    private boolean isDefaultOption;
    @Schema(description = "선택 비율 퍼센트 값(정수), 데이터가 없다면 0", example = "38")
    private int percentage;
}
