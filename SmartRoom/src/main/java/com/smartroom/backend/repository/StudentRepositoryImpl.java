package com.smartroom.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.smartroom.backend.entity.Student;

@Repository
public class StudentRepositoryImpl implements StudentRepository{

    private final MongoOperations mongoOperations;

    @Autowired
    StudentRepositoryImpl(MongoOperations mongoOperations){
        this.mongoOperations = mongoOperations;
    }

    @Override
    public Student getStudentById(String studentId) {
        try {
            Query findQuery = new Query();
            findQuery.addCriteria(new Criteria("studentId").is(studentId));
            return mongoOperations.find(findQuery, Student.class, "student").get(0);
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("Student with id:- " + studentId + " not found");
        }
    }
}
