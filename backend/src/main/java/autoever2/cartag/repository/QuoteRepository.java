package autoever2.cartag.repository;

import autoever2.cartag.domain.quote.HistorySearchDto;
import autoever2.cartag.domain.quote.HistoryShortDto;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Optional;

@Repository
public class QuoteRepository {

    private final NamedParameterJdbcTemplate template;

    public QuoteRepository(DataSource dataSource) {
        this.template = new NamedParameterJdbcTemplate(dataSource);
    }

    public Optional<HistoryShortDto> findShortData(HistorySearchDto historySearchDto) {
        String sql = "select sh.history_id, sh.sold_count, sh.sold_options_id " +
                "from SalesHistory sh " +
                "inner join HistoryModelMapper hm " +
                "on hm.history_id = sh.history_id " +
                "where sh.car_id = :carId and sh.sold_options_id = :optionIds and hm.model_id in (:powerTrainId, :bodyTypeId, :operationId) " +
                "group by sh.history_id having count(hm.model_id) = 3";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", historySearchDto.getCarId())
                .addValue("optionIds", historySearchDto.getOptionIds())
                .addValue("powerTrainId", historySearchDto.getPowerTrainId())
                .addValue("bodyTypeId", historySearchDto.getBodyTypeId())
                .addValue("operationId", historySearchDto.getOperationId());

        return Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, historyShortRowMapper())));
    }

    private RowMapper<HistoryShortDto> historyShortRowMapper() {
        return BeanPropertyRowMapper.newInstance(HistoryShortDto.class);
    }
}
