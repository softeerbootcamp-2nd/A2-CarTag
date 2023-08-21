package autoever2.cartag.domain.car;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
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
