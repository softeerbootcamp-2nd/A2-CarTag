package autoever2.cartag.repository;

import autoever2.cartag.domain.car.TrimDefaultOptionDto;
import autoever2.cartag.domain.option.OptionDetailMappedDto;
import autoever2.cartag.domain.option.OptionShortMappedDto;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ActiveProfiles("test")
@JdbcTest
@Sql({"classpath:insert/insert-suboption-h2.sql"})
@ExtendWith(SoftAssertionsExtension.class)
class OptionRepositoryTest {

    @InjectSoftAssertions
    SoftAssertions softAssertions;

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
        List<OptionShortMappedDto> optionList = optionRepository.findOptionList(carId, false);
        OptionShortMappedDto expectedResult1 = OptionShortMappedDto.builder()
                .optionId(1)
                .optionCategoryName("상세품목")
                .optionName("2열 통풍 시트")
                .optionImage("/images/options/sub/2seats.jpg")
                .optionPrice(100000L)
                .optionBoughtCount(2800L)
                .optionUsedCount(38.0)
                .build();
        OptionShortMappedDto expectedResult2 = OptionShortMappedDto.builder()
                .optionId(2)
                .optionCategoryName("악세사리")
                .optionName("적외선 무릎 워머")
                .optionImage("/images/options/sub/warmer.jpg")
                .optionPrice(130000L)
                .optionBoughtCount(4200L)
                .optionUsedCount(42.0)
                .build();
        OptionShortMappedDto expectedResult3 = OptionShortMappedDto.builder()
                .optionId(3)
                .optionCategoryName("악세사리")
                .optionName("듀얼 머플러 패키지")
                .optionImage("/images/options/sub/murfler.jpg")
                .optionPrice(870000L)
                .optionBoughtCount(1300L)
                .optionUsedCount(55.0)
                .build();
        OptionShortMappedDto expectedResult4 = OptionShortMappedDto.builder()
                .optionId(4)
                .optionCategoryName("휠")
                .optionName("20인치 다크 스퍼터링 휠")
                .optionImage("/images/options/sub/darkwheel.jpg")
                .optionPrice(50000L)
                .optionBoughtCount(3850L)
                .optionUsedCount(12.0)
                .build();

        //then

