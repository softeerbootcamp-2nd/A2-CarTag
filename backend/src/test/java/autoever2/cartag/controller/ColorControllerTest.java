package autoever2.cartag.controller;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.service.ColorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ColorController.class)
class ColorControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private ColorService service;

    private List<OuterColorDto> outerColors;

    private List<InnerColorDto> innerColors;

    @BeforeEach
    void setUp() {

        outerColors = new ArrayList<>();
        outerColors.add(OuterColorDto.builder()
                .colorName("어비스 블랙펄")
                .colorImage("color_image_1")
                .colorPrice(100000L)
                .colorBoughtCount(212312L)
                .colorCarImage("car_image_1")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("그라 파이트 그레이")
                .colorImage("color_image_2")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_2")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("쉬머링 실버 메탈릭")
                .colorImage("color_image_3")
                .colorPrice(1234440L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_3")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("크리미 화이트 펄")
                .colorImage("color_image_4")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_4")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("퍼플 펄")
                .colorImage("color_image_5")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_5")
                .build());

        innerColors = new ArrayList<>();
        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(블랙)")
                .colorImage("color_image_1")
                .colorPrice(100000L)
                .colorBoughtCount(212312L)
                .colorCarImage("car_image_1")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(그레이)")
                .colorImage("color_image_2")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_2")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(메탈릭)")
                .colorImage("color_image_3")
                .colorPrice(1234440L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_3")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(화이트)")
                .colorImage("color_image_4")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_4")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(퍼플)")
                .colorImage("color_image_5")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_5")
                .build());
    }

    @Test
    @DisplayName("트림의 색상 타입 데이터 호출 API")
    void getTrimModel() throws Exception {
        //given
        int carId = 1;
        given(service.findOuterColorByCarId(carId)).willReturn(outerColors);
        given(service.findInnerColorByCarId(carId)).willReturn(innerColors);

        //when
        ResultActions resultActionsOuter = mockMvc.perform(MockMvcRequestBuilders.get("/api/cars/colors/outer/").param("carId", String.valueOf(carId)));
        ResultActions resultActionsInner = mockMvc.perform(MockMvcRequestBuilders.get("/api/cars/colors/inner/").param("carId", String.valueOf(carId)));

        //then
        resultActionsOuter.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].colorName").value("어비스 블랙펄"))
                .andExpect(jsonPath("$[1].colorImage").value("color_image_2"))
                .andExpect(jsonPath("$[2].colorPrice").value(1234440L))
                .andExpect(jsonPath("$[3].colorBoughtCount").value(203L))
                .andExpect(jsonPath("$[4].colorCarImage").value("car_image_5"));

        resultActionsInner.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].colorName").value("퀄팅 천연(블랙)"))
                .andExpect(jsonPath("$[1].colorImage").value("color_image_2"))
                .andExpect(jsonPath("$[2].colorPrice").value(1234440L))
                .andExpect(jsonPath("$[3].colorBoughtCount").value(203L))
                .andExpect(jsonPath("$[4].colorCarImage").value("car_image_5"));
    }

}
