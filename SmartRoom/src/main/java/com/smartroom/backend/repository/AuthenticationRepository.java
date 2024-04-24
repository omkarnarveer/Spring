package com.smartroom.backend.repository;

import java.util.List;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.Teacher;

public interface AuthenticationRepository {

    Teacher createTeacher(Teacher teacher);

    Teacher getTeacherById(String teacherId) throws Exception;

    List<Teacher> fetchAll() throws Exception;

    void deleteAllTeacher();

    void deleteAllStudent();

    List<Student> fetchAllStudent();
}
