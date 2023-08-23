package autoever2.cartag.repository;

import autoever2.cartag.domain.option.TrimDefaultOptionDto;
import autoever2.cartag.domain.option.OptionDetailMappedDto;
import autoever2.cartag.domain.option.OptionShortMappedDto;
import autoever2.cartag.domain.option.QuoteSubOptionDto;
import autoever2.cartag.domain.option.SubOptionIdAndPriceDto;
import org.springframework.dao.DataAccessException;
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

        if (!isDefault) {
            query.append(", od.option_bought_count, od.option_price from SubOptionData od ");
        }
        if (isDefault) {
            query.append("from DefaultOptionData od ");
        }

        query.append("inner join CarOption o ")
                .append("on o.option_id = od.option_id ").append("inner join OptionCategory oc ")
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
                "from OptionHashtag oh, Hashtag h " +
                "where oh.hashtag_id = h.hashtag_id and oh.option_id = :subOptionId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("subOptionId", subOptionId);

        return template.queryForList(sql, param, String.class);
    }

    public List<TrimDefaultOptionDto> findDefaultOptionByCarId(int carId) {
        String sql = "select option_name, option_image, option_description, option_used_count " +
                "from DefaultOptionData as data " +
                "inner join CarOption on data.option_id = CarOption.option_id " +
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

        if (isDefault) {
            query.append("from DefaultOptionData od ");
        }

        if (!isDefault) {
            query.append(", od.option_bought_count from SubOptionData od ");
        }

        query.append("inner join CarOption o ").append("on od.option_id = o.option_id ")
                .append("inner join OptionCategory oc ")
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
                "from SubOptionPackage sp " +
                "left join CarOption o " +
                "on sp.option_id = o.option_id " +
                "inner join OptionCategory oc " +
                "on o.option_category_id = oc.option_category_id " +
                "where sp.package_id = :packageId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("packageId", optionId);

        return template.query(sql, param, optionDetailRowMapper());
    }

    public Optional<QuoteSubOptionDto> findSubOptionByOptionId(int optionId) {
        String sql = "select CarOption.option_id, option_name, option_image, option_price, option_category_name as optionTitle from CarOption inner join SubOptionData " +
                "on CarOption.option_id = SubOptionData.option_id inner join OptionCategory on " +
                "OptionCategory.option_category_id = CarOption.option_category_id where CarOption.option_id = :optionId";
        try {
            SqlParameterSource param = new MapSqlParameterSource()
                    .addValue("optionId", optionId);
            return Optional.of(template.queryForObject(sql, param, shareSubOptionRowMapper()));
        } catch (DataAccessException e) {
            return Optional.empty();
        }
    }

    public List<SubOptionIdAndPriceDto> findAllSubOptionInfo(int carId) {
        String sql = "select option_id, option_price " +
                "from SubOptionData " +
                "where car_id = :carId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return template.query(sql, param, subOptionIdAndPriceRowMapper());
    }

    private RowMapper<SubOptionIdAndPriceDto> subOptionIdAndPriceRowMapper() {
        return BeanPropertyRowMapper.newInstance(SubOptionIdAndPriceDto.class);
    }

    private RowMapper<QuoteSubOptionDto> shareSubOptionRowMapper() {
        return BeanPropertyRowMapper.newInstance(QuoteSubOptionDto.class);
    }

    public Long countExistOptions(int carId, List<Integer> optionIds) {
        String sql = "select count(*) as totalCount " +
                "from SubOptionData " +
                "where car_id = :carId and option_id IN (:optionIds)";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId)
                .addValue("optionIds", optionIds);

        return template.queryForObject(sql, param, Long.class);
    }
}
