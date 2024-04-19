package com.smartroom.backend.repository;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.StudentDetails;

public interface StudentRepository {

    Student getStudentById(String studentId);
}
