package autoever2.cartag.domain.entity.color;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Color {
    private int colorId;
    private String colorName;
    private String colorImage;
    private int isOuterColor;

}
