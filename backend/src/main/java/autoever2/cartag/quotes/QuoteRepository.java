package autoever2.cartag.quotes;

import autoever2.cartag.quotes.dtos.QuoteModelPriceDto;
import autoever2.cartag.quotes.dtos.QuoteSearchDto;
import autoever2.cartag.quotes.dtos.HistoryShortDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
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

import static autoever2.cartag.parser.OptionStringParser.parseOptionId;

@Repository
public class QuoteRepository {

    private final NamedParameterJdbcTemplate template;

    public QuoteRepository(DataSource dataSource) {
        this.template = new NamedParameterJdbcTemplate(dataSource);
    }

    public Optional<HistoryShortDto> findShortQuoteDataBySearchDto(QuoteSearchDto historySearchDto) {
        String sql = "select sh.history_id, sh.sold_count, sh.sold_options_id " +
                "from SalesHistory sh " +
                "inner join HistoryModelMapper hm on hm.history_id = sh.history_id " +
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

    public List<QuoteModelPriceDto> findQuoteTotalModelPriceByCarId(int carId) {
        String sql = "select sh.sold_options_id, sh.sold_count, sum(m.model_price) as modelPrice " +
                "from SalesHistory sh " +
                "inner join HistoryModelMapper hm on sh.history_id = hm.history_id " +
                "inner join Model m on hm.model_id = m.model_id " +
                "where car_id = :carId " +
                "group by sh.history_id";

        SqlParameterSource param = new MapSqlParameterSource().addValue("carId", carId);

        return template.query(sql, param, carPriceRowMapper());
    }

    public List<Integer> findOptionListFromHistoryId(Long historyId) {
        String sql = "select sold_options_id " +
                "from SalesHistory " +
                "where history_id = :historyId";

        SqlParameterSource param = new MapSqlParameterSource().addValue("historyId", historyId);

        Optional<String> result = Optional.ofNullable(DataAccessUtils.singleResult(template.query(sql, param, (rs, idx) -> rs.getString("sold_options_id"))));

        return parseOptionId(result.orElseThrow(() -> new EmptyDataException(ErrorCode.INVALID_PARAMETER)));
    }

    private RowMapper<HistoryShortDto> historyShortRowMapper() {
        return BeanPropertyRowMapper.newInstance(HistoryShortDto.class);
    }

    private RowMapper<QuoteModelPriceDto> carPriceRowMapper() {
        return BeanPropertyRowMapper.newInstance(QuoteModelPriceDto.class);
    }
}
