package com.smartroom.backend.security;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.Teacher;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;

public class CustomUserDetails implements UserDetails {
    private final Teacher teacher;

    private final Student student;

    public CustomUserDetails(Teacher teacher, Student student) {
        this.teacher = teacher;
        this.student = student;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        HashSet<SimpleGrantedAuthority> roleSet = new HashSet<>();
        if (student == null) {
            roleSet.add(new SimpleGrantedAuthority(teacher.getRole()));
        }
        if (teacher == null) {
            roleSet.add(new SimpleGrantedAuthority(student.getRole()));
        }
        return roleSet;
    }

    @Override
    public String getPassword() {

        if (teacher == null) {
            return student.getPassword();
        } else {
            return teacher.getPassword();
        }
    }

    @Override
    public String getUsername() {
        if (student == null) {
            return teacher.getTeacherId();
        } else {
            return student.getStudentId();
        }
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
