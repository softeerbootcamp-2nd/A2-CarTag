package autoever2.cartag.service;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.InnerColorPercentDto;
import autoever2.cartag.domain.color.OuterColorDto;
import autoever2.cartag.domain.color.OuterColorPercentDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import autoever2.cartag.repository.CarRepository;
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
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ColorServiceTest {

    @InjectMocks
    private ColorService service;
    @Mock
    private ColorRepository colorRepository;
    @Mock
    private CarRepository carRepository;
    private List<String> images = new ArrayList<>();
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
                .colorCarImage("car_image_*.jpg")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("그라 파이트 그레이")
                .colorImage("color_image_2")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_*.jpg")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("쉬머링 실버 메탈릭")
                .colorImage("color_image_3")
                .colorPrice(1234440L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_*.jpg")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("크리미 화이트 펄")
                .colorImage("color_image_4")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_*.jpg")
                .build());

        outerColors.add(OuterColorDto.builder()
                .colorName("퍼플 펄")
                .colorImage("color_image_5")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_*.jpg")
                .build());

        innerColors = new ArrayList<>();
        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(블랙)")
                .colorImage("color_image_1")
                .colorPrice(100000L)
                .colorBoughtCount(212312L)
                .colorCarImage("car_image_*.jpg")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(그레이)")
                .colorImage("color_image_2")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_*.jpg")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(메탈릭)")
                .colorImage("color_image_3")
                .colorPrice(1234440L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_*.jpg")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(화이트)")
                .colorImage("color_image_4")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_*.jpg")
                .build());

        innerColors.add(InnerColorDto.builder()
                .colorName("퀄팅 천연(퍼플)")
                .colorImage("color_image_5")
                .colorPrice(100000L)
                .colorBoughtCount(203L)
                .colorCarImage("car_image_*.jpg")
                .build());

        for (int i = 1; i <= 60; i++) {
            images.add("car_image_" + i + ".jpg");
        }
    }

    @Test
    @DisplayName("차량의 외장/내장 색상 리스트 반환")
    void getModelTypeData() {
        //given
        int carId = 1;
        int colorId = 1;

        when(colorRepository.findInnerColorCarByCarId(carId)).thenReturn(innerColors);
        when(colorRepository.findOuterColorCarByCarId(carId)).thenReturn(outerColors);
        when(colorRepository.findOuterColorImagesByColorId(colorId)).thenReturn(Optional.of("red_image_*.jpg"));
        when(carRepository.findCarBoughtCountByCarId(carId)).thenReturn(Optional.of(10000L));
        when(colorRepository.findOuterColorImagesByColorId(2)).thenThrow(new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND));
        when(colorRepository.findOuterColorCarByCarId(2)).thenThrow(new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND));
        when(colorRepository.findInnerColorCarByCarId(2)).thenThrow(new EmptyDataException(ErrorCode.RESOURCE_NOT_FOUND));

        //when

        List<OuterColorPercentDto> result_outer = service.findOuterColorByCarId(carId);
        List<InnerColorPercentDto> result_inner = service.findInnerColorByCarId(carId);
        List<String> imageFiles = service.changeImageToImages(colorId);

        //then
        assertEquals(5, result_outer.size());
        assertEquals(5, result_inner.size());
        assertEquals(60, imageFiles.size());
        assertEquals(2, result_inner.get(4).getColorBoughtPercent());
        assertEquals("어비스 블랙펄", result_outer.get(0).getColorName());
        assertEquals(100000L, result_inner.get(0).getColorPrice());
        assertEquals(2, result_inner.get(1).getColorBoughtPercent());
        assertThatThrownBy(() -> service.changeImageToImages(2)).isInstanceOf(EmptyDataException.class);
        assertThatThrownBy(() -> service.findInnerColorByCarId(2)).isInstanceOf(EmptyDataException.class);
        assertThatThrownBy(() -> service.findOuterColorByCarId(2)).isInstanceOf(EmptyDataException.class);
    }

}