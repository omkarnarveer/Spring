package com.smartroom.backend.repository;

import com.smartroom.backend.entity.Student;

public interface StudentRepository {

    Student getStudentById(String studentId);
}
