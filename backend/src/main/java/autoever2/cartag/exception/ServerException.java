package autoever2.cartag.exception;

import lombok.Getter;

@Getter
public class ServerException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String message;

    public ServerException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = null;
    }

    public ServerException(ErrorCode errorCode, String cause) {
        this.errorCode = errorCode;
        this.message = cause;
    }
}
