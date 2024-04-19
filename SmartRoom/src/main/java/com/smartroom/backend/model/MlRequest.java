package com.smartroom.backend.model;

import java.util.LinkedHashMap;

public class MlRequest {

    private LinkedHashMap<String, Object> params;

    public MlRequest() {
    }

    public MlRequest(LinkedHashMap<String, Object> params) {
        this.params = params;
    }

    public LinkedHashMap<String, Object> getParams() {
        return params;
    }

    public void setParams(LinkedHashMap<String, Object> params) {
        this.params = params;
    }

    @Override
    public String toString() {
        return "MlRequest{" +
                "params=" + params +
                '}';
    }
}
