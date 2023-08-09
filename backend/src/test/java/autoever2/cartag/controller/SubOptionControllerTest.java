package autoever2.cartag.controller;

import autoever2.cartag.domain.suboption.SubOptionDto;
import autoever2.cartag.service.SubOptionService;
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
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SubOptionController.class)
class SubOptionControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private SubOptionService subOptionService;

    private List<SubOptionDto> optionList;

    @BeforeEach
    void setUp() {

        List<String> hashtagList = new ArrayList<>();
        optionList = new ArrayList<>();
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
    }

    @Test
    @DisplayName("트림의 서브 옵션 데이터 호출 API")
    void getSubOptionList() throws Exception {
        int carId = 1;
        given(subOptionService.getSubOptionList(carId)).willReturn(optionList);

        //when
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/suboptions/list").param("carid", String.valueOf(carId)));

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
}