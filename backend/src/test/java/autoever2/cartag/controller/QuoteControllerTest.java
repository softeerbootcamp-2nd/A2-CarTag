package autoever2.cartag.controller;

import autoever2.cartag.cars.dto.BoughtCarDto;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import autoever2.cartag.domain.quote.HistoryShortDto;
import autoever2.cartag.domain.quote.QuoteDataDto;
import autoever2.cartag.domain.quote.QuoteInfoDto;
import autoever2.cartag.cars.CarService;
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

        HistoryShortDto myQuote = HistoryShortDto.builder()
                .historyId(123L)
                .soldCount(110)
                .build();

        String content = objectMapper.writeValueAsString(quoteDataDto);
        given(quoteService.findTopHistory(quoteDataDto)).willReturn(expected);
        given(quoteService.findMyQuote(quoteDataDto)).willReturn(myQuote);
        //when
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/quote/list").content(content)
                .contentType(MediaType.APPLICATION_JSON));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.historyId").value(123L))
                .andExpect(jsonPath("$.soldCount").value(110))
                .andExpect(jsonPath("$.histories[0].historyId").value(129))
                .andExpect(jsonPath("$.histories[1].soldCount").value(140))
                .andExpect(jsonPath("$.histories[2].soldCount").value(162))
                .andExpect(jsonPath("$.histories[3].historyId").value(169));
    }

    @Test
    @DisplayName("id에 따른 공유 데이터 반환")
    void getShareInfo() throws Exception {

        List<QuoteSubOptionDto> quoteSubOptionDtoList = new ArrayList<>();

        quoteSubOptionDtoList.add(QuoteSubOptionDto
                .builder()
                .optionId(69)
                .optionPrice(123400L)
                .optionTitle("상세품목")
                .optionImage("image_1.jpg")
                .optionName("3열 열선시트")
                .build());

        quoteSubOptionDtoList.add(QuoteSubOptionDto
                .builder()
                .optionId(70)
                .optionPrice(100L)
                .optionTitle("휠")
                .optionImage("iamge_2.jpg")
                .optionName("20인치 다크 스퍼터링")
                .build());

        quoteSubOptionDtoList.add(QuoteSubOptionDto
                .builder()
                .optionId(71)
                .optionPrice(8977L)
                .optionTitle("악세사리")
                .optionImage("image_3.jpg")
                .optionName("후진가이드램프")
                .build());

        ArrayList<Integer> optionIds = new ArrayList<>();
        optionIds.add(69);
        optionIds.add(70);
        optionIds.add(71);
        QuoteDataDto quoteIdList = QuoteDataDto
                .builder()
                .carId(1)
                .powerTrainId(1)
                .operationId(3)
                .bodyTypeId(5)
                .innerColorId(1)
                .outerColorId(4)
                .optionIdList(optionIds)
                .build();

        QuoteInfoDto quoteInfoDto = QuoteInfoDto
                .builder()
                .carId(1)
                .trim("Le Blanc")
                .carDefaultPrice(40000000)
                .powerTrainId(1)
                .powerTrainTitle("파워트레인")
                .powerTrainImage("image_1.jpg")
                .powerTrainName("디젤2.2")
                .powerTrainPrice(0L)
                .bodyTypeId(5)
                .bodyTypeTitle("바디타입")
                .bodyTypeImage("image_2.jpg")
                .bodyTypeName("7인승")
                .bodyTypePrice(1500L)
                .operationTitle("구동방식")
                .operationId(3)
                .operationImage("image_3.jpg")
                .operationName("2WD")
                .operationPrice(8900L)
                .colorOuterTitle("외장색상")
                .colorOuterId(4)
                .colorOuterImage("red_1.jpg")
                .colorOuterPrice(1500L)
                .colorOuterImageName("퍼플 펄")
                .colorCarOuterImage("outer_red.jpg")
                .colorInnerTitle("내장색상")
                .colorInnerId(1)
                .colorInnerImage("blue_1.jpg")
                .colorInnerPrice(1220L)
                .colorInnerImageName("퀄팅 천연(파랑)")
                .colorCarInnerImage("inner_red.jpg")
                .optionList(quoteSubOptionDtoList)
                .build();


        given(carService.findShareInfoDto(quoteIdList)).willReturn(quoteInfoDto);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/quote/infos/shares")
                .content("{\n" +
                        "    \"carId\": 1,\n" +
                        "    \"powerTrainId\": 1,\n" +
                        "    \"bodyTypeId\": 5,\n" +
                        "    \"operationId\": 3,\n" +
                        "    \"outerColorId\": 4,\n" +
                        "    \"innerColorId\": 1,\n" +
                        "    \"optionIdList\": [69, 70, 71]\n" +
                        "}").contentType(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.carDefaultPrice").value(40000000))
                .andExpect(jsonPath("$.trim").value("Le Blanc"))
                .andExpect(jsonPath("$.powerTrainImage").value("image_1.jpg"))
                .andExpect(jsonPath("$.bodyTypeName").value("7인승"))
                .andExpect(jsonPath("$.operationTitle").value("구동방식"))
                .andExpect(jsonPath("$.colorOuterPrice").value(1500L))
                .andExpect(jsonPath("$.colorCarInnerImage").value("inner_red.jpg"))
                .andExpect(jsonPath("$.optionList.size()").value(3));
    }

    @Test
    @DisplayName("차량 구매 정보 반환 api")
    void getBoughtInfos() throws Exception {
        List<BoughtCarDto> boughtCarDtoList = new ArrayList<>();
        boughtCarDtoList.add(BoughtCarDto
                .builder()
                .totalPrice(4900000L)
                .count(1900)
                .build());
        boughtCarDtoList.add(BoughtCarDto
                .builder()
                .totalPrice(5100000L)
                .count(2200)
                .build());
        boughtCarDtoList.add(BoughtCarDto
                .builder()
                .totalPrice(6000000L)
                .count(4300)
                .build());
        boughtCarDtoList.add(BoughtCarDto
                .builder()
                .totalPrice(6700000L)
                .count(1400)
                .build());
        boughtCarDtoList.add(BoughtCarDto
                .builder()
                .totalPrice(7000000L)
                .count(1200)
                .build());

        given(carService.findAllBoughInfos()).willReturn(boughtCarDtoList);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/quote/bought/infos"));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].totalPrice").value(4900000L))
                .andExpect(jsonPath("$[1].count").value(2200))
                .andExpect(jsonPath("$[2].totalPrice").value(6000000L))
                .andExpect(jsonPath("$[3].count").value(1400));
    }
}
