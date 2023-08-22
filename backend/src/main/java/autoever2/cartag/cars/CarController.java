package autoever2.cartag.cars;

import autoever2.cartag.cars.dto.CarDefaultDto;
import autoever2.cartag.cars.dto.CarDto;
import autoever2.cartag.cars.dto.CarTypeDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
@RequestMapping("api/cars")
@RequiredArgsConstructor
@Tag(name = "차량 관련 API", description = "차종 및 차량 트림, 차량의 기본 정보를 제공합니다.")
public class CarController {

    private final CarService service;

    @Operation(summary = "차종 리스트를 조회하는 API", description = "팰리세이드, 베뉴 등 차종 리스트 및 이미지를 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = CarTypeDto.class)))
    @GetMapping("/list")
    public List<CarTypeDto> getCarTypeList() {
        return service.getAllCarTypes();
    }

    @Operation(summary = "차종에 속한 모든 트림을 조회하는 API", description = "차종 ID를 통해 르블랑, 익스클루시브 등 차종에 속한 모든 트림을 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = CarDto.class)))
    @GetMapping("/types")
    public List<CarDto> carTrimInfo(@Parameter(description = "차종 ID") @RequestParam("cartype") int carType) {
        return service.findCarByCarType(carType);
    }

    @Operation(summary = "트림의 기본 정보를 조회하는 API", description = "트림의 기본 옵션, 기본 모델타입을 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = CarDefaultDto.class)))
    @GetMapping("/infos/defaults")
    public CarDefaultDto carDefaultDto(@Parameter(description = "트림 ID") @RequestParam("carid") int carId) {
        return service.findCarDefaultDtoByCarId(carId);
    }
}
