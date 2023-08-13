package autoever2.cartag.domain.option;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Schema(description = "옵션(기본/추가)의 상세 정보와 이미지, 패키지인 추가옵션의 경우 하위 패키지 정보를 제공")
public class OptionDetailDto {

    @Schema(description = "옵션의 카테고리명", example = "상세품목")
    private String categoryName;
    @Schema(description = "옵션명", example = "20인치 다크 스퍼터링 휠")
    private String optionName;
    @Schema(description = "옵션에 대한 설명", example = "다크 휠입니다.")
    private String optionDescription;
    @Schema(description = "옵션 이미지 저장 위치", example = "/options/rear-passenger.png")
    private String optionImage;
    @Schema(implementation = OptionHmgDataVo.class, description = "HMG 데이터 정보, 구매횟수와 사용횟수. 기본 옵션의 경우 모두 null, 추가옵션의 경우 사용횟수는 null일수도 있지만 구매횟수는 존재")
    private OptionHmgDataVo hmgData;
    @Schema(description = "패키지 여부, true이면 패키지", example = "true")
    private boolean isPackage;
    @ArraySchema(schema = @Schema(implementation = OptionDetailDto.class, description = "하위 옵션 존재 시 하위 옵션들의 데이터, 1레벨까지만 존재"))
    private List<OptionDetailDto> subOptionList;

    public void setIsPackage(boolean isPackage) {
        this.isPackage = isPackage;
    }

    public void setSubOptionList(List<OptionDetailDto> list) {
        subOptionList = list;
    }

    public void setHmgData(OptionHmgDataVo data) {
        this.hmgData = data;
    }
}
