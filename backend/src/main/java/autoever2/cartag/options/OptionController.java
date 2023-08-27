package autoever2.cartag.options;

import autoever2.cartag.options.dto.DefaultOptionDto;
import autoever2.cartag.options.dto.OptionDetailDto;
import autoever2.cartag.options.dto.SubOptionDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/options")
@Tag(name = "옵션", description = "옵션 정보 관련 API")
public class OptionController {

    private final OptionService optionService;

    @Operation(summary = "추가 옵션 리스트 조회", description = "추가 옵션 데이터와 선택 비율(%) 및 HMG 데이터 존재 여부 List 제공")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = SubOptionDto.class)))
    })
    @GetMapping("/sublist")
    public List<SubOptionDto> getSubOptionList(@Parameter(description = "차량 트림 ID") @RequestParam("carid") int carId) {
        return optionService.getSubOptionList(carId);
    }

    @Operation(summary = "추가옵션 상세정보 조회", description = "추가옵션 데이터 상세정보 및 이미지, HMG가 존재한다면(비어있다면 비어있는 부분을 Null) 보냄")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = OptionDetailDto.class)))
    })
    @GetMapping("/sub/detail")
    public OptionDetailDto getSubOptionDetail(@Parameter(description = "차량 트림 ID") @RequestParam("carid") int carId, @Parameter(description = "옵션 ID") @RequestParam("optionid") int optionId) {
        return optionService.getOptionDetailData(carId, optionId, false);
    }

    @Operation(summary = "기본옵션 상세정보 조회", description = "기본옵션 데이터 상세정보 및 이미지, HMG가 존재한다면(비어있다면 비어있는 부분을 Null) 보냄")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = OptionDetailDto.class)))
    })
    @GetMapping("/default/detail")
    public OptionDetailDto getDefaultOptionDetail(@Parameter(description = "차량 트림 ID") @RequestParam("carid") int carId, @Parameter(description = "옵션 ID") @RequestParam("optionid") int optionId) {
        return optionService.getOptionDetailData(carId, optionId, true);
    }

    @Operation(summary = "기본 옵션 리스트 조회", description = "기본 옵션 데이터와 및 HMG 데이터 존재 여부 List 제공")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = DefaultOptionDto.class)))
    })
    @GetMapping("/defaultlist")
    public List<DefaultOptionDto> getDefaultOptionList(@Parameter(description = "차량 트림 ID") @RequestParam("carid") int carId) {
        return optionService.getDefaultOptionList(carId);
    }
}
