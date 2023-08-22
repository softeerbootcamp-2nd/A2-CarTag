package autoever2.cartag.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class InvalidDataException extends RuntimeException {

    private final ErrorCode errorCode;
}
