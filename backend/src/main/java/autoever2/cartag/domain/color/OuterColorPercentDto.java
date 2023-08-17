package autoever2.cartag.domain.color;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Schema(description = "차량 외부 색상 반환 DTO")
public class OuterColorPercentDto {
    @Schema(description = "외부 색상 이미지 id")
    private int colorId;
    @Schema(description = "외부 색상 이름")
    private String colorName;
    @Schema(description = "외부 색상 이미지 url")
    private String colorImage;
    @Schema(description = "외부 색상 이미지 가격")
    private Long colorPrice;
    @Schema(description = "판매된 외부 색상 판매 비율")
    private int colorBoughtPercent;

    @Builder
    public OuterColorPercentDto(int colorId, String colorName, String colorImage, Long colorPrice, int colorBoughtPercent) {
        this.colorId = colorId;
        this.colorName = colorName;
        this.colorImage = colorImage;
        this.colorPrice = colorPrice;
        this.colorBoughtPercent = colorBoughtPercent;
    }

    public static OuterColorPercentDto toPercent(OuterColorDto outerColorDto, int colorBoughtPercent) {
        return OuterColorPercentDto.builder()
                .colorId(outerColorDto.getColorId())
                .colorName(outerColorDto.getColorName())
                .colorImage(outerColorDto.getColorImage())
                .colorPrice(outerColorDto.getColorPrice())
                .colorBoughtPercent(colorBoughtPercent)
                .build();
    }
}
