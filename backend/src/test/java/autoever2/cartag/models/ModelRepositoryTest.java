package autoever2.cartag.models;

import autoever2.cartag.models.dto.ModelDefaultDto;
import autoever2.cartag.models.dto.ModelDetailMappedDto;
import autoever2.cartag.models.dto.ModelEfficiencyDataDto;
import autoever2.cartag.models.dto.ModelShortMappedDto;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

@ActiveProfiles("test")
@JdbcTest
@Sql({"classpath:insert/insert-model-h2.sql"})
@ExtendWith(SoftAssertionsExtension.class)
@DisplayName("UnitTest: ModelRepository")
class ModelRepositoryTest {

    @InjectSoftAssertions
    SoftAssertions softAssertions;

    private final ModelRepository modelRepository;

    @Autowired
    public ModelRepositoryTest(DataSource dataSource) {
        modelRepository = new ModelRepository(dataSource);
    }

    @Test
    @DisplayName("모델타입의 리스트 반환")
    void findAllModelTypeData() {
        int carId = 1;
        ModelShortMappedDto firstModel = ModelShortMappedDto.builder()
                .modelId(1).modelName("디젤2.2").modelTypeId(1).modelTypeName("파워트레인").modelBoughtCount(800L).modelPrice(1480000L).maxPs("202/3800").maxKgfm("45.0/1750~2750").modelImage("/model/diesel2-2.jpg").build();

        ModelShortMappedDto sixthModel = ModelShortMappedDto.builder()
                .modelId(6).modelName("8인승").modelTypeId(3).modelTypeName("바디타입").modelBoughtCount(1000L).modelPrice(0L).modelImage("/model/8seats.jpg").build();

        List<ModelShortMappedDto> modelList = modelRepository.findAllModelTypeDataByCarId(carId);

        softAssertions.assertThat(modelList.size()).isEqualTo(6);
        softAssertions.assertThat(modelList.get(0)).usingRecursiveComparison().isEqualTo(firstModel);
        softAssertions.assertThat(modelList.get(5)).usingRecursiveComparison().isEqualTo(sixthModel);
    }

    @Test
    @DisplayName("특정 모델의 상세 데이터 반환")
    void findModelDetail() {
        int modelId1 = 1;
        ModelDetailMappedDto model1 = ModelDetailMappedDto.builder()
                .modelTypeName("파워트레인").modelName("디젤2.2").optionDescription("높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다").modelImage("/model/diesel2-2.jpg").build();

        int modelId2 = 4;
        ModelDetailMappedDto model2 = ModelDetailMappedDto.builder()
                .modelTypeName("구동방식").modelName("4WD").optionDescription("전자식 상시 4륜 구동 시스템 입니다.\n도로의 상황이나 주행 환경에 맞춰 전후륜 구동력을 자동배분하여 주행 안전성을 높여줍니다").modelImage("/model/4wd.png").build();

        int invalidId = 10;
        Optional<ModelDetailMappedDto> result1 = modelRepository.findModelDetailDataMyModelId(modelId1);
        Optional<ModelDetailMappedDto> result2 = modelRepository.findModelDetailDataMyModelId(modelId2);

        softAssertions.assertThat(result1).isPresent();
        softAssertions.assertThat(result2).isPresent();
        softAssertions.assertThat(modelRepository.findModelDetailDataMyModelId(invalidId)).isEmpty();

        softAssertions.assertThat(result1.get()).usingRecursiveComparison().isEqualTo(model1);
        softAssertions.assertThat(result2.get()).usingRecursiveComparison().isEqualTo(model2);
    }

