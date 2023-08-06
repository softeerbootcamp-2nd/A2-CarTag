package autoever2.cartag.domain.dto.model;

import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("ModelCarMapper")
public class ModelCarMapper {

    @Id
    private int modelCarMapperId;
    private int carId;
    private int modelId;
    private Long modelBoughtCount;
    private boolean isDefaultOption;
}
