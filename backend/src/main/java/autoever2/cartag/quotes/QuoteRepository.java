package autoever2.cartag.quotes;

import autoever2.cartag.quotes.dtos.HistoryTotalModelPriceDto;
import autoever2.cartag.quotes.dtos.HistorySearchDto;
import autoever2.cartag.quotes.dtos.HistoryShortDto;
import autoever2.cartag.exception.EmptyDataException;
import autoever2.cartag.exception.ErrorCode;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;

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

    public List<Integer> findOptionListFromHistoryId(Long historyId) {
        String sql = "select sold_options_id " +
                "from SalesHistory " +
                "where history_id = :historyId";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("historyId", historyId);

        String optionIds = null;
        try {
            optionIds = template.queryForObject(sql, param, String.class);
        } catch (DataAccessException e) {
            throw new EmptyDataException(ErrorCode.INVALID_PARAMETER);
        }

        return mapToList(optionIds);

    }

    private List<Integer> mapToList(String optionIds) {
        StringTokenizer token = new StringTokenizer(optionIds, ",");
        List<Integer> optionIdList = new ArrayList<>();
        while (token.hasMoreTokens()) {
            optionIdList.add(Integer.parseInt(token.nextToken()));
        }

        return optionIdList;
    }

    public List<HistoryTotalModelPriceDto> findHistoryTotalModelPriceByCarId(int carId) {
        String sql = "select sh.sold_options_id, sh.sold_count, sum(m.model_price) as modelPrice " +
                "from SalesHistory sh " +
                "inner join HistoryModelMapper hm on sh.history_id = hm.history_id " +
                "inner join Model m on hm.model_id = m.model_id " +
                "where car_id = :carId " +
                "group by sh.history_id";

        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("carId", carId);

        return template.query(sql, param, carPriceRowMapper());
    }

    private RowMapper<HistoryTotalModelPriceDto> carPriceRowMapper() {
        return BeanPropertyRowMapper.newInstance(HistoryTotalModelPriceDto.class);
    }
}
