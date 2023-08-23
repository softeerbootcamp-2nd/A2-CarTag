package autoever2.cartag.quotes.dtos;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Schema(description = "실제 판매견적 간략 데이터")
@Getter
@Setter
@NoArgsConstructor
public class HistoryShortDto {

    @Schema(description = "견적의 ID, 또는 내 견적의 ID")
    private Long historyId;
    @Schema(description = "견적의 판매 횟수")
    private int soldCount;
    @ArraySchema(schema = @Schema(implementation = HistoryShortDto.class, description = "유사견적 상위 4개 반환"))
    List<HistoryShortDto> histories;

    @Builder
    public HistoryShortDto(Long historyId, int soldCount, List<HistoryShortDto> histories) {
        this.historyId = historyId;
        this.soldCount = soldCount;
        this.histories = histories;
    }
}
