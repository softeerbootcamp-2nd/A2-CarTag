package autoever2.cartag.quotes.dtos;

import autoever2.cartag.cars.dto.TrimDataDto;
import autoever2.cartag.colors.dto.ColorDto;
import autoever2.cartag.options.dto.QuoteSubOptionDto;
import autoever2.cartag.models.dto.ModelDefaultDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(description = "트림 정보, 모델타입 정보, 색상 정보, 옵션들의 리스트 번환")
public class QuoteInfoDto {

    @Schema(description = "트림에 대한 정보")
    private TrimDataDto trimData;

    @Schema(description = "파워트레인 정보")
    private ModelDefaultDto powertrainData;

    @Schema(description = "구동방식 정보")
    private ModelDefaultDto operationData;

    @Schema(description = "바디타입 정보")
    private ModelDefaultDto bodyTypeData;

    @Schema(description = "외장색상 정보")
    private ColorDto outerColor;

    @Schema(description = "내장색상 정보")
    private ColorDto innerColor;

    @Schema(description = "추가옵션 상세정보 리스트")
    List<QuoteSubOptionDto> optionList;

    @Builder
    public QuoteInfoDto(TrimDataDto trimData, ModelDefaultDto powertrainData, ModelDefaultDto operationData, ModelDefaultDto bodyTypeData, ColorDto outerColor, ColorDto innerColor, List<QuoteSubOptionDto> optionList) {
        this.trimData = trimData;
        this.powertrainData = powertrainData;
        this.operationData = operationData;
        this.bodyTypeData = bodyTypeData;
        this.outerColor = outerColor;
        this.innerColor = innerColor;
        this.optionList = optionList;
    }
}
