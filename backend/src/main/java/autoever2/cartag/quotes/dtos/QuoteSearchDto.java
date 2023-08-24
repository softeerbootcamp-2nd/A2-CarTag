package autoever2.cartag.quotes.dtos;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Getter
public class QuoteSearchDto {

    private int carId;
    private int powerTrainId;
    private int bodyTypeId;
    private int operationId;
    private List<Integer> optionIds;

    @Builder
    public QuoteSearchDto(int carId, int powerTrainId, int bodyTypeId, int operationId, List<Integer> optionIds) {
        this.carId = carId;
        this.powerTrainId = powerTrainId;
        this.bodyTypeId = bodyTypeId;
        this.operationId = operationId;
        this.optionIds = new ArrayList<>();

        this.optionIds.addAll(optionIds);
    }

    public void addAllOption(List<Integer> optionId) {
        optionIds.addAll(optionId);
        Collections.sort(optionIds);
    }

    public String getOptionIds() {
        if(optionIds.isEmpty()) {
            return "";
        }

        StringBuilder stringBuilder = new StringBuilder();
        for(int index = 0; index < optionIds.size() - 1; index++) {
            stringBuilder.append(optionIds.get(index)).append(",");
        }
        stringBuilder.append(optionIds.get(optionIds.size()-1));

        return stringBuilder.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuoteSearchDto that = (QuoteSearchDto) o;
        return carId == that.carId && powerTrainId == that.powerTrainId && bodyTypeId == that.bodyTypeId && operationId == that.operationId && Objects.equals(optionIds, that.optionIds);
    }
}
