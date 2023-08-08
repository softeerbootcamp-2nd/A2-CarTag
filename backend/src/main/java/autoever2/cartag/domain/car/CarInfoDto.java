package autoever2.cartag.domain.car;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarInfoDto {

    private int carId;

    private String trim;

    private int carDefaultPrice;

    private String outerImage;

    private String innerImage;

    private String wheelImage;

    private String carDescription;
}
