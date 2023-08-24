package autoever2.cartag.parser;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class OptionStringParser {

    public static List<Integer> parseOptionId(String optionIds) {
        StringTokenizer stringTokenizer = new StringTokenizer(optionIds, ",");
        List<Integer> optionIdList = new ArrayList<>();
        while (stringTokenizer.hasMoreTokens()) {
            optionIdList.add(Integer.parseInt(stringTokenizer.nextToken()));
        }

        return optionIdList;
    }
}
