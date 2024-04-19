package com.smartroom.backend.security;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.Teacher;
import com.smartroom.backend.repository.AuthenticationRepository;
import com.smartroom.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AuthenticationRepository authenticationRepository;

    private final TeacherRepository teacherRepository;

    @Autowired
    public CustomUserDetailsService(AuthenticationRepository authenticationRepository, TeacherRepository teacherRepository) {
        this.authenticationRepository = authenticationRepository;
        this.teacherRepository = teacherRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        if (userId.contains("teacher")) {
            try {
                Teacher teacher = authenticationRepository.getTeacherById(userId);
                if (teacher == null) {
                    throw new UsernameNotFoundException("No teacher with given name found");
                }
                return new CustomUserDetails(teacher, null);
            } catch (Exception e) {
                throw new RuntimeException();
            }
        } else if (userId.contains("student")) {
            try {
                Student student = teacherRepository.getStudentById(userId);
                if (student == null) {
                    throw new UsernameNotFoundException("No student with given name found");
                }
                return new CustomUserDetails(null, student);
            } catch (Exception e) {
                throw new RuntimeException();
            }
        } else {
            throw new UsernameNotFoundException("No student or teacher with given name found");
        }
    }
}
