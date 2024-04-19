package com.smartroom.backend.controller;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.StudentDetails;
import com.smartroom.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
