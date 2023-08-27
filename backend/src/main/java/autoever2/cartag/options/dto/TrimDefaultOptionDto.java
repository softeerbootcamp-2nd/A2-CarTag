package autoever2.cartag.options.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Schema(description = "차량 DefaultOption 반환")
public class TrimDefaultOptionDto {
    @Schema(description = "option 이름")
    private String optionName;
    @Schema(description = "option image의 url")
    private String optionImage;
    @Schema(description = "option에 대한 설명")
    private String optionDescription;
    @Schema(description = "option의 구매 횟수")
    private int OptionUsedCount;

    @Builder
    public TrimDefaultOptionDto(String optionName, String optionImage, String optionDescription, int OptionUsedCount) {
        this.optionName = optionName;
        this.optionImage = optionImage;
        this.optionDescription = optionDescription;
        this.OptionUsedCount = OptionUsedCount;
    }

}
