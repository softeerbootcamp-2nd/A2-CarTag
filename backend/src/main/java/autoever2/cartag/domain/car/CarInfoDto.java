package autoever2.cartag.domain.car;

import lombok.Builder;
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

    @Builder
    public CarInfoDto(int carId, String trim, int carDefaultPrice, String outerImage, String innerImage, String wheelImage, String carDescription) {
        this.carId = carId;
        this.trim = trim;
        this.carDefaultPrice = carDefaultPrice;
        this.outerImage = outerImage;
        this.innerImage = innerImage;
        this.wheelImage = wheelImage;
        this.carDescription = carDescription;
    }
}
