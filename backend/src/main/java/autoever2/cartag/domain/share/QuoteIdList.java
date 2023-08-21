package autoever2.cartag.domain.share;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter @Setter
public class QuoteIdList {
    private int carId;
    private int powerTrainId;
    private int bodyTypeId;
    private int operationId;
    private int outerColorId;
    private int innerColorId;
    private List<Integer> optionIdList = new ArrayList<>();
}
