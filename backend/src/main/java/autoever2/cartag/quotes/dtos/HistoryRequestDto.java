package autoever2.cartag.quotes.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class HistoryRequestDto {

    private Long quoteId;
    private List<Long> historyIds;

    @Builder
    public HistoryRequestDto(Long quoteId, List<Long> historyIds) {
        this.quoteId = quoteId;
        this.historyIds = historyIds;
    }
}
