package autoever2.cartag.quotes;

import autoever2.cartag.options.dto.QuoteSubOptionDto;
import autoever2.cartag.quotes.dtos.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quote")
@RequiredArgsConstructor
@Tag(name = "견적 정보 관련 API", description = "견적 완료 페이지에 필요한 데이터와 판매 견적 금액의 분포, 유사견적과 관련된 데이터를 제공합니다.")
public class QuoteController {

    private final QuoteService quoteService;

    @Operation(summary = "추천 견적 그래프 데이터를 제공하는 API", description = "현재 내 견적과 비교하여 유사한 견적(최대 4개)의 ID와 판매량을 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = HistoryShortDto.class)))
    @PostMapping("/list")
//    @Cacheable(value = "recommendList")
    public HistoryShortDto getRecommendedList(@RequestBody QuoteRequestDto quoteRequestDto) {
        HistoryShortDto myQuote = quoteService.getMyQuoteShortData(quoteRequestDto);
        List<HistoryShortDto> subList = quoteService.getSuggestedQuoteShortData(quoteRequestDto);

        myQuote.setHistories(subList);

        return myQuote;
    }

    @Operation(summary = "실제 판매데이터의 금액 분포를 제공하는 API", description = "각 금액 별 판매금액과 판매량을 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = BoughtCarDto.class)))
    @GetMapping("bought/infos")
    @Cacheable(value = "boughtList")
    public List<BoughtCarDto> getAllHistorySum(@RequestParam("carid") int carId) {
        return quoteService.getPriceDistribution(carId);
    }

    @Operation(summary = "내 견적의 상세 데이터를 제공하는 API", description = "견적의 각 요소 ID를 제공했을 때 해당 요소의 상세 데이터를 반환하는 API입니다.")
    @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = QuoteInfoDto.class)))
    @PostMapping("/infos/shares")
    public QuoteInfoDto getQuoteDetail(@Parameter(description = "선택한 id 리스트") @RequestBody QuoteRequestDto quoteRequestDto) {
        return quoteService.getAllCarInfoByQuoteDataDto(quoteRequestDto);
    }

    @Operation(summary = "유사견적 상세 데이터 제공 API", description = "유사 견적 ID 제공 시 상세 데이터 제공")
    @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = HistoryShortDto.class)))
    @PostMapping("/histories/detail")
    public List<List<QuoteSubOptionDto>> getRecommendedOptions(@RequestBody QuoteOptionRequestDto quoteOptionRequestDto) {
        Long myQuoteId = quoteOptionRequestDto.getQuoteId();

        List<List<QuoteSubOptionDto>> result = quoteOptionRequestDto.getHistoryIds().stream().map(historyId -> quoteService.getOptionDifference(myQuoteId, historyId)).collect(Collectors.toList());
        return result;
    }
}
