package autoever2.cartag.exception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Log4j2
public class GlobalExceptionHandler {

    @ExceptionHandler(EmptyDataException.class)
    public ResponseEntity<ErrorResponse> handleEmptyDataException(EmptyDataException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatus()).body(ErrorResponse.builder()
                .code(errorCode.toString())
                .message(errorCode.getMessage())
                .build());
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<ErrorResponse> handleInvalidDataException(InvalidDataException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatus()).body(ErrorResponse.builder()
                .code(errorCode.toString())
                .message(errorCode.getMessage())
                .build());
    }

    @ExceptionHandler(ServerException.class)
    public ResponseEntity<ErrorResponse> handleServerException(ServerException e) {
        ErrorCode errorCode = e.getErrorCode();
        log.error("Server Error: " + errorCode.getMessage());
        return ResponseEntity.status(errorCode.getHttpStatus()).body(ErrorResponse.builder()
                .code(errorCode.toString())
                .build());
    }
}
