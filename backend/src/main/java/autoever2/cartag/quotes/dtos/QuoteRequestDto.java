package autoever2.cartag.quotes.dtos;

import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuoteRequestDto {
    private int carId;
    private int powerTrainId;
    private int bodyTypeId;
    private int operationId;
    private int outerColorId;
    private int innerColorId;
    private List<Integer> optionIdList = new ArrayList<>();

    @Builder
    public QuoteRequestDto(int carId, int powerTrainId, int bodyTypeId, int operationId, int outerColorId, int innerColorId, List<Integer> optionIdList) {
        this.carId = carId;
        this.powerTrainId = powerTrainId;
        this.bodyTypeId = bodyTypeId;
        this.operationId = operationId;
        this.outerColorId = outerColorId;
        this.innerColorId = innerColorId;
        this.optionIdList = new ArrayList<>();
        this.optionIdList.addAll(optionIdList);
    }

    @Override
    public String toString() {
        return "QuoteRequestDto{" +
                "carId=" + carId +
                ", powerTrainId=" + powerTrainId +
                ", bodyTypeId=" + bodyTypeId +
                ", operationId=" + operationId +
                ", outerColorId=" + outerColorId +
                ", innerColorId=" + innerColorId +
                ", optionIdList=" + Arrays.toString(optionIdList.toArray()) +
                '}';
    }
}
