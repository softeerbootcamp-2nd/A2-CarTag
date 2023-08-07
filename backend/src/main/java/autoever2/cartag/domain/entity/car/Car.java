package autoever2.cartag.domain.entity.car;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Car {

    private int carId;

    private int carTypeId;

    private String trim;

    private int carDefaultPrice;

    private String outerImage;

    private String innerImage;

    private String wheelImage;

    private Long boughtCount;

    private String carDescription;
}
