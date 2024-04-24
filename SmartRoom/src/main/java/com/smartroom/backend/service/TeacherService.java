package com.smartroom.backend.service;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.StudentDetails;
import com.smartroom.backend.model.StudentModel;

public interface TeacherService {

    StudentModel createStudent(Student student) throws Exception;

    Student getStudentById(String studentId) throws Exception;

    Student updateStudent(String studentId, StudentDetails studentDetails) throws Exception;

    String predictResult(String studentId, String subject) throws Exception;
}
