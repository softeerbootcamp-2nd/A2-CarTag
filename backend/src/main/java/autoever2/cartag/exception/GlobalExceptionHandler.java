package autoever2.cartag.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmptyDataException.class)
    public ResponseEntity<ErrorResponse> handleEmptyDataException(EmptyDataException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatus()).body(ErrorResponse.builder()
                .code(errorCode.toString())
                .message(errorCode.getMessage())
                .build());
    }
}
