package autoever2.cartag.options.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "모델 타입 + 이름 + 선택 비율 반환")
public class DefaultOptionDto {

    @Schema(description = "기본옵션 ID", example = "1")
    private int optionId;
    @Schema(description = "추가옵션명, 혹은 패키지명", example = "2열 통풍시트")
    private String optionName;
    @Schema(description = "카테고리명", example = "휠")
    private String optionCategoryName;
    @Schema(description = "옵션 이미지 URL", example = "/images/options/sub/image1.jpg")
    private String optionImage;
    @Schema(description = "HMG 데이터 존재 여부", example = "1")
    private boolean hasHmgData;
}
