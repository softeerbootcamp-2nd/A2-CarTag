package autoever2.cartag.repository;

import autoever2.cartag.domain.entity.color.Color;
import autoever2.cartag.domain.entity.color.ColorCarMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

@Repository
public class ColorRepository {
    private final NamedParameterJdbcTemplate template;

    public ColorRepository(DataSource dataSource) {
        template = new NamedParameterJdbcTemplate(dataSource);
    }

    public Optional<List<ColorCarMapper>> findOuterColorCarByCarId(int carId) {
        String sql = "select * from ColorCarMapper as cm inner join Color as c " +
                "on cm.color_id = c.color_id where car_id = :carId and c.is_outer_color = 1";
        try {
            SqlParameterSource param = new MapSqlParameterSource()
                    .addValue("carId", carId);
            List<ColorCarMapper> findColorCars = template.query(sql, param, ColorCarRowMapper());
            return Optional.of(findColorCars);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<List<ColorCarMapper>> findInnerColorCarByCarId(int carId) {
        String sql = "select * from ColorCarMapper as cm inner join Color as c " +
                "on cm.color_id = c.color_id where car_id = :carId and c.is_outer_color = 0";
        try {
            SqlParameterSource param = new MapSqlParameterSource()
                    .addValue("carId", carId);
            List<ColorCarMapper> findColorCars = template.query(sql, param, ColorCarRowMapper());
            return Optional.of(findColorCars);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<Color> findColorByColorId(int colorId) {
        String sql = "select * from Color where color_id = :colorId";
        try {
            SqlParameterSource param = new MapSqlParameterSource()
                    .addValue("colorId", colorId);
            Color findColor = template.queryForObject(sql, param, ColorRowMapper());
            return Optional.of(findColor);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    private RowMapper<ColorCarMapper> ColorCarRowMapper() {
        return (rs, rowNum) -> ColorCarMapper
                .builder()
                .colorCarMapperId(rs.getInt("color_car_mapper_id"))
                .carId(rs.getInt("car_id"))
                .colorId(rs.getInt("color_id"))
                .colorCarImage(rs.getString("color_car_image"))
                .colorPrice(rs.getLong("color_price"))
                .colorBoughtCount(rs.getLong("color_bought_count"))
                .build();
    }

    private RowMapper<Color> ColorRowMapper() {
        return (rs, rowNum) -> Color
                .builder()
                .colorId(rs.getInt("color_id"))
                .colorName(rs.getString("color_name"))
                .colorImage(rs.getString("color_image"))
                .isOuterColor(rs.getInt("is_outer_color"))
                .build();
    }
}
