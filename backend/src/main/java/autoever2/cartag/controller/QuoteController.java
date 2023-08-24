package autoever2.cartag.controller;

import autoever2.cartag.domain.quote.*;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import autoever2.cartag.service.QuoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quote")
@RequiredArgsConstructor
public class QuoteController {

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
    @Cacheable(value = "boughtList")
    public List<BoughtCarDto> getAllHistorySum(@RequestParam("carid") int carId) {
        return quoteService.findAllBoughtInfos(carId);
    }

    @Operation(summary = "차량 공유하기를 위한 api", description = "차량 공유를 위한 정보 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = QuoteInfoDto.class))),
    })
    @PostMapping("/infos/shares")
    public QuoteInfoDto getQuoteDetail(@Parameter(description = "선택한 id 리스트") @RequestBody QuoteDataDto idList) {
        QuoteInfoDto data = quoteService.getAllCarInfoByQuoteDataDto(idList);
        return data;
    }

    @Operation(summary = "유사견적 상세 데이터 제공 API", description = "유사 견적 ID 제공 시 상세 데이터 제공")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = HistoryShortDto.class)))
    })
    @PostMapping("/histories/detail")
    public List<List<QuoteSubOptionDto>> getRecommendedOptions(@RequestBody HistoryRequestDto historyRequestDto) {
        List<Integer> myOptionIds = quoteService.getHistoryById(historyRequestDto.getQuoteId());

        return historyRequestDto.getHistoryIds().stream().map(historyId -> quoteService.getOptionDifference(myOptionIds, historyId)).collect(Collectors.toList());
    }
}
