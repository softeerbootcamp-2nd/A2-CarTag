package autoever2.cartag.controller;

import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.domain.car.CarTypeDto;
import autoever2.cartag.domain.car.TrimDefaultOptionDto;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import autoever2.cartag.domain.share.QuoteIdList;
import autoever2.cartag.domain.share.QuoteInfoDto;
import autoever2.cartag.service.CarService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.awt.image.AreaAveragingScaleFilter;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CarController.class)
class CarControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    private CarService service;

    private List<CarDto> carDtoList;
    private List<TrimDefaultOptionDto> defaultOptions;
    private List<QuoteSubOptionDto> quoteSubOptionDtoList;
    private QuoteInfoDto quoteInfoDto;

    @BeforeEach
    void setup() {
        carDtoList = new ArrayList<>();
        defaultOptions = new ArrayList<>();

        defaultOptions.add(TrimDefaultOptionDto
                .builder()
                .optionName("안전 하차 보조")
                .optionImage("image_1")
                .optionDescription("좋은 보조 장치")
                .OptionUsedCount(42)
                .build());
        defaultOptions.add(TrimDefaultOptionDto
                .builder()
                .optionName("후측방 충둘 경고")
                .optionImage("image_2")
                .optionDescription("좋은 보조 장치")
                .OptionUsedCount(98)
                .build());
        defaultOptions.add(TrimDefaultOptionDto
                .builder()
                .optionName("후방 교차 충돌 보조 장치")
                .optionImage("image_3")
                .optionDescription("좋은 보조 장치")
                .OptionUsedCount(41)
                .build());

        carDtoList.add(CarDto
                .builder()
                .trim("Le Blanc")
                .carDefaultPrice(400000003)
                .outerImage("image_1")
                .innerImage("image_2")
                .wheelImage("image_3")
                .options(defaultOptions)
                .build()
        );

        carDtoList.add(CarDto
                .builder()
                .trim("Exclusive")
                .carDefaultPrice(400000003)
                .outerImage("image_1")
                .innerImage("image_2")
                .wheelImage("image_3")
                .options(defaultOptions)
                .build()
        );

        carDtoList.add(CarDto
                .builder()
                .trim("Prestige")
                .carDefaultPrice(400000003)
                .outerImage("image_1")
                .innerImage("image_2")
                .wheelImage("image_3")
                .options(defaultOptions)
                .build()
        );

        carDtoList.add(CarDto
                .builder()
                .trim("Calligraphy")
                .carDefaultPrice(400000003)
                .outerImage("image_1")
                .innerImage("image_2")
                .options(defaultOptions)
                .build()
        );

        quoteSubOptionDtoList = new ArrayList<>();

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

        quoteInfoDto = QuoteInfoDto
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

    }

    @Test
    @DisplayName("트림 리스트 호출 API")
    void getTrimList() throws Exception {
        //given
        int carType = 1;
        given(service.findCarByCarType(carType)).willReturn(carDtoList);

        //when
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/cars/types").param("cartype", String.valueOf(carType)));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].trim").value("Le Blanc"))
                .andExpect(jsonPath("$[1].carDefaultPrice").value(400000003))
                .andExpect(jsonPath("$[2].outerImage").value("image_1"))
                .andExpect(jsonPath("$[3].wheelImage").isEmpty());

    }

    @Test
    @DisplayName("차종 리스트 호출 API")
    void getCarTypeList() throws Exception {
        List<CarTypeDto> carTypeList = new ArrayList<>();
        carTypeList.add(CarTypeDto.builder()
                .carTypeId(1)
                .carTypeName("펠리세이드")
                .carTypeImage("image_1")
                .build());
        carTypeList.add(CarTypeDto.builder()
                .carTypeId(2)
                .carTypeImage("/cartype/santafe.png")
                .carTypeName("싼타페")
                .build());
        carTypeList.add(CarTypeDto.builder()
                .carTypeId(3)
                .carTypeImage("/cartype/the-all-new-kona-hybrid.png")
                .carTypeName("디 올 뉴 코나 Hybrid")
                .build());
        given(service.getAllCarTypes()).willReturn(carTypeList);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/cars/list"));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].carTypeId").value(1))
                .andExpect(jsonPath("$[1].carTypeImage").value("/cartype/santafe.png"))
                .andExpect(jsonPath("$[2].carTypeName").value("디 올 뉴 코나 Hybrid"));
    }

    @Test
    @DisplayName("id에 따른 공유 데이터 반환")
    void getShareInfo() throws Exception {
        ArrayList<Integer> optionIds = new ArrayList<>();
        optionIds.add(69);
        optionIds.add(70);
        optionIds.add(71);
        QuoteIdList quoteIdList = QuoteIdList
                .builder()
                .carId(1)
                .powerTrainId(1)
                .operationId(3)
                .bodyTypeId(5)
                .innerColorId(1)
                .outerColorId(4)
                .optionIdList(optionIds)
                .build();

        given(service.findShareInfoDto(quoteIdList)).willReturn(quoteInfoDto);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/cars/infos/shares")
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
}