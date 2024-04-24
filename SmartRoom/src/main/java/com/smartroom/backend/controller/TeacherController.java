package com.smartroom.backend.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartroom.backend.email.EmailSender;
import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.StudentDetails;
import com.smartroom.backend.model.StudentModel;
import com.smartroom.backend.service.TeacherService;

@RestController
@RequestMapping("/teacher")
@CrossOrigin
@PreAuthorize("hasRole('TEACHER')")
public class TeacherController {

    private final TeacherService teacherService;

    private final EmailSender emailSender;



    @Autowired
    TeacherController(TeacherService teacherService,EmailSender emailSender) {

        this.teacherService = teacherService;
        this.emailSender = emailSender;
    }


    @PostMapping("/create/student")
    public ResponseEntity<StudentModel> createStudent(@RequestBody @Valid Student student) throws Exception {
        System.out.println("student "+student);
        StudentModel createdStudent = teacherService.createStudent(student);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @PutMapping("/update/student/{studentId}")
    public ResponseEntity<Student> updateStudentData(@PathVariable("studentId") String studentId, @RequestBody StudentDetails studentDetails) throws Exception {
        System.out.println("student details:- " + studentDetails);
        Student updatedStudent = teacherService.updateStudent(studentId, studentDetails);
        return new ResponseEntity<>(updatedStudent, HttpStatus.CREATED);
    }


    @GetMapping("/predict/{studentId}/{subject}")
    public ResponseEntity<String> predictStudentResult(@PathVariable("studentId") String studentId, @PathVariable("subject") String subject) throws Exception {
        String predictedResult = teacherService.predictResult(studentId, subject);

        return new ResponseEntity<>(predictedResult, HttpStatus.OK);
    }

    @PostMapping("send/email/{studentMail}")
    public ResponseEntity<String> sendEmail(@RequestBody String message ,@PathVariable("studentMail") String studentMail){
         emailSender.sendEmail(studentMail,message,"Attention Needed!!");
         return new ResponseEntity<>("Mail Successfully Send" , HttpStatus.OK);
    }

    }



