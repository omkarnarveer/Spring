package com.smartroom.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;


    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student getStudentDetails(String studentId) {
      try {
          return studentRepository.getStudentById(studentId);
      }
      catch (UsernameNotFoundException e){
          throw new UsernameNotFoundException("Student with id:- " + studentId + " not found");
      }
    }
}
