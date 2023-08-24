package autoever2.cartag.repository;

import autoever2.cartag.domain.color.ColorDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@JdbcTest
@ActiveProfiles("test")
@Sql(scripts = {"classpath:/insert/insertColor-h2.sql"})
class ColorRepositoryTest {
    private final ColorRepository repository;

    @Autowired
    public ColorRepositoryTest(DataSource dataSource) {
        this.repository = new ColorRepository(dataSource);
    }

    @Test
    @DisplayName("carId에 따른 모든 내장 색상 리스트를 반환합니다.")
    void findInnerColor() {
        List<ColorDto> innerColors = repository.findInnerColorCarByCarId(1);
        assertEquals(2, innerColors.size());
        assertEquals("퍼플 그레이 펄", innerColors.get(0).getColorName());
        assertEquals("코발트 블루", innerColors.get(1).getColorName());
    }

    @Test
    @DisplayName("carId에 따른 모든 외장 색상 리스트를 반환합니다.")
    void findOuterColor() {
        List<ColorDto> outerColors = repository.findOuterColorCarByCarId(1);
        assertEquals(2, outerColors.size());
        assertEquals("천연 퀄팅(블랙)", outerColors.get(0).getColorName());
        assertEquals("천연 퀄팅(화이트)", outerColors.get(1).getColorName());
    }

    @Test
    @DisplayName("carId에 따른 색상이 적용된 차량 이미지를 반환합니다.")
    void findOuterImages() {
        String image = repository.findOuterColorImagesByColorId(1).get();
        assertEquals("red_image_*.jpg", image);
    }

    @Test
    @DisplayName("color_id에 따른 외장색상을 반환합니다.")
    void getOuterColorInfo() {
        Optional<ColorDto> outerColorInfo = repository.findColorDataByColorId(1, true);
        assertTrue(outerColorInfo.isPresent());

        ColorDto outerColorDto = outerColorInfo.get();
        assertEquals("천연 퀄팅(블랙)", outerColorDto.getColorName());
        assertEquals(1234, outerColorDto.getColorPrice());
        assertEquals("red_image_*.jpg", outerColorDto.getColorCarImage());
        assertEquals("image_1", outerColorDto.getColorImage());
    }

    @Test
    @DisplayName("color_id에 따른 내장색상을 반환합니다.")
    void getInnerColorInfo() {
        Optional<ColorDto> innerColorInfo = repository.findColorDataByColorId(3, false);
        assertTrue(innerColorInfo.isPresent());

        ColorDto innerColorDto = innerColorInfo.get();
        assertEquals("퍼플 그레이 펄", innerColorDto.getColorName());
        assertEquals(154, innerColorDto.getColorPrice());
        assertEquals("black_image_*.jpg", innerColorDto.getColorCarImage());
        assertEquals("image_3", innerColorDto.getColorImage());
    }
}