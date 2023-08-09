package autoever2.cartag.repository;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.sql.DataSource;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
    void findInnerColor(){
        List<InnerColorDto> innerColors = repository.findInnerColorCarByCarId(1);
        assertEquals(2, innerColors.size());
        assertEquals("퍼플 그레이 펄", innerColors.get(0).getColorName());
        assertEquals("코발트 블루", innerColors.get(1).getColorName());
    }

    @Test
    @DisplayName("carId에 따른 모든 외장 색상 리스트를 반환합니다.")
    void findOuterColor(){
        List<OuterColorDto> outerColors = repository.findOuterColorCarByCarId(1);
        assertEquals(2, outerColors.size());
        assertEquals("천연 퀄팅(블랙)", outerColors.get(0).getColorName());
        assertEquals("천연 퀄팅(화이트)", outerColors.get(1).getColorName());
    }
}