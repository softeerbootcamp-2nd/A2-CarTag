package autoever2.cartag.service;

import autoever2.cartag.domain.color.OuterColorDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ColorServiceTest {
    @Autowired
    private ColorService service;
    @Test
    @DisplayName("car_id 값에 따른 적절한 외장 색상을 반환합니다.")
    void checkFunction(){
        List<OuterColorDto> outerColors = service.findOuterColorByCarId(1);
        Assertions.assertThat(outerColors.size()).isEqualTo(4);
    }

}