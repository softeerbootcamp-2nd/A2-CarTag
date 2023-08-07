package autoever2.cartag.repository;

import autoever2.cartag.domain.dto.car.CarInfoDto;
import autoever2.cartag.domain.dto.car.DefaultOptionDto;
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
public class CarRepository {
    private final NamedParameterJdbcTemplate template;

    public CarRepository(DataSource dataSource) {
        template = new NamedParameterJdbcTemplate(dataSource);
    }

    public Optional<List<CarInfoDto>> findCarByCarType(int carType) {
        String sql = "select car_id, trim, car_default_price, outer_image, inner_image, wheel_image " +
                "car_description from Car where car_type = :carType";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carType", carType);
        return Optional.ofNullable(template.query(sql, param, CarRowMapper()));

    }

    public Optional<List<DefaultOptionDto>> findDefaultOptionByCarId(int carId) {
        String sql = "select option_name, option_image, option_description, default_option_count " +
                "from DefaultOptionData as data " +
                "inner join DefaultOption as options on data.default_option_id = options.default_option_id " +
                "where data.car_id = :carId";
        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);
        return Optional.ofNullable(template.query(sql, param, OptionRowMapper()));

    }

    private RowMapper<DefaultOptionDto> OptionRowMapper() {
        return BeanPropertyRowMapper.newInstance(DefaultOptionDto.class);
    }

    private RowMapper<CarInfoDto> CarRowMapper() {
        return BeanPropertyRowMapper.newInstance(CarInfoDto.class);
    }
}
