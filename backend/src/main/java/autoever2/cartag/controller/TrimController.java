package autoever2.cartag.controller;

import autoever2.cartag.domain.car.BoughtCarDto;
import autoever2.cartag.domain.car.CarDefaultDto;
import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.domain.share.QuoteIdList;
import autoever2.cartag.domain.share.QuoteInfoDto;
import autoever2.cartag.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public List<CarDto> carTrimInfo(@Parameter(description = "선택한 car_type") @RequestParam("cartype") int carType) {
        return service.findCarByCarType(carType);
    }

    @Operation(summary = "차량 기본 정보 조회", description = "차량 기본 정보 조회 method")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = CarDefaultDto.class))),
    })
    @GetMapping("/infos/defaults")
    public CarDefaultDto carDefaultDto(@Parameter(description = "선택한 car_id") @RequestParam("carid") int carId) {
        return service.findCarDefaultDtoByCarId(carId);
    }

    @Operation(summary = "차량 구매 정보 반환 api", description = "차량 구매 정보 조회 method")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = BoughtCarDto.class))),
    })
    @GetMapping("bought/infos")
    public List<BoughtCarDto> boughtCarDtos() {
        return service.findAllBoughInfos();
    }

    @Operation(summary = "차량 공유하기를 위한 api", description = "차량 공유를 위한 정보 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = QuoteInfoDto.class))),
    })
    @GetMapping("/infos/shares")
    public QuoteInfoDto boughtCarDtos(@Parameter(description = "선택한 id 리스트") @RequestBody QuoteIdList idList) {
        return service.findShareInfoDto(idList);
    }


}
