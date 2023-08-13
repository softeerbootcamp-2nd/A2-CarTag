package autoever2.cartag.repository;

import autoever2.cartag.domain.car.CarInfoDto;
import autoever2.cartag.domain.car.DefaultOptionDto;
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
public class CarRepository {
    private final NamedParameterJdbcTemplate template;

    public CarRepository(DataSource dataSource) {
        template = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<CarInfoDto> findCarByCarType(int carType) {
        String sql = "select car_id, trim, car_default_price, outer_image, inner_image, wheel_image, " +
                "car_description from Car where car_type_id = :carType";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carType", carType);
        return template.query(sql, param, CarRowMapper());

    }

    private RowMapper<CarInfoDto> CarRowMapper() {
        return BeanPropertyRowMapper.newInstance(CarInfoDto.class);
    }

    public Optional<Long> findCarBoughtCountByCarId(int carId) {
        String sql = "select bought_count from car where car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, (rs, rowNum) -> rs.getLong("bought_count"))));
    }
}
