package autoever2.cartag.controller;

import autoever2.cartag.domain.dto.model.ModelShortDataDTO;
import autoever2.cartag.service.ModelService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/modeltype")
@Tag(name = "트림의 모델 타입", description = "트림의 모델 타입 호출 관련 API")
public class ModelController {

    private final ModelService modelTypeService;

    @GetMapping("/getmodeltype")
    public List<ModelShortDataDTO> getTrimModelType(@RequestParam("carid") int carId) {
        return modelTypeService.getModelTypeData(carId);
    }
}
