package autoever2.cartag.domain.color;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Schema(description = "차량 외부 색상 반환 DTO")
public class OuterColorDto {
    @Schema(description = "외부 색상 이름")
    private String colorName;
    @Schema(description = "외부 색상 이미지 url")
    private String colorImage;
    @Schema(description = "외부 색상 이미지 가격")
    private Long colorPrice;
    @Schema(description = "판매된 외부 색상 이미지")
    private Long colorBoughtCount;
    @Schema(description = "차량에 적용된 외부 색상 이미지 url")
    private String colorCarImage;
    @Builder
    public OuterColorDto(String colorName, String colorImage, Long colorPrice, Long colorBoughtCount, String colorCarImage) {
        this.colorName = colorName;
        this.colorImage = colorImage;
        this.colorPrice = colorPrice;
        this.colorBoughtCount = colorBoughtCount;
        this.colorCarImage = colorCarImage;
    }
}
