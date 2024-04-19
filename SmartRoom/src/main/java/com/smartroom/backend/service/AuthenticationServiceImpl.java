package com.smartroom.backend.service;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.Teacher;
import com.smartroom.backend.exception.InvalidParameter;
import com.smartroom.backend.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationRepository authenticationRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationServiceImpl(AuthenticationRepository authenticationRepository, PasswordEncoder passwordEncoder) {
        this.authenticationRepository = authenticationRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public Teacher createTeacher(Teacher teacher) throws Exception {
        try {
            String password = teacher.getPassword();
            String matchPassword = teacher.getMatchingPassword();
            if (password.equals(matchPassword)) {
                teacher.setPassword(passwordEncoder.encode(password));
                authenticationRepository.createTeacher(teacher);
                return teacher;
            } else {
                throw new InvalidParameter("Password doesn't matches with matching password");
            }
        } catch (DuplicateKeyException e) {
            throw new DuplicateKeyException("Teacher with this id is already created");
        }
    }

    @Override
    public List<Student> fetchAllStudent() throws Exception{
        try {
            return authenticationRepository.fetchAllStudent();
        } catch (Exception e) {
            throw new Exception(e.getLocalizedMessage());
        }
    }



}
