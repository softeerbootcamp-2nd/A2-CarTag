package autoever2.cartag.repository;

import autoever2.cartag.domain.car.CarInfoDto;
import autoever2.cartag.domain.car.CarPriceDto;
import autoever2.cartag.domain.car.CarTypeDto;
import autoever2.cartag.domain.car.TrimInfoDto;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import javax.swing.text.html.Option;
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
        return template.query(sql, param, carRowMapper());

    }

    private RowMapper<CarInfoDto> carRowMapper() {
        return BeanPropertyRowMapper.newInstance(CarInfoDto.class);
    }

    public Optional<Long> findCarBoughtCountByCarId(int carId) {
        String sql = "select bought_count from Car where car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, (rs, rowNum) -> rs.getLong("bought_count"))));
    }

    public Optional<TrimInfoDto> findTrimInfoByCarId(int carId){
        String sql = "select car_id, trim, car_default_price from Car where car_id = :carId";
        try {
            SqlParameterSource param = new MapSqlParameterSource()
                    .addValue("carId", carId);
            return Optional.of(template.queryForObject(sql, param, trimInfoRowMapper()));
        } catch (DataAccessException e) {
            return Optional.empty();
        }
    }

    private RowMapper<TrimInfoDto> trimInfoRowMapper() {
        return BeanPropertyRowMapper.newInstance(TrimInfoDto.class);
    }

    public List<CarPriceDto> findCarPriceAndCount() {
        String sql = "select SalesHistory.sold_options_id, (car_default_price + sum(model_price)) as sum from Model inner join HistoryModelMapper " +
                "on Model.model_id = HistoryModelMapper.model_id inner join SalesHistory " +
                "on SalesHistory.history_id = HistoryModelMapper.history_id inner join Car " +
                "on Car.car_id = SalesHistory.car_id inner join SubOptionData " +
                "on SubOptionData.car_id = Car.car_id group by SalesHistory.history_id";

        return template.query(sql, carPriceRowMapper());
    }

    public List<CarTypeDto> findAllCarType() {
        String sql = "select ct.car_type_id, ct.car_type_name, ct.car_type_image " +
                "from CarType ct ";

        return template.query(sql, carTypeDtoRowMapper());
    }

    private RowMapper<CarTypeDto> carTypeDtoRowMapper() {
        return BeanPropertyRowMapper.newInstance(CarTypeDto.class);
    }

    private RowMapper<CarPriceDto> carPriceRowMapper() {
        return (rs, rowNum) -> CarPriceDto
                .builder()
                .optionList(rs.getString("SalesHistory.sold_options_id"))
                .price(rs.getLong("sum"))
                .build();
    }

}
