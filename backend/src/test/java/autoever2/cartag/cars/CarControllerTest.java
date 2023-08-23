package autoever2.cartag.cars;

import autoever2.cartag.cars.dto.CarVo;
import autoever2.cartag.cars.dto.CarTypeDto;
import autoever2.cartag.domain.option.TrimDefaultOptionDto;
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

@DisplayName("UnitTest: CarController")
@WebMvcTest(CarController.class)
class CarControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private CarService service;

    @Test
    @DisplayName("트림 리스트 조회 API")
    void getTrimList() throws Exception {
        //given
        int carType = 1;
        List<TrimDefaultOptionDto> trimDefaultOptionDtoList = new ArrayList<>();
        trimDefaultOptionDtoList.add(TrimDefaultOptionDto.builder()
                .optionName("안전 하차 보조").optionImage("image_1").optionDescription("좋은 보조 장치").OptionUsedCount(42).build());
        trimDefaultOptionDtoList.add(TrimDefaultOptionDto.builder()
                .optionName("후측방 충둘 경고").optionImage("image_2").optionDescription("좋은 보조 장치").OptionUsedCount(98).build());
        trimDefaultOptionDtoList.add(TrimDefaultOptionDto.builder()
                .optionName("후방 교차 충돌 보조 장치").optionImage("image_3").optionDescription("좋은 보조 장치").OptionUsedCount(41).build());

        CarVo expected1 = CarVo.builder()
                .carId(1).trim("Le Blanc").carDefaultPrice(123423).outerImage("image_1").innerImage("image_2").wheelImage("image_3").carDescription("Good").options(trimDefaultOptionDtoList).build();
        CarVo expected2 = CarVo.builder()
                .carId(2).trim("Exclusive").carDefaultPrice(123423).outerImage("image_a").innerImage("image_2").carDescription("Good").options(trimDefaultOptionDtoList).build();

        given(service.getCarDtoByCarType(carType)).willReturn(List.of(expected1, expected2));

        //when
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/cars/types")
                .param("cartype", String.valueOf(carType)));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].trim").value("Le Blanc"))
                .andExpect(jsonPath("$[0].carId").value(1))
                .andExpect(jsonPath("$[0].carDefaultPrice").value(123423))
                .andExpect(jsonPath("$[0].carDescription").value("Good"))
                .andExpect(jsonPath("$[1].outerImage").value("image_a"))
                .andExpect(jsonPath("$[1].innerImage").value("image_2"))
                .andExpect(jsonPath("$[1].wheelImage").isEmpty())
                .andExpect(jsonPath("$[1].options[0].optionName").value("안전 하차 보조"))
                .andExpect(jsonPath("$[1].options[1].optionImage").value("image_2"))
                .andExpect(jsonPath("$[1].options[0].optionName").value("안전 하차 보조"));

    }

    @Test
    @DisplayName("차종 리스트 조회 API")
    void getCarTypeList() throws Exception {
        List<CarTypeDto> carTypeList = new ArrayList<>();
        carTypeList.add(CarTypeDto.builder().carTypeId(1).carTypeName("펠리세이드").carTypeImage("image_1").build());
        carTypeList.add(CarTypeDto.builder().carTypeId(2).carTypeImage("/cartype/santafe.png").carTypeName("싼타페").build());
        carTypeList.add(CarTypeDto.builder().carTypeId(3).carTypeImage("/cartype/the-all-new-kona-hybrid.png").carTypeName("디 올 뉴 코나 Hybrid").build());

        given(service.getAllCarTypes()).willReturn(carTypeList);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/cars/list"));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].carTypeId").value(1))
                .andExpect(jsonPath("$[1].carTypeImage").value("/cartype/santafe.png"))
                .andExpect(jsonPath("$[2].carTypeName").value("디 올 뉴 코나 Hybrid"));
    }
}