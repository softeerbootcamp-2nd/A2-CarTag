package autoever2.cartag.models;

import autoever2.cartag.models.dto.ModelDetailMappedDto;
import autoever2.cartag.models.dto.ModelEfficiencyDataDto;
import autoever2.cartag.models.dto.ModelShortDataDto;
import autoever2.cartag.models.dto.PowerTrainDataDto;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@Sql({"classpath:insert/insert-model-h2.sql"})
@DisplayName("Integration: Model")
@ExtendWith(SoftAssertionsExtension.class)
public class ModelTest {

    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    @Autowired
    ModelController modelController;

    @Test
    @DisplayName("/api/modeltypes/list?carid=1 통합테스트")
    void getModelList() {
        int carId = 1;

        List<ModelShortDataDto> expected = new ArrayList<>();

        PowerTrainDataDto expectedHmg1 = PowerTrainDataDto.builder().maxPs("202/3800").maxKgfm("45.0/1750~2750").ratioPs(1.0).ratioKgfm(1.0).build();
        expected.add(ModelShortDataDto.builder()
                .modelId(1).modelName("디젤2.2").modelPrice(1480000L).modelTypeName("파워트레인").percentage(40).modelImage("/model/diesel2-2.jpg").hmgData(expectedHmg1).build());

        PowerTrainDataDto expectedHmg2 = PowerTrainDataDto.builder()
                .maxPs("295/6000").maxKgfm("36.2/5200").ratioPs(0.9249174917491748).ratioKgfm(0.34807692307692306).build();
        expected.add(ModelShortDataDto.builder()
                .modelId(2).modelName("가솔린3.8").modelPrice(0L).modelTypeName("파워트레인").percentage(60).modelImage("/model/gasoline3-8.jpg").hmgData(expectedHmg2).build());

        expected.add(ModelShortDataDto.builder()
                .modelId(3).modelName("2WD").modelPrice(0L).modelTypeName("구동방식").percentage(25).modelImage("/model/2wd.png").build());
        expected.add(ModelShortDataDto.builder()
                .modelId(4).modelName("4WD").modelPrice(2370000L).modelTypeName("구동방식").percentage(75).modelImage("/model/4wd.png").build());
        expected.add(ModelShortDataDto.builder()
                .modelId(5).modelName("7인승").modelPrice(0L).modelTypeName("바디타입").percentage(50).modelImage("/model/7seats.jpg").build());
        expected.add(ModelShortDataDto.builder()
                .modelId(6).modelName("8인승").modelPrice(0L).modelTypeName("바디타입").percentage(50).modelImage("/model/8seats.jpg").build());

        softAssertions.assertThat(modelController.getModelList(carId)).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("/api/modeltypes/detail?modelid=1 통합테스트")
    void getModelDescriptionAndImage() {
        ModelDetailMappedDto expected = ModelDetailMappedDto.builder()
                .modelTypeName("파워트레인").modelName("디젤2.2").optionDescription("높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다").modelImage("/model/diesel2-2.jpg").build();

        softAssertions.assertThat(modelController.getModelDetail(1)).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("/api/modeltypes/hmg-efficiency?powertrain=1&operation=3 통합테스트")
    void getHmgData() {
        int powerTrainId =1;
        int operationId = 3;
        ModelEfficiencyDataDto expected = ModelEfficiencyDataDto.builder().averageFuel("12.16km/s").displacement("2,199cc").build();
        softAssertions.assertThat(modelController.getEfficiencyHmgData(powerTrainId, operationId)).usingRecursiveComparison().isEqualTo(expected);
    }
}
