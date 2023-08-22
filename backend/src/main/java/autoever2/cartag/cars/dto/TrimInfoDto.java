package autoever2.cartag.cars.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TrimInfoDto {
    private int carId;
    private String trim;
    private int carDefaultPrice;
}
