package autoever2.cartag.repository;

import autoever2.cartag.domain.model.ModelTypeMappedDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.sql.DataSource;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ActiveProfiles("test")
@JdbcTest
@Sql({"classpath:insert/insert-model-h2.sql"})
class ModelRepositoryTest {

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
        ModelTypeMappedDto firstModel = ModelTypeMappedDto.builder()
                .modelId(1)
                .modelName("디젤 2.2")
                .modelTypeName("파워트레인")
                .isDefaultOption(true)
                .modelBoughtCount(800L)
                .modelPrice(1480000L)
                .build();

        ModelTypeMappedDto sixthModel = ModelTypeMappedDto.builder()
                .modelId(6)
                .modelName("8인승")
                .modelTypeName("바디타입")
                .isDefaultOption(false)
                .modelBoughtCount(1800L)
                .modelPrice(0L)
                .build();

        //when
        List<ModelTypeMappedDto> modelList = modelRepository.findAllModelTypeData(carId);

        //then
        assertEquals(6, modelList.size());
        assertTrue(modelList.contains(firstModel));
        assertTrue(modelList.contains(sixthModel));
    }
}