package autoever2.cartag.repository;

import autoever2.cartag.domain.suboption.SubOptionMappedDto;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class SubOptionRepository {

    private final NamedParameterJdbcTemplate template;

    public SubOptionRepository(DataSource dataSource) {
        this.template = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<SubOptionMappedDto> findAllSubOptionWithCategoryNameByCarId(int carId) {
        String sql = "select o.sub_option_id, o.option_name, oc.option_category_name, o.option_image, ob.option_bought_count, ob.option_used_count, ob.option_price " +
                "from suboptiondata ob " +
                "inner join suboption o " +
                "on o.sub_option_id = ob.sub_option_id " +
                "inner join optioncategory oc " +
                "on oc.option_category_id = o.category_id " +
                "where ob.car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return template.query(sql, param, subOptionMapper());
    }

    private RowMapper<SubOptionMappedDto> subOptionMapper() {
        return BeanPropertyRowMapper.newInstance(SubOptionMappedDto.class);
    }

    public List<String> findAllHashtagNameBySubOptionId(int subOptionId) {
        String sql = "select h.hashtag_name " +
                "from optionhashtag oh, hashtag h " +
                "where oh.hashtag_id = h.hashtag_id and oh.sub_option_id = :subOptionId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("subOptionId", subOptionId);

        return template.queryForList(sql, param, String.class);
    }
}
