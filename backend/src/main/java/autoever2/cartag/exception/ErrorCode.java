package autoever2.cartag.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "잘못된 파라미터입니다."),
    INVALID_OPTIONS_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 옵션으로 접근하였습니다."),
    DATA_NOT_EXISTS(HttpStatus.NOT_FOUND, "데이터가 존재하지 않습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버오류입니다. 관리자에게 문의하세요."),
    PARSE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "데이터 파싱에 실패했습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