        assertTrue(optionList.contains(expectedResult1));
        assertTrue(optionList.contains(expectedResult2));
        assertTrue(optionList.contains(expectedResult3));
        assertTrue(optionList.contains(expectedResult4));
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
        List<TrimDefaultOptionDto> defaultOptionByCarId = optionRepository.findDefaultOptionByCarId(1);
        assertEquals(3, defaultOptionByCarId.size());
        assertEquals("듀얼 머플러 패키지", defaultOptionByCarId.get(0).getOptionName());
    }

    @Test
    @DisplayName("옵션의 상세 데이터를 가져옵니다.")
    void findOptionDetail() {
        //given
        int carId = 1;
        int optionWithHmg = 4;
        int optionPackage = 69;
        int optionWithHalfHmg = 72;
        OptionDetailMappedDto data1 = OptionDetailMappedDto.builder()
                .optionName("20인치 다크 스퍼터링 휠")
                .optionImage("/images/options/sub/darkwheel.jpg")
                .optionUsedCount(12.0)
                .optionBoughtCount(3850L)
                .optionDescription("다크 휠입니다.")
                .categoryName("휠")
                .build();

        OptionDetailMappedDto data2 = OptionDetailMappedDto.builder()
                .optionName("컴포트2")
                .optionImage("/options/rear-passenger.png")
                .optionBoughtCount(48015L)
                .categoryName("상세품목")
                .build();

        OptionDetailMappedDto data3 = OptionDetailMappedDto.builder()
                .optionName("빌트인 캠")
                .optionImage("/options/builtincam.png")
                .optionBoughtCount(133980L)
                .optionDescription("빌트인 적용된 영상기록장치로, 내비게이션 화면을 통해 영상 확인 및 앱 연동을 통해 영상 확인 및 SNS 공유가 가능합니다.")
                .categoryName("상세품목")
                .build();

        //when
        Optional<OptionDetailMappedDto> packageData = optionRepository.findOptionDetail(carId, optionPackage, false);
        Optional<OptionDetailMappedDto> halfHmgData = optionRepository.findOptionDetail(carId, optionWithHalfHmg, false);
        Optional<OptionDetailMappedDto> hmgData = optionRepository.findOptionDetail(carId, optionWithHmg, false);

        //then
        assertTrue(packageData.isPresent());
        assertTrue(halfHmgData.isPresent());
        assertTrue(hmgData.isPresent());
        softAssertions.assertThat(hmgData.get()).usingRecursiveComparison().isEqualTo(data1);
        softAssertions.assertThat(packageData.get()).usingRecursiveComparison().isEqualTo(data2);
        softAssertions.assertThat(halfHmgData.get()).usingRecursiveComparison().isEqualTo(data3);
    }

    @Test
    @DisplayName("패키지 여부를 확인하고 패키지라면 하위 패키지 리스트를 호출")
    void findPackageSubOptions() {
        int optionPackage = 69;
        int singlePackage = 4;

        OptionDetailMappedDto sub1 = OptionDetailMappedDto.builder()
                .optionName("후석 승객알림")
                .optionImage("/options/rear-passenger.png")
                .optionUsedCount(82.0)
                .optionDescription("초음파 센서를 통해 뒷좌석에 남아있는 승객의 움직임을 감지하여 운전자에게 경고함으로써 부주의에 의한 유아 또는 반려 동물 등의 방치 사고를 예방하는 신기술입니다.")
                .categoryName("악세사리")
                .build();

        OptionDetailMappedDto sub2 = OptionDetailMappedDto.builder()
                .optionName("메탈 리어범퍼스텝")
                .optionImage("/options/metalrearbumper.png")
                .optionDescription("러기지 룸 앞쪽 하단부를 메탈로 만들어 물건을 싣고 내릴 때나 사람이 올라갈 때 차체를 보호해줍니다.")
                .categoryName("외관")
                .build();

        List<OptionDetailMappedDto> packageSubOptions = optionRepository.findPackageSubOptions(optionPackage);
        List<OptionDetailMappedDto> singleOptions = optionRepository.findPackageSubOptions(singlePackage);

        assertTrue(singleOptions.isEmpty());
        softAssertions.assertThat(packageSubOptions.get(0)).usingRecursiveComparison().isEqualTo(sub1);
        softAssertions.assertThat(packageSubOptions.get(1)).usingRecursiveComparison().isEqualTo(sub2);
    }

    @Test
    @DisplayName("기본 옵션 리스트 반환")
    void findDefaultOptionList() {
        int carId = 1;

        OptionShortMappedDto expected1 = OptionShortMappedDto.builder()
                .optionId(1)
                .optionName("2열 통풍 시트")
                .optionCategoryName("상세품목")
                .optionImage("/images/options/sub/2seats.jpg")
                .optionUsedCount(38.0)
                .build();
        OptionShortMappedDto expected2 = OptionShortMappedDto.builder()
                .optionId(2)
                .optionName("적외선 무릎 워머")
                .optionCategoryName("악세사리")
                .optionImage("/images/options/sub/warmer.jpg")
                .optionUsedCount(42.0)
                .build();
        OptionShortMappedDto expected3 = OptionShortMappedDto.builder()
                .optionId(3)
                .optionName("듀얼 머플러 패키지")
                .optionCategoryName("악세사리")
                .optionImage("/images/options/sub/murfler.jpg")
                .optionUsedCount(55.0)
                .build();

        List<OptionShortMappedDto> expectedList = new ArrayList<>();
        expectedList.add(expected1);
        expectedList.add(expected2);
        expectedList.add(expected3);

        List<OptionShortMappedDto> data = optionRepository.findOptionList(carId, true);

        softAssertions.assertThat(data).usingRecursiveComparison().isEqualTo(expectedList);
    }

    @Test
    @DisplayName("공유를 위한 optionInfo 추출")
    void getOptionInfo(){
        Optional<QuoteSubOptionDto> subOptionInfoV1 = optionRepository.findSubOptionByOptionId(1);
        assertTrue(subOptionInfoV1.isPresent());

        QuoteSubOptionDto subOptionV1 = subOptionInfoV1.get();
        assertEquals("2열 통풍 시트", subOptionV1.getOptionName());
        assertEquals("/images/options/sub/2seats.jpg", subOptionV1.getOptionImage());
        assertEquals("상세품목", subOptionV1.getOptionTitle());
        assertEquals(100000, subOptionV1.getOptionPrice());

        Optional<QuoteSubOptionDto> subOptionInfoV2 = optionRepository.findSubOptionByOptionId(100);
        assertTrue(subOptionInfoV2.isEmpty());
    }

    @Test
    @DisplayName("옵션이 실제로 존재하는지 검증")
    void countExistOptions() {
        int carId = 1;
        List<Integer> optionIds = List.of(69);

        assertEquals(1, optionRepository.countExistOptions(carId, optionIds));
    }
}