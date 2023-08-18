package autoever2.cartag.controller;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.InnerColorPercentDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.domain.color.OuterColorPercentDto;
import autoever2.cartag.service.ColorService;
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
@RequestMapping("api/cars")
@Tag(name = "ColorController", description = "색상 반환 api")
public class ColorController {

    private final ColorService service;

    @Operation(summary = "차량 외장 색상 조회", description = "차량 외장 색상 조회 method")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = OuterColorPercentDto.class))),
    })
    @GetMapping("/colors/outer")
    public List<OuterColorPercentDto> carOuterColorInfo(@Parameter(description = "선택한 car_id") @RequestParam("carid") int carId) {
        return service.findOuterColorByCarId(carId);
    }

    @Operation(summary = "차량 외장 색상 이미지 조회", description = "차량 외장 색상 이미지 조회 method")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공")
    })
    @GetMapping("/colors/outer/images")
    public List<String> carOuterColorImageInfo(@Parameter(description = "선택한 color_id") @RequestParam("colorid") int colorId) {
        return service.changeImageToImages(colorId);
    }

    @Operation(summary = "차량 내장 색상 조회", description = "차량 내장 색상 조회 method")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = InnerColorPercentDto.class))),
    })
    @GetMapping("/colors/inner")
    public List<InnerColorPercentDto> carInnerColorInfo(@Parameter(description = "선택한 car_id") @RequestParam("carid") int carId) {
        return service.findInnerColorByCarId(carId);
    }
}
