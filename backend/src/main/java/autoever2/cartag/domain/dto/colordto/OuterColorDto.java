package autoever2.cartag.domain.dto.colordto;

import autoever2.cartag.domain.entity.color.Color;
import autoever2.cartag.domain.entity.color.ColorCarMapper;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter @Builder
@Schema(description = "차량 외부 색상 반환 DTO")
public class OuterColorDto {
    @Schema(description = "외부 색상 이름", nullable = true)
    private String colorName;
    @Schema(description = "외부 색상 이미지 url", nullable = true)
    private String colorImage;
    @Schema(description = "외부 색상 이미지 가격", nullable = true)
    private Long colorPrice;
    @Schema(description = "판매된 외부 색상 이미지", nullable = true)
    private Long colorBoughtCount;
    @Schema(description = "차량에 적용된 외부 색상 이미지 url", nullable = true)
    private String colorCarImage;

    public static OuterColorDto toDto(ColorCarMapper colorCarMapper, Color color) {
        return OuterColorDto.builder()
                .colorName(color.getColorName())
                .colorImage(color.getColorImage())
                .colorPrice(colorCarMapper.getColorPrice())
                .colorBoughtCount(colorCarMapper.getColorBoughtCount())
                .colorCarImage(colorCarMapper.getColorCarImage())
                .build();
    }

}
