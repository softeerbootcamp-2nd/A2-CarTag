package autoever2.cartag.cars.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
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
