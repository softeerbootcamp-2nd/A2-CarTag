package autoever2.cartag.cars.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CarInfoDto {

    private int carId;
    private String trim;
    private int carDefaultPrice;
    private String outerImage;
    private String innerImage;
    private String wheelImage;
    private String carDescription;

}
