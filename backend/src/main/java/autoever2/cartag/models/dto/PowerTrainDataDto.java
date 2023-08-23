package autoever2.cartag.models.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "파워트레인의 HMG 데이터를 반환")
public class PowerTrainDataDto {

    private String maxPs;
    private String maxKgfm;
    @Schema(description = "최고값 대비 Ps 비율")
    private Double ratioPs;
    @Schema(description = "최고값 대비 kgf 비율")
    private Double ratioKgfm;
}
