성package autoever2.cartag.repository.model;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class ModelRepository {

    private final JdbcTemplate template;

    public ModelRepository(DataSource dataSource) {
        this.template = new JdbcTemplate(dataSource);
    }

    public List<ModelTypeMappedDto> findAllModelTypeData(int carId) {
        String sql = "select m.model_id, m.model_name, t.model_type_name, m.model_price, mm.model_bought_count, mm.default_option " +
                "from modelcarmapper mm " +
                "inner join model m " +
                "on mm.model_id = m.model_id " +
                "inner join modeltype t " +
                "on m.model_type_id = t.model_type_id " +
                "where mm.car_id = ?";

        List<ModelTypeMappedDto> result = template.query(sql, modelRowMapper(), carId);
        return result;
    }

    private RowMapper<ModelTypeMappedDto> modelRowMapper() {
        return ((rs, rowNum) ->
            ModelTypeMappedDto.builder()
                    .modelId(rs.getInt("model_id"))
                    .modelName(rs.getString("model_name"))
                    .modelTypeName(rs.getString("model_type_name"))
                    .modelBoughtCount(rs.getLong("model_bought_count"))
                    .modelPrice(rs.getLong("model_price"))
                    .isDefaultOption(rs.getBoolean("default_option"))
                    .build()
        );
    }

    public Long findCarBoughtCountByCarId(int carId) {
        String sql = "select bought_count from car where car_id = ?";

        return template.queryForObject(sql, Long.class, carId);
    }
}
