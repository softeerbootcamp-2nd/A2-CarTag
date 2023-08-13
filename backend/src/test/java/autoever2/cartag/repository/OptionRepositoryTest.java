package autoever2.cartag.repository;

import autoever2.cartag.domain.car.DefaultOptionDto;
import autoever2.cartag.domain.suboption.SubOptionMappedDto;
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
@Sql({"classpath:insert/insert-suboption-h2.sql"})
class OptionRepositoryTest {

    private final OptionRepository optionRepository;

    @Autowired
    public OptionRepositoryTest(DataSource dataSource) {
        optionRepository = new OptionRepository(dataSource);
    }

    @Test
    @DisplayName("subOption 리스트를 가져온다")
    void findAllSubOptionWithCategoryNameByCarId() {
        //given
        int carId = 1;

        //when
        List<SubOptionMappedDto> optionList = optionRepository.findAllSubOptionWithCategoryNameByCarId(carId);
        SubOptionMappedDto expectedResult1 = SubOptionMappedDto.builder()
                .optionId(1)
                .optionCategoryName("상세품목")
                .optionName("2열 통풍 시트")
                .optionImage("/images/options/sub/2seats.jpg")
                .optionPrice(100000L)
                .optionBoughtCount(2800L)
                .optionUsedCount(38)
                .build();
        SubOptionMappedDto expectedResult2 = SubOptionMappedDto.builder()
                .optionId(2)
                .optionCategoryName("악세사리")
                .optionName("적외선 무릎 워머")
                .optionImage("/images/options/sub/warmer.jpg")
                .optionPrice(130000L)
                .optionBoughtCount(4200L)
                .optionUsedCount(42)
                .build();
        SubOptionMappedDto expectedResult3 = SubOptionMappedDto.builder()
                .optionId(3)
                .optionCategoryName("악세사리")
                .optionName("듀얼 머플러 패키지")
                .optionImage("/images/options/sub/murfler.jpg")
                .optionPrice(870000L)
                .optionBoughtCount(1300L)
                .optionUsedCount(55)
                .build();
        SubOptionMappedDto expectedResult4 = SubOptionMappedDto.builder()
                .optionId(4)
                .optionCategoryName("휠")
                .optionName("20인치 다크 스퍼터링 휠")
                .optionImage("/images/options/sub/darkwheel.jpg")
                .optionPrice(50000L)
                .optionBoughtCount(3850L)
                .optionUsedCount(12)
                .build();

        //then

        assertTrue(optionList.stream().anyMatch(subOptionMappedDto -> subOptionMappedDto.equals(expectedResult1)));
        assertTrue(optionList.stream().anyMatch(subOptionMappedDto -> subOptionMappedDto.equals(expectedResult2)));
        assertTrue(optionList.stream().anyMatch(subOptionMappedDto -> subOptionMappedDto.equals(expectedResult3)));
        assertTrue(optionList.stream().anyMatch(subOptionMappedDto -> subOptionMappedDto.equals(expectedResult4)));
    }

    @Test
    @DisplayName("sub option에 대한 hashtag 찾기")
    void findAllHashtagNameBySubOptionId() {
        //given
        int optionId1 = 1;
        int optionId2 = 2;

        //when
        List<String> hashtag1 = optionRepository.findAllHashtagNameBySubOptionId(optionId1);
        List<String> hashtag2 = optionRepository.findAllHashtagNameBySubOptionId(optionId2);
        System.out.println("hashtag2.toString() = " + hashtag2.toString());
        //then
        assertTrue(hashtag1.contains("레저"));
        assertTrue(hashtag1.contains("스포츠"));
        assertTrue(hashtag1.contains("캠핑"));
        assertTrue(hashtag2.contains("레저"));
        assertTrue(hashtag2.contains("장거리 운전"));
        assertTrue(hashtag2.contains("주차"));
    }

    @Test
    @DisplayName("carId에 해당하는 모든 defaultOption을 가져옵니다.")
    void findDefaultOptions() {
        List<DefaultOptionDto> defaultOptionByCarId = optionRepository.findDefaultOptionByCarId(1);
        assertEquals(3, defaultOptionByCarId.size());
        assertEquals("듀얼 머플러 패키지", defaultOptionByCarId.get(0).getOptionName());
    }
}