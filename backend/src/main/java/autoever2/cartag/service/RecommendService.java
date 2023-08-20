package autoever2.cartag.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class RecommendService {

    @Value("${python.url}")
    private String requestURL;

    //TODO: 응답 존재 안할 시 예외처리
    public String getList() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(requestURL))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(getJsonFromEstimate())).build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String body = response.body();
            return body;
        } catch (Exception e) {
            e.getMessage();
        }

        return null;
    }

    public String getJsonFromEstimate() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("carId", 1);
        jsonObject.put("powerTrain", 1);
        jsonObject.put("bodyType", 3);
        jsonObject.put("operation", 5);

        JSONArray jsonArray = new JSONArray();
        JSONObject subOption = new JSONObject();
        subOption.put("subOptionId", "69");
        jsonArray.add(subOption);
        subOption = new JSONObject();
        subOption.put("subOptionId", "70");
        jsonArray.add(subOption);

        jsonObject.put("options", jsonArray);


        return jsonObject.toJSONString();
    }
}
