package com.smartroom.backend.repository;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AuthenticationRepositoryImpl implements AuthenticationRepository {

    private final MongoOperations mongoOperations;

    @Autowired
    public AuthenticationRepositoryImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public Teacher createTeacher(Teacher teacher) {
        try {
            mongoOperations.insert(teacher, "teacher");
            return teacher;
        } catch (DuplicateKeyException e) {
            throw new DuplicateKeyException("Teacher with this id is already created");
        }
    }

    @Override
    public Teacher getTeacherById(String teacherId) throws Exception {
        try {
            Query findQuery = new Query();
            findQuery.addCriteria(new Criteria("teacherId").is(teacherId));
            return mongoOperations.find(findQuery, Teacher.class, "teacher").get(0);
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("Teacher with id:- " + teacherId + " not found");
        }
    }


    @Override
    public void deleteAllTeacher() {
        mongoOperations.remove(new Query(), "teacher");
    }


    @Override
    public void deleteAllStudent() {
        mongoOperations.remove(new Query(), "student");
    }

    @Override
    public List<Teacher> fetchAll() throws Exception {
        try {
            return mongoOperations.findAll(Teacher.class, "teacher");
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public List<Student> fetchAllStudent(){
        return mongoOperations.findAll(Student.class, "student");
    }


}
