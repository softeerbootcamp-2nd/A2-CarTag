package autoever2.cartag.service;

import autoever2.cartag.domain.suboption.SubOptionDto;
import autoever2.cartag.domain.suboption.SubOptionMappedDto;
import autoever2.cartag.repository.CarRepository;
import autoever2.cartag.repository.SubOptionRepository;
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
class SubOptionServiceTest {

    @InjectMocks
    private SubOptionService subOptionService;

    @Mock
    private SubOptionRepository subOptionRepository;

    @Mock
    private CarRepository carRepository;

    private List<SubOptionMappedDto> optionList;

    private List<String> hashtagList;

    @BeforeEach
    void setUp() {
        hashtagList = new ArrayList<>();
        optionList = new ArrayList<>();
        hashtagList.add("여행");
        hashtagList.add("장거리 운전");
        hashtagList.add("시원한");

        optionList.add(SubOptionMappedDto.builder()
                .subOptionId(1)
                .optionCategoryName("상세품목")
                .optionImage("/images/options/sub/2seats.jpg")
                .optionPrice(100000L)
                .optionName("2열 통풍 시트")
                .optionBoughtCount(2800L)
                .optionUsedCount(30)
                .build());

        optionList.add(SubOptionMappedDto.builder()
                .subOptionId(2)
                .optionCategoryName("악세사리")
                .optionImage("/images/options/sub/legwarmer.jpg")
                .optionPrice(230000L)
                .optionName("적외선 무릎 워머")
                .optionBoughtCount(4200L)
                .optionUsedCount(42)
                .build());

        optionList.add(SubOptionMappedDto.builder()
                .subOptionId(3)
                .optionCategoryName("악세사리")
                .optionImage("/images/options/sub/murfler.jpg")
                .optionPrice(840000L)
                .optionName("듀얼 머플러 패키지")
                .optionBoughtCount(1300L)
                .optionUsedCount(55)
                .build());

        optionList.add(SubOptionMappedDto.builder()
                .subOptionId(4)
                .optionCategoryName("휠")
                .optionImage("/images/options/sub/darkwheel.jpg")
                .optionPrice(840000L)
                .optionName("20인치 다크 스퍼터링 휠")
                .optionBoughtCount(3850L)
                .optionUsedCount(12)
                .build());
    }

    @Test
    @DisplayName("추가옵션 리스트를 가져와 퍼센트로 변환")
    void getSubOptionList() {
        int carId = 1;
        Long boughtCount = 2000L;
        when(subOptionRepository.findAllSubOptionWithCategoryNameByCarId(carId)).thenReturn(optionList);
        when(carRepository.findCarBoughtCountByCarId(carId)).thenReturn(Optional.of(10000L));
        when(subOptionRepository.findAllHashtagNameBySubOptionId(1)).thenReturn(hashtagList);
        when(subOptionRepository.findAllHashtagNameBySubOptionId(2)).thenReturn(hashtagList);
        when(subOptionRepository.findAllHashtagNameBySubOptionId(3)).thenReturn(hashtagList);
        when(subOptionRepository.findAllHashtagNameBySubOptionId(4)).thenReturn(hashtagList);


        //when
        List<SubOptionDto> result = subOptionService.getSubOptionList(carId);

        //then
        assertEquals(4, result.size());
        assertEquals(1, result.get(0).getSubOptionId());
        assertEquals("상세품목", result.get(0).getOptionCategoryName());
        assertEquals("/images/options/sub/legwarmer.jpg", result.get(1).getOptionImage());
        assertEquals(230000L, result.get(1).getOptionPrice());
        assertEquals("듀얼 머플러 패키지", result.get(2).getOptionName());
        assertEquals(hashtagList, result.get(2).getHashtagName());
        assertEquals(38, result.get(3).getPercentage());
        assertTrue(result.get(3).isHasHmgData());
    }
}