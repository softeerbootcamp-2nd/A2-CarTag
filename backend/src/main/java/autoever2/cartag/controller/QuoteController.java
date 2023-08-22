package autoever2.cartag.controller;

import autoever2.cartag.cars.dto.BoughtCarDto;
import autoever2.cartag.domain.quote.HistoryShortDto;
import autoever2.cartag.domain.quote.QuoteDataDto;
import autoever2.cartag.domain.quote.QuoteInfoDto;
import autoever2.cartag.cars.CarService;
import autoever2.cartag.service.QuoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quote")
@RequiredArgsConstructor
public class QuoteController {

    private final CarService carService;
    private final QuoteService quoteService;

    @Operation(summary = "추천 견적 그래프 제공 API", description = "유사견적(최대 4개)와 판매횟수 제공")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = HistoryShortDto.class)))
    })
    @PostMapping("/list")
    public HistoryShortDto getRecommendedList(@RequestBody QuoteDataDto quoteDataDto) {
        HistoryShortDto myQuote = quoteService.findMyQuote(quoteDataDto);
        List<HistoryShortDto> subList = quoteService.findTopHistory(quoteDataDto);

        myQuote.setHistories(subList);

        return myQuote;
    }

    @Operation(summary = "차량 구매 정보 반환 api", description = "차량 구매 정보 조회 method")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = BoughtCarDto.class))),
    })
    @GetMapping("bought/infos")
    public List<BoughtCarDto> getAllHistorySum() {
        return carService.findAllBoughInfos();
    }

    @Operation(summary = "차량 공유하기를 위한 api", description = "차량 공유를 위한 정보 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = QuoteInfoDto.class))),
    })
    @PostMapping("/infos/shares")
    public QuoteInfoDto getQuoteDetail(@Parameter(description = "선택한 id 리스트") @RequestBody QuoteDataDto idList) {
        QuoteInfoDto data = carService.findShareInfoDto(idList);
        return data;
    }
}
