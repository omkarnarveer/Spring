package com.smartroom.backend.entity;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "teacher")
public class Teacher {

    // teacher  + unique id
    @Id
    private String teacherId;

    @NotNull
    @NotEmpty
    private String teacherName;


    @NotNull
    @NotEmpty
    private String password;

    @NotNull
    @NotEmpty
    @Transient
    private String matchingPassword;

    private String role = "ROLE_TEACHER";

    public Teacher() {
    }

    public Teacher(String teacherId, String teacherName, String password, String matchingPassword) {
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.password = password;
        this.matchingPassword = matchingPassword;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMatchingPassword() {
        return matchingPassword;
    }

    public void setMatchingPassword(String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "teacherId='" + teacherId + '\'' +
                ", teacherName='" + teacherName + '\'' +
                ", password='" + password + '\'' +
                ", matchingPassword='" + matchingPassword + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
