package autoever2.cartag.colors;

import autoever2.cartag.colors.dto.InnerColorPercentDto;
import autoever2.cartag.colors.dto.OuterColorPercentDto;
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
@DisplayName("Integration: Color")
public class ColorTest {

    @Autowired
    ColorController colorController;

    @Test
    @DisplayName("api/cars/colors/outer=1 통합테스트")
    void getOuterColorList() {
        List<OuterColorPercentDto> outerColors = colorController.carOuterColorInfo(1);
        assertEquals("천연 퀄팅(블랙)", outerColors.get(0).getColorName());
        assertEquals("image_2", outerColors.get(1).getColorImage());
        assertThrows(EmptyDataException.class, () -> {
            colorController.carOuterColorInfo(2);
        });
    }

    @Test
    @DisplayName("api/cars/colors/outer/images?colorid=1 통합테스트")
    void getOuterColorImageList() {
        List<String> images = colorController.carOuterColorImageInfo(1);
        assertEquals(60, images.size());
        assertEquals("red_image_30.jpg", images.get(29));
        assertThrows(EmptyDataException.class, () -> {
            colorController.carOuterColorImageInfo(3);
        });
    }

    @Test
    @DisplayName("api/cars/colors/inner?carid=1 통합테스트")
    void getInnerColorList() {
        List<InnerColorPercentDto> innerColors = colorController.carInnerColorInfo(1);
        assertEquals("퍼플 그레이 펄", innerColors.get(0).getColorName());
        assertEquals("image_3", innerColors.get(0).getColorImage());
        assertThrows(EmptyDataException.class, () -> {
            colorController.carInnerColorInfo(2);
        });
    }
}
