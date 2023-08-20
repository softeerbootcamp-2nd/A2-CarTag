package autoever2.cartag.repository;

import autoever2.cartag.domain.model.*;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;
import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

@Repository
public class ModelRepository {

    private final NamedParameterJdbcTemplate template;

    public ModelRepository(DataSource dataSource) {
        this.template = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<ModelShortMappedDto> findAllModelTypeData(int carId) {
        String sql = "select m.model_id, m.model_name, t.model_type_id, t.model_type_name, m.model_price, mm.model_bought_count, mm.is_default_model, pd.max_ps, pd.max_kgfm " +
                "from ModelCarMapper mm " +
                "inner join Model m " +
                "on mm.model_id = m.model_id " +
                "inner join ModelType t " +
                "on m.model_type_id = t.model_type_id " +
                "left join PowerTrainData pd " +
                "on pd.power_train_id = m.model_id " +
                "where mm.car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return template.query(sql, param, modelShortRowMapper());
    }

    public List<ModelDefaultDto> findModelDefaultDtoByCarId(int carId) {
        String sql = "select model_id, model_name, model_price, model_image from ModelCarMapper as mcm " +
                "inner join Model as m on mcm.model_id = m.model_id where car_id = :carId and is_default_model = 1";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return template.query(sql, param, ModelDefaultRowMapper());
    }

    public Optional<ModelDetailMappedDto> findModelDetailData(int modelId) {
        String sql = "select mt.model_type_name, m.model_name, m.option_description, m.model_image " +
                "from Model m " +
                "inner join ModelType mt " +
                "on m.model_type_id = mt.model_type_id " +
                "where m.model_id = :modelId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("modelId", modelId);

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, modelDetailRowMapper())));
    }

    public Optional<ModelEfficiencyDataDto> findEfficiencyData(int powerTrainId, int operationId) {
        String sql = "select average_fuel, displacement " +
                "from PowerTrainOperationEfficiency " +
                "where power_train_id = :powerTrainId and operation_id = :operationId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("powerTrainId", powerTrainId)
                .addValue("operationId", operationId);

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, efficiencyMapper())));
    }


    private RowMapper<ModelEfficiencyDataDto> efficiencyMapper() {
        return BeanPropertyRowMapper.newInstance(ModelEfficiencyDataDto.class);
    }

    private RowMapper<ModelDetailMappedDto> modelDetailRowMapper() {
        return BeanPropertyRowMapper.newInstance(ModelDetailMappedDto.class);
    }

    private RowMapper<ModelShortMappedDto> modelShortRowMapper() {
        return BeanPropertyRowMapper.newInstance(ModelShortMappedDto.class);
    }

    private RowMapper<ModelDefaultDto> ModelDefaultRowMapper() {
        return BeanPropertyRowMapper.newInstance(ModelDefaultDto.class);
    }


}
