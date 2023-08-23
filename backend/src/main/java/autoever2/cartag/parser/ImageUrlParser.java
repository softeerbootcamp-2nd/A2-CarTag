package autoever2.cartag.parser;

public class ImageUrlParser {

    public static String changeUrl(String value) {
        return value.replace('*', '1');
    }
}
