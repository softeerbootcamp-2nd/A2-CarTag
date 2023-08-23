package autoever2.cartag.models;

import autoever2.cartag.models.dto.ModelDetailMappedDto;
import autoever2.cartag.models.dto.ModelEfficiencyDataDto;
import autoever2.cartag.models.dto.ModelShortDataDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/modeltypes")
@Tag(name = "모델타입 관련 API", description = "모델 타입 리스트 및 상세 정보, 모델과 관련한 HMG데이터를 제공합니다.")
public class ModelController {

    private final ModelService modelTypeService;

    @Operation(summary = "모델타입의 리스트를 조회하는 API", description = "트림이 가지는 모든 모델타입을 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", description = "성공", content = {
                    @Content(array = @ArraySchema(schema = @Schema(implementation = ModelShortDataDto.class)))})
    @GetMapping("/list")
    public List<ModelShortDataDto> getTrimModelType(@Parameter(description = "트림 ID") @RequestParam("carid") int carId) {
        return modelTypeService.getModelTypeData(carId);
    }

    @Operation(summary = "특정 모델 타입의 상세데이터를 조회하는 API", description = "특정 모델의 모델타입명과 모델명, 설명, 이미지를 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = ModelDetailMappedDto.class)))
    @GetMapping("/detail")
    public ModelDetailMappedDto getModelDetail(@Parameter(description = "모델 타입 ID") @RequestParam("modelid") int modelId) {
        return modelTypeService.getModelDetail(modelId);
    }

    @Operation(summary = "효율 HMG 데이터를 조회하는 API", description = "파워트레인과 구동방식이 선택되었을 때 효율(연비 등) HMG 데이터를 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = ModelEfficiencyDataDto.class)))
    @GetMapping("/hmg-efficiency")
    public ModelEfficiencyDataDto getPowerTrainData(@Parameter(description = "파워트레인 ID") @RequestParam("powertrain") int powerTrainId, @Parameter(description = "구동방식 ID") @RequestParam("operation") int operationId) {
        return modelTypeService.getEfficiencyData(powerTrainId, operationId);
    }
}
