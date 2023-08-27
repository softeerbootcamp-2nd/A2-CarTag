package autoever2.cartag.quotes;

import autoever2.cartag.cars.dto.CarDefaultDto;
import autoever2.cartag.cars.dto.TrimDataDto;
import autoever2.cartag.colors.dto.ColorDto;
import autoever2.cartag.models.dto.ModelDefaultDto;
import autoever2.cartag.quotes.dtos.BoughtCarDto;
import autoever2.cartag.quotes.dtos.QuoteRequestDto;
import autoever2.cartag.quotes.dtos.QuoteInfoDto;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import autoever2.cartag.cars.CarController;
import autoever2.cartag.options.dto.QuoteSubOptionDto;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@DisplayName("Integration: Quote")
@ExtendWith(SoftAssertionsExtension.class)
public class QuoteTest {

    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    @Autowired
    QuoteController quoteController;

    @Autowired
    CarController carController;

    @Test
    @DisplayName("/api/quote/bought/infos?carid=1 통합테스트")
    @Sql({"classpath:insert/insert-carinfo-h2.sql"})
    void testBoughtInfo(){
        List<BoughtCarDto> expected = List.of(
                BoughtCarDto.builder()
                        .totalPrice(40000000L)
                        .count(150)
                        .build(),
                BoughtCarDto.builder()
                        .totalPrice(41000000L)
                        .count(162)
                        .build(),
                BoughtCarDto.builder()
                        .totalPrice(42000000L)
                        .count(335)
                        .build(),
                BoughtCarDto.builder()
                        .totalPrice(43000000L)
                        .count(180)
                        .build(),
                BoughtCarDto.builder()
                        .totalPrice(44000000L)
                        .count(77)
                        .build()
        );

        softAssertions.assertThat(quoteController.getAllHistorySum(1)).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("/api/quote/infos/shares 통합테스트")
    @Sql({"classpath:insert/insert-quote-h2.sql"})
    void testShare() {
        QuoteRequestDto quoteIdList = QuoteRequestDto
                .builder()
                .carId(1)
                .powerTrainId(1)
                .operationId(3)
                .bodyTypeId(5)
                .innerColorId(1)
                .outerColorId(4)
                .optionIdList(List.of(1, 2))
                .build();

        QuoteInfoDto expected = QuoteInfoDto.builder()
                .trimData(TrimDataDto.builder()
                        .carId(1)
                        .trim("르블랑")
                        .carDefaultPrice(41980000)
                        .build())
                .powertrainData(ModelDefaultDto.builder()
                        .modelId(1)
                        .modelName("디젤2.2")
                        .modelPrice(1480000L)
                        .modelImage("/model/diesel2-2.jpg")
                        .modelTypeName("파워트레인")
                        .build())
                .operationData(ModelDefaultDto.builder()
                        .modelId(3)
                        .modelName("2WD")
                        .modelPrice(0L)
                        .modelTypeName("구동방식")
                        .modelImage("/model/2wd.png")
                        .build())
                .bodyTypeData(ModelDefaultDto.builder()
                        .modelId(5)
                        .modelName("7인승")
                        .modelPrice(0L)
                        .modelTypeName("바디타입")
                        .modelImage("/model/7seats.jpg")
                        .build())
                .innerColor(ColorDto.builder()
                        .colorId(1)
                        .colorName("천연 퀄팅(블랙)")
                        .colorImage("image_1")
                        .colorCarImage("red_image.jpg")
                        .colorType("내장 색상")
                        .colorPrice(1234L)
                        .colorBoughtCount(12348L)
                        .build())
                .outerColor(ColorDto.builder()
                        .colorId(4)
                        .colorName("코발트 블루")
                        .colorImage("image_4")
                        .colorType("외장 색상")
                        .colorCarImage("blue_image_1.jpg")
                        .colorPrice(1734L)
                        .colorBoughtCount(1234L)
                        .build())
                .optionList(List.of(QuoteSubOptionDto.builder()
                        .optionId(1)
                        .optionName("2열 통풍 시트")
                        .optionPrice(100000L)
                        .optionTitle("상세품목")
                        .optionImage("/images/options/sub/2seats.jpg")
                        .build(), QuoteSubOptionDto.builder()
                        .optionId(2)
                        .optionName("적외선 무릎 워머")
                        .optionPrice(130000L)
                        .optionTitle("악세사리")
                        .optionImage("/images/options/sub/warmer.jpg")
                        .build()))
                .build();

        QuoteInfoDto quoteInfoDto = quoteController.getQuoteDetail(quoteIdList);

        softAssertions.assertThat(quoteInfoDto).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @DisplayName("/api/cars/infos/defaults?carid=1 통합테스트")
    @Sql(scripts = {"classpath:/insert/insert-default-h2.sql"})
    void defaultCarInfos(){
        CarDefaultDto carDefaultDto = carController.carDefaultDto(1);
        assertEquals("디젤2.2", carDefaultDto.getPowerTrainName());
        assertEquals("7인승", carDefaultDto.getBodyTypeName());
        assertEquals(0, carDefaultDto.getOperationPrice());
        assertEquals("천연 퀄팅(블랙)", carDefaultDto.getColorOuterImageName());
        assertEquals("퍼플 그레이 펄", carDefaultDto.getColorInnerImageName());
    }
}
