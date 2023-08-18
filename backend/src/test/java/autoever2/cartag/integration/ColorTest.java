package autoever2.cartag.integration;

import autoever2.cartag.controller.ColorController;
import autoever2.cartag.domain.color.InnerColorPercentDto;
import autoever2.cartag.domain.color.OuterColorPercentDto;
import autoever2.cartag.exception.EmptyDataException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insertColor-h2.sql"})
public class ColorTest {

    @Autowired
    ColorController controller;

    @Test
    @DisplayName("선택한 car_id에 따라 외장 색상 리스트를 반환합니다.")
    void getOuterColorList() {
        List<OuterColorPercentDto> outerColors = controller.carOuterColorInfo(1);
        assertEquals("천연 퀄팅(블랙)", outerColors.get(0).getColorName());
        assertEquals("image_2", outerColors.get(1).getColorImage());
        assertThrows(EmptyDataException.class, () -> {
            controller.carOuterColorInfo(2);
        });
    }

    @Test
    @DisplayName("선택한 car_id에 따라 내장 색상 리스트를 반환합니다.")
    void getInnerColorList() {
        List<InnerColorPercentDto> innerColors = controller.carInnerColorInfo(1);
        assertEquals("퍼플 그레이 펄", innerColors.get(0).getColorName());
        assertEquals("image_3", innerColors.get(0).getColorImage());
        assertThrows(EmptyDataException.class, () -> {
            controller.carInnerColorInfo(2);
        });
    }

    @Test
    @DisplayName("선택 차량의 외장색상 이미지 리스트를 반환합니다")
    void getOuterColorImageList() {
        List<String> images = controller.carOuterColorImageInfo(1);
        assertEquals(60, images.size());
        assertEquals("red_image_30.jpg", images.get(29));
        assertThrows(EmptyDataException.class, () -> {
            controller.carOuterColorImageInfo(3);
        });
    }
}
