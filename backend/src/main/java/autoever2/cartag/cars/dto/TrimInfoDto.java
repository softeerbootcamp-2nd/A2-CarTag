package autoever2.cartag.cars.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TrimInfoDto {
    private int carId;
    private String trim;
    private int carDefaultPrice;

    @Builder
    public TrimInfoDto(int carId, String trim, int carDefaultPrice) {
        this.carId = carId;
        this.trim = trim;
        this.carDefaultPrice = carDefaultPrice;
    }
}
