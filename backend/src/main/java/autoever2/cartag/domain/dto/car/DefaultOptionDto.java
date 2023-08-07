package autoever2.cartag.domain.dto.car;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "차량 DefaultOption 반환")
public class DefaultOptionDto {
    @Schema(description = "option 이름")
    private String optionName;
    @Schema(description = "option image의 url")
    private String optionImage;
    @Schema(description = "option에 대한 설명")
    private String optionDescription;
    @Schema(description = "option의 구매 횟수")
    private int defaultOptionCount;
}
