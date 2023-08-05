package autoever2.cartag.domain.entity.color;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ColorCarMapper {
    private int colorCarMapperId;
    private int carId;
    private int colorId;
    private String colorCarImage;
    private Long colorPrice;
    private Long colorBoughtCount;

}
