package autoever2.cartag.models;

import autoever2.cartag.models.dto.ModelDetailMappedDto;
import autoever2.cartag.models.dto.ModelEfficiencyDataDto;
import autoever2.cartag.models.dto.ModelShortDataDto;
import autoever2.cartag.models.dto.PowerTrainDataDto;
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
@DisplayName("UnitTest: ModelController")
class ModelControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private ModelService modelService;

    @Test
    @DisplayName("트림의 모델타입 리스트 조회 API")
    void getTrimModel() throws Exception {
        List<ModelShortDataDto> modelTypeData = new ArrayList<>();

        PowerTrainDataDto expectedHmg1 = PowerTrainDataDto.builder().maxPs("202/3800").maxKgfm("45.0/1750~2750").ratioPs(1.0).ratioKgfm(1.0).build();
        modelTypeData.add(ModelShortDataDto.builder()
                .modelId(1).modelName("디젤 2.2").modelPrice(1480000L).modelTypeName("파워트레인").percentage(40).modelImage("/model/diesel2-2.jpg").hmgData(expectedHmg1).build());

        PowerTrainDataDto expectedHmg2 = PowerTrainDataDto.builder()
                .maxPs("295/6000").maxKgfm("36.2/5200").ratioPs(0.9249174917491748).ratioKgfm(0.34807692307692306).build();
        modelTypeData.add(ModelShortDataDto.builder()
                .modelId(2).modelName("가솔린 3.8").modelPrice(280000L).modelTypeName("파워트레인").percentage(60).modelImage("/model/gasoline3-8.jpg").hmgData(expectedHmg2).build());

        modelTypeData.add(ModelShortDataDto.builder()
                .modelId(3).modelName("2WD").modelPrice(0L).modelTypeName("구동방식").percentage(25).modelImage("/model/2wd.png").build());
        modelTypeData.add(ModelShortDataDto.builder()
                .modelId(4).modelName("4WD").modelPrice(237000L).modelTypeName("구동방식").percentage(75).modelImage("/model/4wd.png").build());
        modelTypeData.add(ModelShortDataDto.builder()
                .modelId(5).modelName("7인승").modelPrice(0L).modelTypeName("바디타입").percentage(50).modelImage("/model/7seats.jpg").build());
        modelTypeData.add(ModelShortDataDto.builder()
                .modelId(6).modelName("8인승").modelPrice(0L).modelTypeName("바디타입").percentage(50).modelImage("/model/8seats.jpg").build());

        int carId = 1;
        given(modelService.getModelTypeData(carId)).willReturn(modelTypeData);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/modeltypes/list")
                .param("carid", String.valueOf(carId)));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].modelId").value(1))
                .andExpect(jsonPath("$[1].modelName").value("가솔린 3.8"))
                .andExpect(jsonPath("$[2].modelImage").value("/model/2wd.png"))
                .andExpect(jsonPath("$[3].modelPrice").value(237000))
                .andExpect(jsonPath("$[4].percentage").value(50))
                .andExpect(jsonPath("$[5].modelTypeName").value("바디타입"));
    }

    @Test
    @DisplayName("모델의 상세 데이터 조회 API")
    void getModelDetail() throws Exception {
        int modelId = 1;

        ModelDetailMappedDto model = ModelDetailMappedDto.builder()
                .modelTypeName("파워트레인").modelName("디젤2.2").optionDescription("높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다").modelImage("/model/diesel2-2.jpg").build();


        given(modelService.getModelDetail(modelId)).willReturn(model);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/modeltypes/detail")
                .param("modelid", String.valueOf(modelId)));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.modelName").value("디젤2.2"))
                .andExpect(jsonPath("$.optionDescription").value("높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다"))
                .andExpect(jsonPath("$.modelTypeName").value("파워트레인"))
                .andExpect(jsonPath("$.modelImage").value("/model/diesel2-2.jpg"));
    }

    @Test
    @DisplayName("효율 HMG 데이터 조회 API")
    void getEfficiencyData() throws Exception {
        int powerTrainId = 1;
        int operationId = 3;

        ModelEfficiencyDataDto data = ModelEfficiencyDataDto.builder().averageFuel("12.16km/s").displacement("2,199cc").build();

        given(modelService.getEfficiencyData(powerTrainId, operationId)).willReturn(data);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/modeltypes/hmg-efficiency")
                .param("powertrain", String.valueOf(powerTrainId)).param("operation", String.valueOf(operationId)));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.averageFuel").value("12.16km/s"))
                .andExpect(jsonPath("$.displacement").value("2,199cc"));
    }
}