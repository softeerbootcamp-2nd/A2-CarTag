package autoever2.cartag.controller;

import autoever2.cartag.domain.suboption.SubOptionDto;
import autoever2.cartag.service.SubOptionService;
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
@RequestMapping("/api/suboptions")
@Tag(name = "추가 옵션", description = "추가 옵션 정보 관련 API")
public class SubOptionController {

    private final SubOptionService subOptionService;

    @Operation(summary = "추가 옵션 리스트 조회", description = "추가 옵션 데이터와 선택 비율(%) 및 HMG 데이터 존재 여부 List 제공")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = SubOptionDto.class)))
    })
    @GetMapping("/list")
    public List<SubOptionDto> getSubOptionList(@Parameter(description = "차량 트림 ID") @RequestParam("carid") int carId) {
        return subOptionService.getSubOptionList(carId);
    }
}
