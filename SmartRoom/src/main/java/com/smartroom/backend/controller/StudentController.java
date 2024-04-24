package com.smartroom.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping("/get/details/{studentId}")
    public ResponseEntity<Student> getStudentDetailsById(@PathVariable("studentId") String studentId){
        return new ResponseEntity<>(studentService.getStudentDetails(studentId), HttpStatus.OK);
    }



}
