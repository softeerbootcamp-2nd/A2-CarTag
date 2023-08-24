package autoever2.cartag.quotes.dtos;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.beans.ConstructorProperties;
import java.util.List;

@Schema(description = "판매 견적의 ID, 판매수를 반환")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HistoryShortDto {

    @Schema(description = "견적의 ID, 또는 내 견적의 ID", example = "1")
    private Long historyId;
    @Schema(description = "견적의 판매 횟수", example = "213")
    private int soldCount;
    @ArraySchema(schema = @Schema(implementation = HistoryShortDto.class, description = "유사견적"))
    List<HistoryShortDto> histories;

    @Builder
    public HistoryShortDto(Long historyId, int soldCount, List<HistoryShortDto> histories) {
        this.historyId = historyId;
        this.soldCount = soldCount;
        this.histories = histories;
    }
}
