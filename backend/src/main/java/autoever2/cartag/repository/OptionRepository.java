package autoever2.cartag.repository;

import autoever2.cartag.domain.car.TrimDefaultOptionDto;
import autoever2.cartag.domain.option.OptionDetailMappedDto;
import autoever2.cartag.domain.option.OptionShortMappedDto;
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
public class OptionRepository {

    private final NamedParameterJdbcTemplate template;

    public OptionRepository(DataSource dataSource) {
        this.template = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<OptionShortMappedDto> findOptionList(int carId, boolean isDefault) {
        StringBuilder query = new StringBuilder();
        query.append("select o.option_id, o.option_name, oc.option_category_name, o.option_image, o.option_used_count ");

        if(!isDefault) {
            query.append(", od.option_bought_count, od.option_price from subOptionData od ");
        }
        if(isDefault) {
            query.append("from defaultOptionData od ");
        }

        query.append("inner join Caroption o ")
                .append("on o.option_id = od.option_id ").append("inner join optioncategory oc ")
                .append("on oc.option_category_id = o.option_category_id ").append("where od.car_id = :carId");

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return template.query(query.toString(), param, optionShortMapper());
    }

    private RowMapper<OptionShortMappedDto> optionShortMapper() {
        return BeanPropertyRowMapper.newInstance(OptionShortMappedDto.class);
    }

    public List<String> findAllHashtagNameBySubOptionId(int subOptionId) {
        String sql = "select h.hashtag_name " +
                "from optionhashtag oh, hashtag h " +
                "where oh.hashtag_id = h.hashtag_id and oh.option_id = :subOptionId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("subOptionId", subOptionId);

        return template.queryForList(sql, param, String.class);
    }

    public List<TrimDefaultOptionDto> findDefaultOptionByCarId(int carId) {
        String sql = "select option_name, option_image, option_description, option_used_count " +
                "from DefaultOptionData as data " +
                "inner join Caroption on data.option_id = caroption.option_id " +
                "where data.car_id = :carId order by option_used_count desc limit 3";
        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);
        return template.query(sql, param, defaultOptionRowMapper());

    }


    private RowMapper<TrimDefaultOptionDto> defaultOptionRowMapper() {
        return BeanPropertyRowMapper.newInstance(TrimDefaultOptionDto.class);
    }

    public Optional<OptionDetailMappedDto> findOptionDetail(int carId, int optionId, boolean isDefault) {
        StringBuilder query = new StringBuilder();
        query.append("select oc.option_category_name as category_name, o.option_name, o.option_description, o.option_image, o.option_used_count ");

        if(isDefault) {
            query.append("from defaultOptionData od ");
        }

        if(!isDefault) {
            query.append(", od.option_bought_count from subOptionData od ");
        }

        query.append("inner join CarOption o ").append("on od.option_id = o.option_id ")
                .append("inner join optionCategory oc ")
                .append("on oc.option_category_id = o.option_category_id ")
                .append("where od.car_id = :carId and od.option_id = :optionId");

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId)
                .addValue("optionId", optionId);

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(query.toString(), param, optionDetailRowMapper())));
    }

    private RowMapper<OptionDetailMappedDto> optionDetailRowMapper() {
        return BeanPropertyRowMapper.newInstance(OptionDetailMappedDto.class);
    }

    public List<OptionDetailMappedDto> findPackageSubOptions(int optionId) {
        String sql = "select oc.option_category_name as category_name, o.option_name, o.option_description, o.option_image, o.option_used_count " +
                "from subOptionPackage sp " +
                "left join caroption o " +
                "on sp.option_id = o.option_id " +
                "inner join optionCategory oc " +
                "on o.option_category_id = oc.option_category_id " +
                "where sp.package_id = :packageId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("packageId", optionId);

        return template.query(sql, param, optionDetailRowMapper());
    }
}
