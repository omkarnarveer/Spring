package com.smartroom.backend.service;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.StudentDetails;
import com.smartroom.backend.repository.StudentRepository;
import com.smartroom.backend.repository.StudentRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
