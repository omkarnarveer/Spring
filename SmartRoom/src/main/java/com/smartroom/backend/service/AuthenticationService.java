package com.smartroom.backend.service;

import java.util.List;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.Teacher;

public interface AuthenticationService {

    Teacher createTeacher(Teacher teacher) throws Exception;

    List<Student> fetchAllStudent() throws Exception;
}
