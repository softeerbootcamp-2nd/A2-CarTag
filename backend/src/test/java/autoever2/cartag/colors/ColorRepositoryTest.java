package autoever2.cartag.colors;

import autoever2.cartag.colors.dto.ColorDto;
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
@DisplayName("UnitTest: ColorRepository")
class ColorRepositoryTest {
    private final ColorRepository repository;

    @Autowired
    public ColorRepositoryTest(DataSource dataSource) {
        this.repository = new ColorRepository(dataSource);
    }

    @Test
    @DisplayName("트림별 내장 색상 리스트를 반환")
    void findInnerColor() {
        List<ColorDto> innerColors = repository.findInnerColorCarByCarId(1);
        assertEquals(2, innerColors.size());
        assertEquals("퍼플 그레이 펄", innerColors.get(0).getColorName());
        assertEquals("코발트 블루", innerColors.get(1).getColorName());
    }

    @Test
    @DisplayName("트림별 외장 색상 리스트를 반환")
    void findOuterColor() {
        List<ColorDto> outerColors = repository.findOuterColorCarByCarId(1);
        assertEquals(2, outerColors.size());
        assertEquals("천연 퀄팅(블랙)", outerColors.get(0).getColorName());
        assertEquals("천연 퀄팅(화이트)", outerColors.get(1).getColorName());
    }

    @Test
    @DisplayName("트림에 적용된 색상 이미지를 반환")
    void findOuterImages() {
        String image = repository.findOuterColorImagesByColorId(1).get();
        assertEquals("red_image_*.jpg", image);
    }

    @Test
    @DisplayName("외장 색상 이미지를 반환")
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
    @DisplayName("내장 색상 이미지를 반환")
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