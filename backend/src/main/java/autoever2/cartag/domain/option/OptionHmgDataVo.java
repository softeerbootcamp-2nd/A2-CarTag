package autoever2.cartag.domain.option;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "옵션의 HMG 데이터 반환, 1개만 있어도 포함")
public class OptionHmgDataVo {

    @Schema(description = "옵션의 구매 횟수. 기본 옵션은 존재하지 않음. 최근 90일 기준", example = "1380")
    private Long optionBoughtCount;
    @Schema(description = "옵션의 실사용 횟수. 15000km당", example = "13.2")
    private Double optionUsedCount;
    @Schema(description = "옵션이 절반 이상인지 여부", example = "true")
    private boolean isOverHalf;

    public void setOverHalf(boolean value) {
        isOverHalf = value;
    }
}
