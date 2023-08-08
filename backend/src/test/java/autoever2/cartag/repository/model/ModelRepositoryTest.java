package autoever2.cartag.repository.model;

import autoever2.cartag.domain.model.ModelTypeMappedDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ActiveProfiles("test")
@SpringBootTest
class ModelRepositoryTest {

    @Autowired
    private ModelRepository modelRepository;

    @Test
    void findAllModelTypeData() {
        //given
        int carId = 1;
        ModelTypeMappedDto firstModel = ModelTypeMappedDto.builder()
                .modelId(1)
                .modelName("디젤 2.2")
                .modelTypeName("파워트레인")
                .isDefaultOption(true)
                .modelBoughtCount(800L)
                .modelPrice(0L)
                .build();

        ModelTypeMappedDto fourthModel = ModelTypeMappedDto.builder()
                .modelId(4)
                .modelName("8인승")
                .modelTypeName("바디 타입")
                .isDefaultOption(false)
                .modelBoughtCount(1500L)
                .modelPrice(150000L)
                .build();

        //when
        List<ModelTypeMappedDto> modelList = modelRepository.findAllModelTypeData(carId);

        //then
        assertEquals(4, modelList.size());
        assertTrue(modelList.stream().anyMatch(modelTypeMappedDto -> modelTypeMappedDto.equals(firstModel)));
        assertTrue(modelList.stream().anyMatch(modelTypeMappedDto -> modelTypeMappedDto.equals(fourthModel)));
    }

    @Test
    void findCarBoughtCountByCarId() {
        //given
        int carId = 1;

        //when
        Long boughtCount = modelRepository.findCarBoughtCountByCarId(carId).orElse(-1L);

        //then
        assertEquals(2000L, boughtCount);

    }
}