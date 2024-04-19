package com.smartroom.backend.exception;

import org.springframework.http.HttpStatus;

import java.util.List;

public class NotValidError {

    private String message;

    private int httpStatusCode;
    private HttpStatus httpStatus;
    private List<InvalidField> fieldErrors;

    public NotValidError() {
    }

    public NotValidError(String message, int httpStatusCode, HttpStatus httpStatus, List<InvalidField> fieldErrors) {
        this.message = message;
        this.httpStatusCode = httpStatusCode;
        this.httpStatus = httpStatus;
        this.fieldErrors = fieldErrors;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getHttpStatusCode() {
        return httpStatusCode;
    }

    public void setHttpStatusCode(int httpStatusCode) {
        this.httpStatusCode = httpStatusCode;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public List<InvalidField> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(List<InvalidField> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }


}


