package autoever2.cartag.colors.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(description = "차량 내부 색상 반환 DTO")
public class ColorDto {

    @Schema(description = "색상 ID")
    private int colorId;
    @Schema(description = "색상 이름", example = "문라이트 블루 펄")
    private String colorName;
    @Schema(description = "색상 이미지 주소")
    private String colorImage;
    @Schema(description = "색상타입명", example = "외장색명")
    private String colorType;
    @Schema(description = "색상 추가금액")
    private Long colorPrice;
    @Schema(description = "색상 판매량")
    private Long colorBoughtCount;
    @Schema(description = "색상이 적용된 차량 이미지 주소")
    private String colorCarImage;

    @Builder
    public ColorDto(int colorId, String colorName, String colorImage, String colorType, Long colorPrice, Long colorBoughtCount, String colorCarImage) {
        this.colorId = colorId;
        this.colorName = colorName;
        this.colorImage = colorImage;
        this.colorType = colorType;
        this.colorPrice = colorPrice;
        this.colorBoughtCount = colorBoughtCount;
        this.colorCarImage = colorCarImage;
    }
}
