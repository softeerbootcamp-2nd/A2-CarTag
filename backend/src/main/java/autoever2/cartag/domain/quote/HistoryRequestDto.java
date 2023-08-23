package autoever2.cartag.domain.quote;

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
