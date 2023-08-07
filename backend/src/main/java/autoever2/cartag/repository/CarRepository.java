package autoever2.cartag.repository;

import autoever2.cartag.domain.dto.car.DefaultOptionDto;
import autoever2.cartag.domain.entity.car.Car;
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
public class CarRepository {
    private final NamedParameterJdbcTemplate template;

    public CarRepository(DataSource dataSource) {
        template = new NamedParameterJdbcTemplate(dataSource);
    }

    public Optional<List<Car>> findCarByCarType(int carType) {
        String sql = "select * from Car where car_type = :carType";
        try {
            SqlParameterSource param = new MapSqlParameterSource()
                    .addValue("carType", carType);
            return Optional.of(template.query(sql, param, CarRowMapper()));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<List<DefaultOptionDto>> findDefaultOptionByCarId(int carId) {
        String sql = "select * from DefaultOptionData as data " +
                "inner join DefaultOption as options on data.default_option_id = options.default_option_id " +
                "where data.car_id = :carId";
        try {
            SqlParameterSource param = new MapSqlParameterSource()
                    .addValue("carId", carId);
            return Optional.of(template.query(sql, param, OptionRowMapper()));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    private RowMapper<DefaultOptionDto> OptionRowMapper() {
        return (rs, rowNum) -> DefaultOptionDto
                .builder()
                .optionName(rs.getString("option_name"))
                .optionImage(rs.getString("option_image"))
                .optionDescription(rs.getString("option_description"))
                .defaultOptionCount(rs.getInt("default_option_count"))
                .build();
    }

    private RowMapper<Car> CarRowMapper() {
        return (rs, rowNum) ->
            Car.builder()
                    .carDescription(rs.getString("car_description"))
                    .carId(rs.getInt("car_id"))
                    .carTypeId(rs.getInt("car_type_id"))
                    .trim(rs.getString("trim"))
                    .innerImage(rs.getString("inner_image"))
                    .outerImage(rs.getString("outer_image"))
                    .wheelImage(rs.getString("wheel_image"))
                    .boughtCount(rs.getLong("bought_count"))
                    .carDefaultPrice(rs.getInt("car_default_price"))
                    .build();
    }
}
