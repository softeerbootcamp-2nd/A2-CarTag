package autoever2.cartag.domain.dto.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("Model")
public class Model {

    @Id
    private int modelId;
    private String modelName;

    @JsonBackReference
    private int modelTypeId;
    private String description;
    private Long modelPrice;
    private String modelImage;
}
