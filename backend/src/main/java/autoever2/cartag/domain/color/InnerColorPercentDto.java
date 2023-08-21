package autoever2.cartag.domain.color;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
@Getter
@Schema(description = "차량 내부 색상 반환 DTO")
public class InnerColorPercentDto {
    @Schema(description = "내부 색상 id")
    private int colorId;
    @Schema(description = "내부 색상 이름")
    private String colorName;
    @Schema(description = "내부 색상 이미지 url")
    private String colorImage;
    @Schema(description = "내부 색상 이미지 가격")
    private Long colorPrice;
    @Schema(description = "판매된 내부 색상 판매 비율")
    private int colorBoughtPercent;
    @Schema(description = "차량에 적용된 내부 색상 이미지 url")
    private String colorCarImage;
    @Builder
    public InnerColorPercentDto(int colorId, String colorName, String colorImage, Long colorPrice, int colorBoughtPercent, String colorCarImage) {
        this.colorId = colorId;
        this.colorName = colorName;
        this.colorImage = colorImage;
        this.colorPrice = colorPrice;
        this.colorBoughtPercent = colorBoughtPercent;
        this.colorCarImage = colorCarImage;
    }

    public static InnerColorPercentDto toPercent(InnerColorDto innerColorDto, int colorBoughtPercent) {
        return InnerColorPercentDto.builder()
                .colorId(innerColorDto.getColorId())
                .colorName(innerColorDto.getColorName())
                .colorImage(innerColorDto.getColorImage())
                .colorPrice(innerColorDto.getColorPrice())
                .colorBoughtPercent(colorBoughtPercent)
                .colorCarImage(innerColorDto.getColorCarImage())
                .build();
    }
}
