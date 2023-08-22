package autoever2.cartag.cars;

import autoever2.cartag.cars.dto.CarInfoDto;
import autoever2.cartag.cars.dto.CarTypeDto;
import autoever2.cartag.cars.dto.TrimInfoDto;
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

    public Optional<Integer> findCarPriceByCarId(int carId) {
        String sql = "select car_default_price " +
                "from Car " +
                "where car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, intMapper())));
    }

    public List<CarInfoDto> findCarByCarType(int carType) {
        String sql = "select car_id, trim, car_default_price, outer_image, inner_image, wheel_image, car_description " +
                "from Car " +
                "where car_type_id = :carType";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carType", carType);

        return template.query(sql, param, carRowMapper());
    }

    public Optional<Long> findCarBoughtCountByCarId(int carId) {
        String sql = "select bought_count " +
                "from Car " +
                "where car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, longMapper())));
    }

    public Optional<TrimInfoDto> findTrimInfoByCarId(int carId){
        String sql = "select car_id, trim, car_default_price " +
                "from Car " +
                "where car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, trimInfoRowMapper())));
    }

    public List<CarTypeDto> findAllCarType() {
        String sql = "select car_type_id, car_type_name, car_type_image " +
                "from CarType";

        return template.query(sql, carTypeDtoRowMapper());
    }

    private RowMapper<CarTypeDto> carTypeDtoRowMapper() {
        return BeanPropertyRowMapper.newInstance(CarTypeDto.class);
    }

    private RowMapper<CarInfoDto> carRowMapper() {
        return BeanPropertyRowMapper.newInstance(CarInfoDto.class);
    }

    private RowMapper<Long> longMapper() {
        return (rs, rowNum) -> rs.getLong("bought_count");
    }

    private RowMapper<Integer> intMapper() {
        return (rs, rowNum) -> rs.getInt("car_default_price");
    }

    private RowMapper<TrimInfoDto> trimInfoRowMapper() {
        return BeanPropertyRowMapper.newInstance(TrimInfoDto.class);
    }

}
