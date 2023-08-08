package autoever2.cartag.repository;

import autoever2.cartag.domain.color.InnerColorDto;
import autoever2.cartag.domain.color.OuterColorDto;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class ColorRepository {
    private final NamedParameterJdbcTemplate template;

    public ColorRepository(DataSource dataSource) {
        template = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<InnerColorDto> findInnerColorCarByCarId(int carId) {
        String sql = "select color_name, color_image, color_price, color_bought_count, " +
                "color_car_image from ColorCarMapper as cm inner join Color as c " +
                "on cm.color_id = c.color_id where car_id = :carId and c.is_outer_color = 0";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);
        return template.query(sql, param, InnerColorCarMapper());

    }

    public List<OuterColorDto> findOuterColorCarByCarId(int carId) {
        String sql = "select color_name, color_image, color_price, color_bought_count, " +
                "color_car_image from ColorCarMapper as cm inner join Color as c " +
                "on cm.color_id = c.color_id where car_id = :carId and c.is_outer_color = 1";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);
        return template.query(sql, param, OuterColorCarMapper());
    }

    private RowMapper<OuterColorDto> OuterColorCarMapper() {
        return BeanPropertyRowMapper.newInstance(OuterColorDto.class);
    }

    private RowMapper<InnerColorDto> InnerColorCarMapper() {
        return BeanPropertyRowMapper.newInstance(InnerColorDto.class);
    }
}
