package autoever2.cartag.controller;

import autoever2.cartag.domain.model.ModelShortDataDto;
import autoever2.cartag.service.ModelService;
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

@WebMvcTest(ModelController.class)
class ModelControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private ModelService modelService;

    private List<ModelShortDataDto> trimModelList;

    @BeforeEach
    void setUp() {

        trimModelList = new ArrayList<>();
        //디젤 2.2 데이터
        trimModelList.add(ModelShortDataDto.builder()
                .modelId(1)
                .modelName("디젤 2.2")
                .modelPrice(0L)
                .isDefaultOption(true)
                .modelTypeName("파워트레인")
                .percentage(65)
                .build());

        //가솔린 3.8 데이터
        trimModelList.add(ModelShortDataDto.builder()
                .modelId(2)
                .modelName("가솔린 3.8")
                .modelPrice(280000L)
                .isDefaultOption(false)
                .modelTypeName("파워트레인")
                .percentage(35)
                .build());

        //7인승 데이터
        trimModelList.add(ModelShortDataDto.builder()
                .modelId(3)
                .modelName("7인승")
                .modelPrice(0L)
                .isDefaultOption(true)
                .modelTypeName("바디타입")
                .percentage(70)
                .build());

        //8인승 데이터
        trimModelList.add(ModelShortDataDto.builder()
                .modelId(4)
                .modelName("8인승")
                .modelPrice(130000L)
                .isDefaultOption(false)
                .modelTypeName("바디타입")
                .percentage(30)
                .build());

        //2WD 데이터
        trimModelList.add(ModelShortDataDto.builder()
                .modelId(5)
                .modelName("2WD")
                .modelPrice(0L)
                .isDefaultOption(true)
                .modelTypeName("구동방식")
                .percentage(50)
                .build());

        //4WD 데이터
        trimModelList.add(ModelShortDataDto.builder()
                .modelId(6)
                .modelName("4WD")
                .modelPrice(237000L)
                .isDefaultOption(false)
                .modelTypeName("구동방식")
                .percentage(50)
                .build());
    }

    @Test
    @DisplayName("트림의 모델 타입 데이터 호출 API")
    void getTrimModel() throws Exception {
        //given
        int carId = 1;
        given(modelService.getModelTypeData(carId)).willReturn(trimModelList);

        //when
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/modeltypes/list").param("carid", String.valueOf(carId)));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].modelId").value(1))
                .andExpect(jsonPath("$[1].modelName").value("가솔린 3.8"))
                .andExpect(jsonPath("$[2].defaultOption").value(true))
                .andExpect(jsonPath("$[3].modelPrice").value(130000))
                .andExpect(jsonPath("$[4].percentage").value(50))
                .andExpect(jsonPath("$[5].modelTypeName").value("구동방식"));
    }
}