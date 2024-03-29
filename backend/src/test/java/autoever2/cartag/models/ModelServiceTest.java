package autoever2.cartag.models;

import autoever2.cartag.exception.ServerException;
import autoever2.cartag.models.dto.*;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.cars.CarRepository;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, SoftAssertionsExtension.class})
@DisplayName("UnitTest: ModelService")
class ModelServiceTest {

    @InjectSoftAssertions
    SoftAssertions softAssertions;

    @InjectMocks
    private ModelService modelService;

    @Mock
    private ModelRepository modelRepository;
    @Mock
    private CarRepository carRepository;

    @Test
    @DisplayName("트림의 모델 리스트 반환")
    void getModelTypeData() {
        List<ModelShortMappedDto> modelList = new ArrayList<>();
        modelList.add(ModelShortMappedDto.builder()
                .modelId(1).modelName("디젤 2.2").modelTypeId(1).modelPrice(1480000L).modelTypeName("파워트레인").modelBoughtCount(800L).maxPs("202/3800").maxKgfm("45.0/1750~2750").modelImage("/model/diesel2-2.jpg").build());
        modelList.add(ModelShortMappedDto.builder()
                .modelId(2).modelName("가솔린 3.8").modelTypeId(1).modelPrice(280000L).modelTypeName("파워트레인").modelBoughtCount(1200L).maxKgfm("36.2/5200").maxPs("295/6000").modelImage("/model/gasoline3-8.jpg").build());
        modelList.add(ModelShortMappedDto.builder()
                .modelId(3).modelName("2WD").modelTypeId(2).modelPrice(0L).modelTypeName("구동방식").modelBoughtCount(500L).modelImage("/model/2wd.png").build());
        modelList.add(ModelShortMappedDto.builder()
                .modelId(4).modelName("4WD").modelTypeId(2).modelPrice(237000L).modelTypeName("구동방식").modelBoughtCount(1500L).modelImage("/model/4wd.png").build());
        modelList.add(ModelShortMappedDto.builder()
                .modelId(5).modelName("7인승").modelTypeId(3).modelPrice(0L).modelTypeName("바디타입").modelBoughtCount(1000L).modelImage("/model/7seats.jpg").build());
        modelList.add(ModelShortMappedDto.builder()
                .modelId(6).modelName("8인승").modelTypeId(3).modelPrice(0L).modelTypeName("바디타입").modelBoughtCount(1000L).modelImage("/model/8seats.jpg").build());

        List<ModelShortMappedDto> emptyErrorList = new ArrayList<>();
        emptyErrorList.add(ModelShortMappedDto.builder()
                .modelId(7).modelName("임시 파워트레인").modelTypeId(1).modelPrice(0L).modelTypeName("파워트레인").modelBoughtCount(1200L).modelImage("/model/gasoline3-8.jpg").maxKgfm("").maxPs("").build());

        List<ModelShortMappedDto> invalidDataList = new ArrayList<>();
        invalidDataList.add(ModelShortMappedDto.builder()
                .modelId(8).modelName("임시 파워트레인2").modelTypeId(1).modelPrice(0L).modelTypeName("파워트레인").modelBoughtCount(1200L).modelImage("/model/gasoline3-8.jpg").maxKgfm("12").maxPs("13/0").build());

        List<ModelShortMappedDto> invalidParseDataList = new ArrayList<>();
        invalidParseDataList.add(ModelShortMappedDto.builder()
                .modelId(8).modelName("임시 파워트레인2").modelTypeId(1).modelPrice(0L).modelTypeName("파워트레인").modelBoughtCount(1200L).modelImage("/model/gasoline3-8.jpg").maxKgfm("12/15").maxPs("13").build());

        List<ModelShortDataDto> expected = new ArrayList<>();

        PowerTrainDataDto expectedHmg1 = PowerTrainDataDto.builder()
                .maxPs("202/3800").maxKgfm("45.0/1750~2750").ratioPs(1.0).ratioKgfm(1.0).build();
        expected.add(ModelShortDataDto.builder()
                .modelId(1).modelName("디젤 2.2").modelPrice(1480000L).modelTypeName("파워트레인").percentage(40).modelImage("/model/diesel2-2.jpg").hmgData(expectedHmg1).build());

        PowerTrainDataDto expectedHmg2 = PowerTrainDataDto.builder()
                .maxPs("295/6000").maxKgfm("36.2/5200").ratioPs(0.9249174917491748).ratioKgfm(0.34807692307692306).build();
        expected.add(ModelShortDataDto.builder()
                .modelId(2).modelName("가솔린 3.8").modelPrice(280000L).modelTypeName("파워트레인").percentage(60).modelImage("/model/gasoline3-8.jpg").hmgData(expectedHmg2).build());

        expected.add(ModelShortDataDto.builder()
                .modelId(3).modelName("2WD").modelPrice(0L).modelTypeName("구동방식").percentage(25).modelImage("/model/2wd.png").build());
        expected.add(ModelShortDataDto.builder()
                .modelId(4).modelName("4WD").modelPrice(237000L).modelTypeName("구동방식").percentage(75).modelImage("/model/4wd.png").build());
        expected.add(ModelShortDataDto.builder()
                .modelId(5).modelName("7인승").modelPrice(0L).modelTypeName("바디타입").percentage(50).modelImage("/model/7seats.jpg").build());
        expected.add(ModelShortDataDto.builder()
                .modelId(6).modelName("8인승").modelPrice(0L).modelTypeName("바디타입").percentage(50).modelImage("/model/8seats.jpg").build());

        int carId = 1;
        int errorListId = 5;
        int invalidId = 8;
        int notExistId = 10;
        int invalidParseId = 12;
        when(modelRepository.findAllModelTypeDataByCarId(carId)).thenReturn(modelList);
        when(modelRepository.findAllModelTypeDataByCarId(errorListId)).thenReturn(emptyErrorList);
        when(modelRepository.findAllModelTypeDataByCarId(notExistId)).thenReturn(new ArrayList<>());
        when(modelRepository.findAllModelTypeDataByCarId(invalidId)).thenReturn(invalidDataList);
        when(modelRepository.findAllModelTypeDataByCarId(invalidParseId)).thenReturn(invalidParseDataList);

        Long boughtCount = 2000L;
        when(carRepository.findCarBoughtCountByCarId(carId)).thenReturn(Optional.of(boughtCount));

        List<ModelShortDataDto> result = modelService.getModelTypeData(carId);

        softAssertions.assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        softAssertions.assertThatThrownBy(() -> modelService.getModelTypeData(errorListId)).isInstanceOf(ServerException.class);
        softAssertions.assertThatThrownBy(() -> modelService.getModelTypeData(notExistId)).isInstanceOf(EmptyDataException.class);
        softAssertions.assertThatThrownBy(() -> modelService.getModelTypeData(invalidId)).isInstanceOf(ServerException.class);
        softAssertions.assertThatThrownBy(() -> modelService.getModelTypeData(invalidParseId)).isInstanceOf(ServerException.class);
    }

