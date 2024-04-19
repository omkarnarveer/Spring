package com.smartroom.backend.repository;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.model.StudentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TeacherRepositoryImpl implements TeacherRepository {

    private final MongoOperations mongoOperations;

    @Autowired
    TeacherRepositoryImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public StudentModel createStudent(Student student) throws Exception {
        try {
            mongoOperations.insert(student, "student");
            StudentModel studentModel = new StudentModel(student.getStudentId(), student.getPassword(), student.getEmail());
            return studentModel;
        } catch (DuplicateKeyException e) {
            throw new DuplicateKeyException("Student with this id is already created");
        }
    }

    @Override
    public Student getStudentById(String studentId) throws Exception {
        try {
            Query findQuery = new Query();
            findQuery.addCriteria(new Criteria("studentId").is(studentId));
            return mongoOperations.find(findQuery, Student.class, "student").get(0);
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("Student with id:- " + studentId + " not found");
        }
    }

    @Override
    public Student updateStudent(Student student) {
        Student updatedStudent = mongoOperations.save(student);
        return updatedStudent;
    }

}

