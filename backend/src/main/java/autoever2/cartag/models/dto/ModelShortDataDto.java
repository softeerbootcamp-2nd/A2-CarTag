package autoever2.cartag.models.dto;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "모델의 ID, 이름, 타입명, 추가금액, 퍼센트, 이미지, HMG데이터를 반환")
public class ModelShortDataDto {

    @Schema(description = "모델 ID", example = "1")
    private int modelId;
    @Schema(description = "모델명", example = "디젤 2.2")
    private String modelName;
    @Schema(description = "모델 타입명", example = "파워트레인")
    private String modelTypeName;
    @Schema(description = "모델 추가금액", example = "100000")
    private Long modelPrice;
    @Schema(description = "선택 비율 퍼센트 값(정수), 데이터가 없다면 0", example = "38")
    private int percentage;
    @Schema(description = "모델 이미지 주소")
    private String modelImage;
    @ArraySchema(schema = @Schema(implementation = PowerTrainDataDto.class, description = "파워트레인의 HMG 데이터"))
    private PowerTrainDataDto hmgData;

    public void setHmgData(PowerTrainDataDto hmgData) {
        this.hmgData = hmgData;
    }
}
