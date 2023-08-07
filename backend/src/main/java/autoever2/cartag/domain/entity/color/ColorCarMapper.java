package autoever2.cartag.domain.entity.color;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ColorCarMapper {
    private int colorCarMapperId;
    private int carId;
    private int colorId;
    private String colorCarImage;
    private Long colorPrice;
    private Long colorBoughtCount;

}
