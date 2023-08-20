package autoever2.cartag.controller;

import autoever2.cartag.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendService recommendService;

    @PostMapping("/list")
    public String getRecommendedList() {
        return recommendService.getList();
    }
}
