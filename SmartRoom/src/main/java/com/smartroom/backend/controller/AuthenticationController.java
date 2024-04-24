package com.smartroom.backend.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.Teacher;
import com.smartroom.backend.security.JwtAuthRequest;
import com.smartroom.backend.security.JwtAuthResponse;
import com.smartroom.backend.security.JwtTokenHelper;
import com.smartroom.backend.service.AuthenticationService;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final JwtTokenHelper jwtTokenHelper;

    private final UserDetailsService userDetailsService;

    private final AuthenticationManager authenticationManager;


    @Autowired
    private AuthenticationController(AuthenticationService authenticationService, JwtTokenHelper jwtTokenHelper
            , UserDetailsService userDetailsService, AuthenticationManager authenticationManager) {
        this.authenticationService = authenticationService;
        this.jwtTokenHelper = jwtTokenHelper;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/teacher/signup")
    public ResponseEntity<Teacher> signUpTeacher(@RequestBody @Valid Teacher teacher) throws Exception {
        Teacher createdTeacher = authenticationService.createTeacher(teacher);
        return new ResponseEntity<>(createdTeacher, HttpStatus.CREATED);
    }

    @PostMapping("/teacher/login")
    public ResponseEntity<JwtAuthResponse> loginTeacher(@RequestBody @Valid JwtAuthRequest jwtAuthRequest) throws Exception {
        authenticate(jwtAuthRequest.getUsername(), jwtAuthRequest.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtAuthRequest.getUsername());
        String token = jwtTokenHelper.generateToken(userDetails);
        return new ResponseEntity<>(new JwtAuthResponse(token), HttpStatus.OK);
    }

    @PostMapping("/student/login")
    public ResponseEntity<JwtAuthResponse> loginStudent(@RequestBody @Valid JwtAuthRequest jwtAuthRequest) throws Exception {
        authenticate(jwtAuthRequest.getUsername(), jwtAuthRequest.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtAuthRequest.getUsername());
        String token = jwtTokenHelper.generateToken(userDetails);
        return new ResponseEntity<>(new JwtAuthResponse(token), HttpStatus.OK);
    }

    @GetMapping("/student/fetch/all")
    public ResponseEntity<List<Student>> fetchAllStudent() throws Exception {
        List<Student> fetchedStudents = authenticationService.fetchAllStudent();
        return new ResponseEntity<>(fetchedStudents, HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws Exception {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        try {
            authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password");
        }

    }



}
