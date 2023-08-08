package autoever2.cartag.domain.suboption;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@Schema(description = "모델 타입 + 이름 + 선택 비율 반환")
public class SubOptionDto {

    @Schema(description = "추가옵션 ID", example = "1")
    private int subOptionId;
    @Schema(description = "추가옵션명, 혹은 패키지명", example = "2열 통풍시트")
    private String optionName;
    @Schema(description = "카테고리명", example = "휠")
    private String optionCategoryName;
    @Schema(description = "해시태그 리스트", example = "[장거리운전, 상쾌한]")
    private List<String> hashtagName;
    @Schema(description = "옵션 이미지 URL", example = "/images/options/sub/image1.jpg")
    private String optionImage;
    @Schema(description = "옵션 선택 비율", example = "28")
    private int percentage;
    @Schema(description = "추가 금액", example = "100000")
    private Long optionPrice;
    @Schema(description = "HMG 데이터 존재 여부", example = "1")
    private boolean hasHmgData;
}
