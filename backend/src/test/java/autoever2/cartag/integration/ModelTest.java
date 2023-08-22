package autoever2.cartag.integration;

import autoever2.cartag.controller.ModelController;
import autoever2.cartag.domain.model.ModelDetailMappedDto;
import autoever2.cartag.domain.model.ModelEfficiencyDataDto;
import autoever2.cartag.domain.model.ModelShortDataDto;
import autoever2.cartag.domain.model.PowerTrainDataDto;
import autoever2.cartag.exception.EmptyDataException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@Sql({"classpath:insert/insert-model-h2.sql"})
public class ModelTest {

    @Autowired
    ModelController controller;

    @Test
    @DisplayName("차량 모델 페이지에서 하단의 리스트(파워트레인 등)를 반환하는 api 테스트")
    void getModelList() {
        List<ModelShortDataDto> trimModels = controller.getTrimModelType(1);
        assertEquals("디젤2.2", trimModels.get(0).getModelName());
        assertEquals(0, trimModels.get(1).getModelPrice());
        assertEquals("구동방식", trimModels.get(2).getModelTypeName());
        assertThrows(EmptyDataException.class, () -> {
            controller.getTrimModelType(9);
        });

        PowerTrainDataDto hmgData = trimModels.get(0).getHmgData();
        assertEquals("45.0/1750~2750", hmgData.getMaxKgfm());
        assertEquals("202/3800", hmgData.getMaxPs());
        assertEquals(1.0, hmgData.getRatioKgfm());
        assertEquals(1.0, hmgData.getRatioPs());
        assertEquals(1.0, hmgData.getRatioKgfm());
    }

    @Test
    @DisplayName("모델명과 설명, 이미지 반환하는 api 테스트")
    void getModelDescriptionAndImage() {
        ModelDetailMappedDto modelDetail = controller.getModelDetail(1);
        assertEquals("디젤2.2", modelDetail.getModelName());
        assertEquals("/model/diesel2-2.jpg", modelDetail.getModelImage());
        assertEquals("파워트레인", modelDetail.getModelTypeName());
        assertEquals("높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다", modelDetail.getOptionDescription());
    }

    @Test
    @DisplayName("파워트레인과 구동방식의 조합으로 나온 효츌 HMG값 반환")
    void getHmgData() {
        assertThrows(EmptyDataException.class, () -> {
            controller.getPowerTrainData(1, 1);
        });

        ModelEfficiencyDataDto powerTrainData = controller.getPowerTrainData(1, 3);
        assertEquals("2,199cc", powerTrainData.getDisplacement());
        assertEquals("12.16km/s", powerTrainData.getAverageFuel());
    }
}
