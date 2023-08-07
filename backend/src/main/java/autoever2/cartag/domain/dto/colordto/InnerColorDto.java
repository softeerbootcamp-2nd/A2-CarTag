package autoever2.cartag.domain.dto.colordto;

import autoever2.cartag.domain.entity.color.Color;
import autoever2.cartag.domain.entity.color.ColorCarMapper;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "차량 내부 색상 반환 DTO")
public class InnerColorDto {
    @Schema(description = "내부 색상 이름")
    private String colorName;
    @Schema(description = "내부 색상 이미지 url")
    private String colorImage;
    @Schema(description = "내부 색상 이미지 가격")
    private Long colorPrice;
    @Schema(description = "판매된 내부 색상 이미지")
    private Long colorBoughtCount;
    @Schema(description = "차량에 적용된 내부 색상 이미지 url")
    private String colorCarImage;

    public static InnerColorDto toDto(ColorCarMapper colorCarMapper, Color color) {
        return InnerColorDto.builder()
                .colorName(color.getColorName())
                .colorImage(color.getColorImage())
                .colorPrice(colorCarMapper.getColorPrice())
                .colorBoughtCount(colorCarMapper.getColorBoughtCount())
                .colorCarImage(colorCarMapper.getColorCarImage())
                .build();
    }
}
