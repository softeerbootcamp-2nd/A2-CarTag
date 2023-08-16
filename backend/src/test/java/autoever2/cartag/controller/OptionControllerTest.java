package autoever2.cartag.controller;

import autoever2.cartag.domain.option.*;
import autoever2.cartag.service.OptionService;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OptionController.class)
class OptionControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private OptionService optionService;

    @Test
    @DisplayName("트림의 서브 옵션 데이터 호출 API")
    void getSubOptionList() throws Exception {
        int carId = 1;

        List<String> hashtagList = new ArrayList<>();
        List<SubOptionDto> optionList = new ArrayList<>();
        hashtagList.add("여행");
        hashtagList.add("장거리 운전");
        hashtagList.add("시원한");

        optionList.add(SubOptionDto.builder()
                .subOptionId(1)
                .optionCategoryName("상세품목")
                .optionImage("/images/options/sub/2seats.jpg")
                .optionPrice(100000L)
                .optionName("2열 통풍 시트")
                .percentage(28)
                .hashtagName(hashtagList)
                .hasHmgData(true)
                .build());

        optionList.add(SubOptionDto.builder()
                .subOptionId(2)
                .optionCategoryName("악세사리")
                .optionImage("/images/options/sub/legwarmer.jpg")
                .optionPrice(230000L)
                .optionName("적외선 무릎 워머")
                .percentage(37)
                .hashtagName(hashtagList)
                .hasHmgData(false)
                .build());

        optionList.add(SubOptionDto.builder()
                .subOptionId(3)
                .optionCategoryName("악세사리")
                .optionImage("/images/options/sub/murfler.jpg")
                .optionPrice(840000L)
                .optionName("듀얼 머플러 패키지")
                .percentage(18)
                .hashtagName(hashtagList)
                .hasHmgData(false)
                .build());

        optionList.add(SubOptionDto.builder()
                .subOptionId(4)
                .optionCategoryName("휠")
                .optionImage("/images/options/sub/darkwheel.jpg")
                .optionPrice(840000L)
                .optionName("20인치 다크 스퍼터링 휠")
                .percentage(38)
                .hashtagName(hashtagList)
                .hasHmgData(true)
                .build());

        given(optionService.getSubOptionList(carId)).willReturn(optionList);

        //when
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/options/sublist").param("carid", String.valueOf(carId)));

        List<String> expectedHashtag = new ArrayList<>();
        expectedHashtag.add("여행");
        expectedHashtag.add("장거리 운전");
        expectedHashtag.add("시원한");

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].subOptionId").value(1))
                .andExpect(jsonPath("$[0].optionCategoryName").value("상세품목"))
                .andExpect(jsonPath("$[1].optionImage").value("/images/options/sub/legwarmer.jpg"))
                .andExpect(jsonPath("$[1].optionPrice").value(230000L))
                .andExpect(jsonPath("$[2].optionName").value("듀얼 머플러 패키지"))
                .andExpect(jsonPath("$[2].percentage").value(18))
                .andExpect(jsonPath("$[3].hashtagName").value(expectedHashtag))
                .andExpect(jsonPath("$[3].hasHmgData").value(true));

    }

    @Test
    @DisplayName("옵션의 상세데이터 및 패키지 하위정보를 가져온다.")
    void getOptionDetail() throws Exception {
        int carId = 1;
        int optionWithHmg = 4;
        int optionPackage = 69;

        OptionDetailDto expected1 = OptionDetailDto.builder()
                        .categoryName("휠")
                        .optionDescription("다크 휠입니다.")
                        .optionName("20인치 다크 스퍼터링 휠")
                        .optionImage("/images/options/sub/darkwheel.jpg")
                        .hmgData(OptionHmgDataVo.builder().optionUsedCount(12.0).optionBoughtCount(3850L).build())
                        .isPackage(false)
                        .build();


        List<OptionDetailDto> subOptions = new ArrayList<>();
        subOptions.add(OptionDetailDto.builder()
                .categoryName("악세사리")
                .optionName("후석 승객알림")
                .optionImage("/options/rear-passenger.png")
                .isPackage(false)
                .optionDescription("초음파 센서를 통해 뒷좌석에 남아있는 승객의 움직임을 감지하여 운전자에게 경고함으로써 부주의에 의한 유아 또는 반려 동물 등의 방치 사고를 예방하는 신기술입니다.")
                .hmgData(OptionHmgDataVo.builder()
                        .optionBoughtCount(7890L)
                        .optionUsedCount(82.0)
                        .build())
                .build());
        subOptions.add(OptionDetailDto.builder()
                .categoryName("악세사리")
                .optionName("메탈 리어범퍼스텝")
                .optionImage("/options/metalrearbumper.png")
                .isPackage(false)
                .optionDescription("러기지 룸 앞쪽 하단부를 메탈로 만들어 물건을 싣고 내릴 때나 사람이 올라갈 때 차체를 보호해줍니다.")
                .build());

        OptionDetailDto expected2 = OptionDetailDto.builder()
                .categoryName("상세품목")
                .optionName("컴포트2")
                .optionImage("/options/rear-passenger.png")
                .isPackage(true)
                .subOptionList(subOptions)
                .build();

        given(optionService.getOptionDetailData(carId, optionWithHmg, false)).willReturn(expected1);
        given(optionService.getOptionDetailData(carId, optionPackage, false)).willReturn(expected2);

        ResultActions singleOption = mockMvc.perform(MockMvcRequestBuilders.get("/api/options/sub/detail").param("carid", String.valueOf(carId)).param("optionid", String.valueOf(optionWithHmg)));
        ResultActions packageOption = mockMvc.perform(MockMvcRequestBuilders.get("/api/options/sub/detail").param("carid", String.valueOf(carId)).param("optionid", String.valueOf(optionPackage)));

        singleOption.andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryName").value("휠"))
                .andExpect(jsonPath("$.optionName").value("20인치 다크 스퍼터링 휠"))
                .andExpect(jsonPath("$.optionImage").value("/images/options/sub/darkwheel.jpg"))
                .andExpect(jsonPath("$.hmgData.optionBoughtCount").value(3850L))
                .andExpect(jsonPath("$.hmgData.optionUsedCount").value(12.0));

        packageOption.andExpect(status().isOk())
                .andExpect(jsonPath("$.subOptionList[0].categoryName").value("악세사리"))
                .andExpect(jsonPath("$.subOptionList[1].optionName").value("메탈 리어범퍼스텝"))
                .andExpect(jsonPath("$.subOptionList[0].hmgData.optionBoughtCount").value(7890L));
    }

    @Test
    @DisplayName("기본옵션 리스트 반환 API 테스트")
    void getDefaultOptionList() throws Exception {
        int carId = 1;
        DefaultOptionDto expected1 = DefaultOptionDto.builder()
                .optionId(1)
                .optionName("2열 통풍 시트")
                .optionCategoryName("상세품목")
                .optionImage("/images/options/sub/2seats.jpg")
                .hasHmgData(true)
                .build();

        DefaultOptionDto expected2 = DefaultOptionDto.builder()
                .optionId(2)
                .optionName("적외선 무릎 워머")
                .optionCategoryName("악세사리")
                .optionImage("/images/options/sub/warmer.jpg")
                .hasHmgData(false)
                .build();

        DefaultOptionDto expected3 = DefaultOptionDto.builder()
                .optionId(3)
                .optionName("듀얼 머플러 패키지")
                .optionCategoryName("악세사리")
                .optionImage("/images/options/sub/murfler.jpg")
                .hasHmgData(true)
                .build();

        List<DefaultOptionDto> expectedList = new ArrayList<>();
        expectedList.add(expected1);
        expectedList.add(expected2);
        expectedList.add(expected3);

        given(optionService.getDefaultOptionList(carId)).willReturn(expectedList);

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/options/defaultlist").param("carid", String.valueOf(carId)));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].optionId").value(String.valueOf(1)))
                .andExpect(jsonPath("$[1].optionName").value("적외선 무릎 워머"))
                .andExpect(jsonPath("$[2].optionCategoryName").value("악세사리"))
                .andExpect(jsonPath("$[0].optionImage").value("/images/options/sub/2seats.jpg"))
                .andExpect(jsonPath("$[2].hasHmgData").value(true));
    }
}