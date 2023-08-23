package autoever2.cartag.models.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PowerTrainDataDto {

    private String maxPs;
    private String maxKgfm;
    private Double ratioPs;
    private Double ratioKgfm;

    @Builder
    public PowerTrainDataDto(String maxPs, String maxKgfm, Double ratioPs, Double ratioKgfm) {
        this.maxPs = maxPs;
        this.maxKgfm = maxKgfm;
        this.ratioPs = ratioPs;
        this.ratioKgfm = ratioKgfm;
    }
}
