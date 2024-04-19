package com.smartroom.backend.model;

public class StudentModel {

    private String studentId;

    private String password;

    private String email;

    public StudentModel() {
    }

    public StudentModel(String studentId, String password, String email) {
        this.studentId = studentId;
        this.password = password;
        this.email = email;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

