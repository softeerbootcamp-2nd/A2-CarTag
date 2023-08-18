package autoever2.cartag.integration;

import autoever2.cartag.controller.OptionController;
import autoever2.cartag.domain.option.DefaultOptionDto;
import autoever2.cartag.domain.option.OptionDetailDto;
import autoever2.cartag.domain.option.OptionHmgDataVo;
import autoever2.cartag.domain.option.SubOptionDto;
import autoever2.cartag.exception.EmptyDataException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Sql({"classpath:insert/insert-suboption-h2.sql"})
public class OptionTest {
    @Autowired
    OptionController controller;

    @Test
    @DisplayName("추가 옵션 데이터와 선택 비율(%) 및 HMG 데이터 존재 여부 List 제공 테스트")
    void getOptionDataAndHmgDataList() {
        List<SubOptionDto> subOptionList = controller.getSubOptionList(1);
        assertEquals(6, subOptionList.size());
        assertEquals("2열 통풍 시트", subOptionList.get(0).getOptionName());
        assertEquals("/images/options/sub/2seats.jpg", subOptionList.get(0).getOptionImage());
        assertEquals(100000, subOptionList.get(0).getOptionPrice());
        assertEquals("상세품목", subOptionList.get(0).getOptionCategoryName());
    }

    @Test
    @DisplayName("추가옵션 데이터 상세정보 및 이미지, HMG가 존재한다면(비어있다면 비어있는 부분을 Null) 태스트")
    void getOptionDetail() {
        OptionDetailDto subOptionDetail = controller.getSubOptionDetail(1, 1);
        assertEquals("2열 통풍 시트", subOptionDetail.getOptionName());
        assertEquals("시동이 걸린 상태에서 해당 좌석의 통풍 스위치를 누르면 표시등이 켜지면서 해당 좌석에 바람이 나오는 편의장치입니다.", subOptionDetail.getOptionDescription());

        OptionDetailDto subOptionDto = controller.getSubOptionDetail(1, 69);
        assertEquals("컴포트2", subOptionDto.getOptionName());

        List<OptionDetailDto> subOptionList = subOptionDto.getSubOptionList();
        assertEquals(2, subOptionList.size());
    }

    @Test
    @DisplayName("기본옵션 데이터 상세정보 및 이미지, HMG가 존재한다면(비어있다면 비어있는 부분을 Null) 보냄 테스트")
    void getDataAndImage() {
        OptionDetailDto defaultOptionDetail = controller.getDefaultOptionDetail(1, 1);
        assertEquals("상세품목", defaultOptionDetail.getCategoryName());
        assertEquals("2열 통풍 시트", defaultOptionDetail.getOptionName());
        assertEquals("시동이 걸린 상태에서 해당 좌석의 통풍 스위치를 누르면 표시등이 켜지면서 해당 좌석에 바람이 나오는 편의장치입니다.", defaultOptionDetail.getOptionDescription());
        assertFalse(defaultOptionDetail.isPackage());
        assertThrows(EmptyDataException.class, () -> {
            controller.getDefaultOptionDetail(2, 1);
        });

        OptionHmgDataVo hmgData = defaultOptionDetail.getHmgData();
        assertEquals(38.0, hmgData.getOptionUsedCount());
    }

    @Test
    @DisplayName("기본 옵션 데이터와 및 HMG 데이터 존재 여부 List 제공 테스트")
    void getOptionAndData(){
        List<DefaultOptionDto> defaultOptionList = controller.getDefaultOptionList(1);
        assertEquals(3, defaultOptionList.size());

        DefaultOptionDto defaultOptionDto = defaultOptionList.get(1);
        assertEquals("적외선 무릎 워머", defaultOptionDto.getOptionName());
        assertEquals("악세사리", defaultOptionDto.getOptionCategoryName());
    }
}
