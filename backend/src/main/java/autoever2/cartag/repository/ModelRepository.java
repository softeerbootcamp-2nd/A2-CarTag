package autoever2.cartag.repository;

import autoever2.cartag.domain.model.ModelTypeMappedDto;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class ModelRepository {

    private final NamedParameterJdbcTemplate template;

    public ModelRepository(DataSource dataSource) {
        this.template = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<ModelTypeMappedDto> findAllModelTypeData(int carId) {
        String sql = "select m.model_id, m.model_name, t.model_type_name, m.model_price, mm.model_bought_count, mm.is_default_option " +
                "from modelcarmapper mm " +
                "inner join model m " +
                "on mm.model_id = m.model_id " +
                "inner join modeltype t " +
                "on m.model_type_id = t.model_type_id " +
                "where mm.car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return template.query(sql, param, modelRowMapper());
    }

    private RowMapper<ModelTypeMappedDto> modelRowMapper() {
        return BeanPropertyRowMapper.newInstance(ModelTypeMappedDto.class);
    }
}
