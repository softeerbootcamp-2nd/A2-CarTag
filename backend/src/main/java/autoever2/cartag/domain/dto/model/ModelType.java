package autoever2.cartag.domain.dto.model;

import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("ModelType")
public class ModelType {

    @Id
    private int modelTypeId;
    private String modelTypeName;
}
