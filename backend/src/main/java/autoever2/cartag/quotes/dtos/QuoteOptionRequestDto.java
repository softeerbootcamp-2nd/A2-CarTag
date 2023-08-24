package autoever2.cartag.quotes.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(description = "현재 견적 ID와 유사견적 ID를 제공")
public class QuoteOptionRequestDto {

    @Schema(description = "내 견적 ID")
    private Long quoteId;
    @Schema(description = "비교 견적 ID")
    private List<Long> historyIds;

    @Builder
    public QuoteOptionRequestDto(Long quoteId, List<Long> historyIds) {
        this.quoteId = quoteId;
        this.historyIds = historyIds;
    }
}
