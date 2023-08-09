package autoever2.cartag.service;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.repository.ColorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ColorServiceTest {

    @InjectMocks
    private ColorService service;

    @Mock
    private ColorRepository repository;

    private List<InnerColorDto> innerColors;

    private List<OuterColorDto> outerColors;

    @BeforeEach
    void setUp() {

        outerColors = new ArrayList<>();
        outerColors.add(OuterColorDto.builder()
                .colorName("어비스 블랙펄")
                .colorImage("color_image_1")
                .colorPrice(100000L)
                .colorBoughtCount(212312L)
                .colorCarImage("car_image_1")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("그라 파이트 그레이")
                .colorImage("color_image_2")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_2")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("쉬머링 실버 메탈릭")
                .colorImage("color_image_3")
                .colorPrice(1234440L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_3")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("크리미 화이트 펄")
                .colorImage("color_image_4")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_4")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("퍼플 펄")
                .colorImage("color_image_5")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_5")
                .build());

        innerColors = new ArrayList<>();
        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(블랙)")
                .colorImage("color_image_1")
                .colorPrice(100000L)
                .colorBoughtCount(212312L)
                .colorCarImage("car_image_1")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(그레이)")
                .colorImage("color_image_2")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_2")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(메탈릭)")
                .colorImage("color_image_3")
                .colorPrice(1234440L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_3")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(화이트)")
                .colorImage("color_image_4")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_4")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(퍼플)")
                .colorImage("color_image_5")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_5")
                .build());
    }

    @Test
    @DisplayName("트림의 모델 리스트 반환")
    void getModelTypeData() {
        //given
        int carId = 1;

        when(repository.findInnerColorCarByCarId(carId)).thenReturn(innerColors);
        when(repository.findOuterColorCarByCarId(carId)).thenReturn(outerColors);

        //when
        List<OuterColorDto> result_outer = service.findOuterColorByCarId(carId);
        List<InnerColorDto> result_inner = service.findInnerColorByCarId(carId);

        //then
        assertEquals(result_outer.size(), 5);
        assertEquals(result_inner.size(), 5);
    }

}