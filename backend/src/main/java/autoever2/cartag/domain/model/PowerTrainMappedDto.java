package autoever2.cartag.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
public class PowerTrainMappedDto {

    private String maxPs;
    private String maxKgfm;

    @Builder
    public PowerTrainMappedDto(String maxPs, String maxKgfm) {
        this.maxPs = maxPs;
        this.maxKgfm = maxKgfm;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PowerTrainMappedDto that = (PowerTrainMappedDto) o;
        return Objects.equals(maxPs, that.maxPs) && Objects.equals(maxKgfm, that.maxKgfm);
    }
}
