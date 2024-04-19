package com.smartroom.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Random;


@Document(collection = "student")
public class Student {

    // student  + unique id
    @NotNull
    @NotEmpty
    @Id
    private String studentId;

    @NotNull
    @NotEmpty
    private String studentName;

    @NotNull
    @NotEmpty
    @Email
    private String email;


    private String password = String.valueOf(new Random().nextInt(999999));


    private StudentDetails studentDetails;


    private String role = "ROLE_STUDENT";

    public Student() {
    }

    public Student(String studentId, String studentName, String email, String password, StudentDetails studentDetails) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.email = email;
        this.password = password;
        this.studentDetails = studentDetails;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public StudentDetails getStudentDetails() {
        return studentDetails;
    }

    public void setStudentDetails(StudentDetails studentDetails) {
        this.studentDetails = studentDetails;
    }

    public String getRole() {
        return role;
    }


    @Override
    public String toString() {
        return "Student{" +
                "studentId='" + studentId + '\'' +
                ", studentName='" + studentName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", studentDetails=" + studentDetails +
                ", role='" + role + '\'' +
                '}';
    }
}
