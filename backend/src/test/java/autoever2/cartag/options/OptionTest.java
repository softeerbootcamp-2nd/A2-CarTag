package autoever2.cartag.options;

import autoever2.cartag.options.dto.DefaultOptionDto;
import autoever2.cartag.options.dto.OptionDetailDto;
import autoever2.cartag.options.dto.OptionHmgDataVo;
import autoever2.cartag.options.dto.SubOptionDto;
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
@DisplayName("Integration: Option")
public class OptionTest {
    @Autowired
    OptionController optionController;

    @Test
    @DisplayName("/api/options/sublist?carid=1 통합테스트")
    void getOptionDataAndHmgDataList() {
        List<SubOptionDto> subOptionList = optionController.getSubOptionList(1);
        assertEquals(6, subOptionList.size());
        assertEquals("2열 통풍 시트", subOptionList.get(0).getOptionName());
        assertEquals("/images/options/sub/2seats.jpg", subOptionList.get(0).getOptionImage());
        assertEquals(100000, subOptionList.get(0).getOptionPrice());
        assertEquals("상세품목", subOptionList.get(0).getOptionCategoryName());
    }

    @Test
    @DisplayName("/api/options/sub/detail?carid=1&optionid=1 통합테스트")
    void getOptionDetail() {
        OptionDetailDto subOptionDetail = optionController.getSubOptionDetail(1, 1);
        assertEquals("2열 통풍 시트", subOptionDetail.getOptionName());
        assertEquals("시동이 걸린 상태에서 해당 좌석의 통풍 스위치를 누르면 표시등이 켜지면서 해당 좌석에 바람이 나오는 편의장치입니다.", subOptionDetail.getOptionDescription());

        OptionDetailDto subOptionDto = optionController.getSubOptionDetail(1, 69);
        assertEquals("컴포트2", subOptionDto.getOptionName());

        List<OptionDetailDto> subOptionList = subOptionDto.getSubOptionList();
        assertEquals(2, subOptionList.size());
    }

    @Test
    @DisplayName("/api/options/default/detail?carid=1&optionid=1 통합테스트")
    void getDataAndImage() {
        OptionDetailDto defaultOptionDetail = optionController.getDefaultOptionDetail(1, 1);
        assertEquals("상세품목", defaultOptionDetail.getCategoryName());
        assertEquals("2열 통풍 시트", defaultOptionDetail.getOptionName());
        assertEquals("시동이 걸린 상태에서 해당 좌석의 통풍 스위치를 누르면 표시등이 켜지면서 해당 좌석에 바람이 나오는 편의장치입니다.", defaultOptionDetail.getOptionDescription());
        assertFalse(defaultOptionDetail.isPackage());
        assertThrows(EmptyDataException.class, () -> {
            optionController.getDefaultOptionDetail(2, 1);
        });

        OptionHmgDataVo hmgData = defaultOptionDetail.getHmgData();
        assertEquals(38.0, hmgData.getOptionUsedCount());
    }

    @Test
    @DisplayName("/api/options/defaultlist?carid=1 통합테스트")
    void getOptionAndData(){
        List<DefaultOptionDto> defaultOptionList = optionController.getDefaultOptionList(1);
        assertEquals(3, defaultOptionList.size());

        DefaultOptionDto defaultOptionDto = defaultOptionList.get(1);
        assertEquals("적외선 무릎 워머", defaultOptionDto.getOptionName());
        assertEquals("악세사리", defaultOptionDto.getOptionCategoryName());
    }
}
