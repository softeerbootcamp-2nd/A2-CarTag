package autoever2.cartag.domain.entity.car;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
