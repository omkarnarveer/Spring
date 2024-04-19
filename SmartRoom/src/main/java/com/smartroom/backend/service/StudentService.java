package com.smartroom.backend.service;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.StudentDetails;

public interface StudentService {

    Student getStudentDetails(String studentId);
}
