package com.smartroom.backend.service;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.Teacher;

import java.util.List;

public interface AuthenticationService {

    Teacher createTeacher(Teacher teacher) throws Exception;

    List<Student> fetchAllStudent() throws Exception;
}
