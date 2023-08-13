package autoever2.cartag.controller;

import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/cars")
@RequiredArgsConstructor
@Tag(name = "TrimController", description = "트림 반환 api")
public class TrimController {

    private final CarService service;

    @Operation(summary = "trim 조회", description = "trim 조회 method")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = CarDto.class))),
    })
    @GetMapping("/types")
    public List<CarDto> carTrimInfo(@Parameter(description = "선택한 car_type") @RequestParam int carType) {
        return service.findCarByCarType(carType);
    }


}
