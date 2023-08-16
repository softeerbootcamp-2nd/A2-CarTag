package autoever2.cartag.repository;

import autoever2.cartag.domain.model.ModelDetailMappedDto;
import autoever2.cartag.domain.model.ModelEfficiencyDataDto;
import autoever2.cartag.domain.model.ModelShortMappedDto;
import autoever2.cartag.domain.model.PowerTrainMappedDto;
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

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@JdbcTest
@Sql({"classpath:insert/insert-model-h2.sql"})
@ExtendWith(SoftAssertionsExtension.class)
class ModelRepositoryTest {

    @InjectSoftAssertions
    SoftAssertions softAssertions;

    private final ModelRepository modelRepository;

    @Autowired
    public ModelRepositoryTest(DataSource dataSource) {
        modelRepository = new ModelRepository(dataSource);
    }

    @Test
    @DisplayName("모델 타입의 리스트를 가져온다")
    void findAllModelTypeData() {
        //given
        int carId = 1;
        ModelShortMappedDto firstModel = ModelShortMappedDto.builder()
                .modelId(1)
                .modelName("디젤2.2")
                .modelTypeId(1)
                .modelTypeName("파워트레인")
                .isDefaultModel(true)
                .modelBoughtCount(800L)
                .modelPrice(1480000L)
                .maxPs("202/3800")
                .maxKgfm("45.0/1750~2750")
                .build();

        ModelShortMappedDto sixthModel = ModelShortMappedDto.builder()
                .modelId(6)
                .modelName("8인승")
                .modelTypeId(3)
                .modelTypeName("바디타입")
                .isDefaultModel(false)
                .modelBoughtCount(1800L)
                .modelPrice(0L)
                .build();

        //when
        List<ModelShortMappedDto> modelList = modelRepository.findAllModelTypeData(carId);

        //then
        assertEquals(6, modelList.size());
        assertTrue(modelList.contains(firstModel));
        assertTrue(modelList.contains(sixthModel));
    }

    @Test
    @DisplayName("모델의 상세 데이터를 가져온다.")
    void findModelDetail() {
        //given
        int modelId1 = 1;
        ModelDetailMappedDto model1 = ModelDetailMappedDto.builder()
                .modelTypeName("파워트레인")
                .modelName("디젤2.2")
                .optionDescription("높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다")
                .modelImage("/model/diesel2-2.jpg")
                .build();

        int modelId2 = 4;
        ModelDetailMappedDto model2 = ModelDetailMappedDto.builder()
                .modelTypeName("구동방식")
                .modelName("4WD")
                .optionDescription("전자식 상시 4륜 구동 시스템 입니다.\n도로의 상황이나 주행 환경에 맞춰 전후륜 구동력을 자동배분하여 주행 안전성을 높여줍니다")
                .modelImage("/model/4wd.png")
                .build();

        //when
        Optional<ModelDetailMappedDto> result1 = modelRepository.findModelDetailData(modelId1);
        Optional<ModelDetailMappedDto> result2 = modelRepository.findModelDetailData(modelId2);

        //then
        assertTrue(result1.isPresent());
        assertEquals(model1, result1.get());
        assertTrue(result2.isPresent());
        assertEquals(model2, result2.get());
    }

    @Test
    @DisplayName("파워트레인과 구동방식이 조합된 HMG 데이터를 가져온다.")
    void getPowerTrainOperationEfficiency() {
        int powerTrainId1 = 1;
        int powerTrainId2 = 2;
        int operationId1 = 3;
        int operationId2 = 4;

        Optional<ModelEfficiencyDataDto> data1 = modelRepository.findEfficiencyData(powerTrainId1, operationId1);
        Optional<ModelEfficiencyDataDto> data2 = modelRepository.findEfficiencyData(powerTrainId1, operationId2);
        Optional<ModelEfficiencyDataDto> data3 = modelRepository.findEfficiencyData(powerTrainId2, operationId1);
        Optional<ModelEfficiencyDataDto> data4 = modelRepository.findEfficiencyData(powerTrainId2, operationId2);

        assertTrue(data1.isPresent());
        assertTrue(data2.isPresent());
        assertTrue(data3.isPresent());
        assertTrue(data4.isPresent());
        softAssertions.assertThat(data1.get().getAverageFuel()).isEqualTo("12.16km/s");
        softAssertions.assertThat(data2.get().getDisplacement()).isEqualTo("2,199cc");
        softAssertions.assertThat(data3.get().getAverageFuel()).isEqualTo("9.23km/s");
        softAssertions.assertThat(data4.get().getDisplacement()).isEqualTo("3,778cc");

    }
}