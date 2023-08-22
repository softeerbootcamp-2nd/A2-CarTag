package autoever2.cartag.controller;

import autoever2.cartag.domain.quote.HistoryShortDto;
import autoever2.cartag.domain.quote.QuoteDataDto;
import autoever2.cartag.service.CarService;
import autoever2.cartag.service.QuoteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QuoteController.class)
public class QuoteControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private QuoteService quoteService;

    @MockBean
    private CarService carService;

    @Test
    @DisplayName("유사견적 간략 데이터 제공 API 테스트")
    void getRecommendedList() throws Exception {
        //given
        QuoteDataDto quoteDataDto = QuoteDataDto.builder()
                .carId(1)
                .powerTrainId(1)
                .bodyTypeId(3)
                .operationId(5)
                .optionIdList(List.of(69))
                .build();

        List<HistoryShortDto> expected = new ArrayList<>();
        expected.add(HistoryShortDto.builder()
                .historyId(129L)
                .soldCount(155)
                .build());
        expected.add(HistoryShortDto.builder()
                .historyId(161L)
                .soldCount(140)
                .build());
        expected.add(HistoryShortDto.builder()
                .historyId(137L)
                .soldCount(162)
                .build());
        expected.add(HistoryShortDto.builder()
                .historyId(169L)
                .soldCount(140)
                .build());

        String content = objectMapper.writeValueAsString(quoteDataDto);
        given(quoteService.findTopHistory(quoteDataDto)).willReturn(expected);
        //when
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/quote/list").content(content)
                .contentType(MediaType.APPLICATION_JSON));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].historyId").value(129))
                .andExpect(jsonPath("$[1].soldCount").value(140))
                .andExpect(jsonPath("$[2].soldCount").value(162))
                .andExpect(jsonPath("$[3].historyId").value(169));
    }
}
