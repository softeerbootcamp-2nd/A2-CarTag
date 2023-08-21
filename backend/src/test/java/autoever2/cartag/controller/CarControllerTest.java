package autoever2.cartag.controller;

import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.domain.car.CarTypeDto;
import autoever2.cartag.domain.car.TrimDefaultOptionDto;
import autoever2.cartag.service.CarService;
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

@WebMvcTest(CarController.class)
class CarControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    private CarService service;

    private List<CarDto> carDtoList;
    private List<TrimDefaultOptionDto> defaultOptions;
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
}