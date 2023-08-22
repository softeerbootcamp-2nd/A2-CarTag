package autoever2.cartag.domain.share;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter @Setter
@NoArgsConstructor
public class QuoteIdList {
    private int carId;
    private int powerTrainId;
    private int bodyTypeId;
    private int operationId;
    private int outerColorId;
    private int innerColorId;
    private List<Integer> optionIdList = new ArrayList<>();

    @Builder
    public QuoteIdList(int carId, int powerTrainId, int bodyTypeId, int operationId, int outerColorId, int innerColorId, List<Integer> optionIdList) {
        this.carId = carId;
        this.powerTrainId = powerTrainId;
        this.bodyTypeId = bodyTypeId;
        this.operationId = operationId;
        this.outerColorId = outerColorId;
        this.innerColorId = innerColorId;
        this.optionIdList = optionIdList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuoteIdList that = (QuoteIdList) o;
        return carId == that.carId && powerTrainId == that.powerTrainId && bodyTypeId == that.bodyTypeId && operationId == that.operationId && outerColorId == that.outerColorId && innerColorId == that.innerColorId && Objects.equals(optionIdList, that.optionIdList);
    }
}
