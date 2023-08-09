package autoever2.cartag.service;

import autoever2.cartag.domain.model.ModelShortDataDto;
import autoever2.cartag.repository.CarRepository;
import autoever2.cartag.repository.ModelRepository;
import autoever2.cartag.domain.model.ModelTypeMappedDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ModelServiceTest {

    @InjectMocks
    private ModelService modelService;

    @Mock
    private ModelRepository modelRepository;

    @Mock
    private CarRepository carRepository;

    private List<ModelTypeMappedDto> trimModelList;

    @BeforeEach
    void setUp() {

        trimModelList = new ArrayList<>();
        //디젤 2.2 데이터
        trimModelList.add(ModelTypeMappedDto.builder()
                .modelId(1)
                .modelName("디젤 2.2")
                .modelPrice(0L)
                .isDefaultOption(true)
                .modelTypeName("파워트레인")
                .modelBoughtCount(1800L)
                .build());

        //가솔린 3.8 데이터
        trimModelList.add(ModelTypeMappedDto.builder()
                .modelId(2)
                .modelName("가솔린 3.8")
                .modelPrice(280000L)
                .isDefaultOption(false)
                .modelTypeName("파워트레인")
                .modelBoughtCount(1900L)
                .build());

        //7인승 데이터
        trimModelList.add(ModelTypeMappedDto.builder()
                .modelId(3)
                .modelName("7인승")
                .modelPrice(0L)
                .isDefaultOption(true)
                .modelTypeName("바디타입")
                .modelBoughtCount(900L)
                .build());

        //8인승 데이터
        trimModelList.add(ModelTypeMappedDto.builder()
                .modelId(4)
                .modelName("8인승")
                .modelPrice(130000L)
                .isDefaultOption(false)
                .modelTypeName("바디타입")
                .modelBoughtCount(800L)
                .build());

        //2WD 데이터
        trimModelList.add(ModelTypeMappedDto.builder()
                .modelId(5)
                .modelName("2WD")
                .modelPrice(0L)
                .isDefaultOption(true)
                .modelTypeName("구동방식")
                .modelBoughtCount(1200L)
                .build());

        //4WD 데이터
        trimModelList.add(ModelTypeMappedDto.builder()
                .modelId(6)
                .modelName("4WD")
                .modelPrice(237000L)
                .isDefaultOption(false)
                .modelTypeName("구동방식")
                .modelBoughtCount(200L)
                .build());
    }

    @Test
    @DisplayName("트림의 모델 리스트 반환")
    void getModelTypeData() {
        //given
        int carId = 1;
        Long boughtCount = 2000L;
        when(modelRepository.findAllModelTypeData(carId)).thenReturn(trimModelList);
        when(carRepository.findCarBoughtCountByCarId(carId)).thenReturn(Optional.of(2000L));

        //when
        List<ModelShortDataDto> result = modelService.getModelTypeData(carId);

        //then
        assertEquals(6, result.size());
        assertEquals(1, result.get(0).getModelId());
        assertEquals("가솔린 3.8", result.get(1).getModelName());
        assertEquals("바디타입", result.get(2).getModelTypeName());
        assertEquals(130000L, result.get(3).getModelPrice());
        assertTrue(result.get(4).isDefaultOption());
        assertEquals(10, result.get(5).getPercentage());
    }
}