    @Test
    @DisplayName("모델의 상세 데이터 반환")
    void getModelDetailData() {
        int modelId1 = 1;
        ModelDetailMappedDto expected = ModelDetailMappedDto.builder()
                .modelTypeName("파워트레인").modelName("디젤2.2").optionDescription("높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다").modelImage("/model/diesel2-2.jpg").build();

        int modelId2 = 4;

        when(modelRepository.findModelDetailDataMyModelId(modelId1)).thenReturn(Optional.of(expected));

        ModelDetailMappedDto result1 = modelService.getModelDetail(modelId1);

        softAssertions.assertThat(result1).usingRecursiveComparison().isEqualTo(expected);
        softAssertions.assertThatThrownBy(() -> modelService.getModelDetail(modelId2)).isInstanceOf(EmptyDataException.class);
    }

    @Test
    @DisplayName("파워트레인과 구동방식의 조합으로 HMG 데이터 반환")
    void getEfficiencyData() {
        int powerTrainId = 1;
        int operationId = 3;
        int invalidId = 10;
        ModelEfficiencyDataDto data = ModelEfficiencyDataDto.builder().averageFuel("12.16km/s").displacement("2,199cc").build();
        when(modelRepository.findEfficiencyData(powerTrainId, operationId)).thenReturn(Optional.of(data));

        softAssertions.assertThat(modelService.getEfficiencyData(powerTrainId, operationId)).usingRecursiveComparison().isEqualTo(data);
        softAssertions.assertThatThrownBy(() -> modelService.getEfficiencyData(powerTrainId, invalidId)).isInstanceOf(EmptyDataException.class);
    }
}