    @Test
    @DisplayName("효율 HMG 데이터 반환")
    void getPowerTrainOperationEfficiency() {
        int powerTrainId1 = 1;
        int powerTrainId2 = 2;
        int operationId1 = 3;
        int operationId2 = 4;

        int invalidOperationId = 10;

        Optional<ModelEfficiencyDataDto> data1 = modelRepository.findEfficiencyData(powerTrainId1, operationId1);
        Optional<ModelEfficiencyDataDto> data2 = modelRepository.findEfficiencyData(powerTrainId1, operationId2);
        Optional<ModelEfficiencyDataDto> data3 = modelRepository.findEfficiencyData(powerTrainId2, operationId1);
        Optional<ModelEfficiencyDataDto> data4 = modelRepository.findEfficiencyData(powerTrainId2, operationId2);

        softAssertions.assertThat(data1).isPresent();
        softAssertions.assertThat(data2).isPresent();
        softAssertions.assertThat(data3).isPresent();
        softAssertions.assertThat(data4).isPresent();
        softAssertions.assertThat(data1.get().getAverageFuel()).isEqualTo("12.16km/s");
        softAssertions.assertThat(data2.get().getDisplacement()).isEqualTo("2,199cc");
        softAssertions.assertThat(data3.get().getAverageFuel()).isEqualTo("9.23km/s");
        softAssertions.assertThat(data4.get().getDisplacement()).isEqualTo("3,778cc");
        softAssertions.assertThat(modelRepository.findEfficiencyData(powerTrainId1, invalidOperationId)).isEmpty();
    }

    @Test
    @DisplayName("트림의 기본 모델타입 리스트 반환")
    void getDefaultModelList() {
        int carId = 1;

        ModelDefaultDto expectedPowerTrain = ModelDefaultDto.builder().modelId(1).modelName("디젤2.2").modelPrice(1480000L).modelImage("/model/diesel2-2.jpg").build();
        ModelDefaultDto expectedOperation = ModelDefaultDto.builder().modelId(3).modelName("2WD").modelImage("/model/2wd.png").modelPrice(0L).build();
        ModelDefaultDto expectedBodyType = ModelDefaultDto.builder().modelId(5).modelName("7인승").modelImage("/model/7seats.jpg").modelPrice(0L).build();


        List<ModelDefaultDto> result = modelRepository.findDefaultModelListByCarId(carId);

        softAssertions.assertThat(result.size()).isEqualTo(3);
        softAssertions.assertThat(result.get(0)).usingRecursiveComparison().isEqualTo(expectedPowerTrain);
        softAssertions.assertThat(result.get(1)).usingRecursiveComparison().isEqualTo(expectedOperation);
        softAssertions.assertThat(result.get(2)).usingRecursiveComparison().isEqualTo(expectedBodyType);
    }

    @Test
    @DisplayName("제공된 모델 ID에 해당하는 모델 데이터 반환")
    void getModelInfo() {
        int powerTrainId = 1;
        int operationId = 3;
        int bodyTypeId = 5;

        ModelDefaultDto expectedPowerTrain = ModelDefaultDto.builder()
                .modelId(1).modelName("디젤2.2").modelPrice(1480000L).modelImage("/model/diesel2-2.jpg").modelTypeName("파워트레인").build();
        ModelDefaultDto expectedOperation = ModelDefaultDto.builder()
                .modelId(3).modelName("2WD").modelImage("/model/2wd.png").modelPrice(0L).modelTypeName("구동방식").build();
        ModelDefaultDto expectedBodyType = ModelDefaultDto.builder()
                .modelId(5).modelName("7인승").modelImage("/model/7seats.jpg").modelPrice(0L).modelTypeName("바디타입").build();

        List<ModelDefaultDto> result = modelRepository.findAllModelListByModel(powerTrainId, operationId, bodyTypeId);

        softAssertions.assertThat(result.size()).isEqualTo(3);
        softAssertions.assertThat(result.get(0)).usingRecursiveComparison().isEqualTo(expectedPowerTrain);
        softAssertions.assertThat(result.get(1)).usingRecursiveComparison().isEqualTo(expectedOperation);
        softAssertions.assertThat(result.get(2)).usingRecursiveComparison().isEqualTo(expectedBodyType);
    }
}