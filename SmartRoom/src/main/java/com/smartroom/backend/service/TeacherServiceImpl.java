package com.smartroom.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.smartroom.backend.email.EmailSender;
import com.smartroom.backend.entity.Student;
import com.smartroom.backend.entity.StudentDetails;
import com.smartroom.backend.exception.InvalidParameter;
import com.smartroom.backend.model.MlRequest;
import com.smartroom.backend.model.StudentModel;
import com.smartroom.backend.repository.TeacherRepository;

@Service
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    private final PasswordEncoder passwordEncoder;

    private final EmailSender emailSender;

    private final RestTemplate restTemplate;


    @Autowired
    TeacherServiceImpl(TeacherRepository teacherRepository, PasswordEncoder passwordEncoder, EmailSender emailSender, RestTemplate restTemplate) {
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailSender = emailSender;
        this.restTemplate = restTemplate;

    }

    @Override
    public StudentModel createStudent(Student student) throws Exception {
        try {
            String password = student.getPassword();
            System.out.println("Student password:- " + password);
            student.setPassword(passwordEncoder.encode(password));
            StudentModel savedStudent = teacherRepository.createStudent(student);
            String emailSubject = "User Id :- " +
                    student.getStudentId() + "\n" + "Password :- " + password;
            emailSender.sendEmail(savedStudent.getEmail(), emailSubject, "SmartRoom Credentials");
            return savedStudent;
        } catch (DuplicateKeyException e) {
            throw new DuplicateKeyException("Student with this id is already created");
        } catch (Exception e) {
            throw new Exception(e.getLocalizedMessage());
        }

    }

    @Override
    public Student getStudentById(String studentId) throws Exception {
        try {
            return teacherRepository.getStudentById(studentId);
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("Student with id:- " + studentId + " not found");
        }
    }

    @Override
    public Student updateStudent(String studentId, StudentDetails studentDetails) throws Exception {

        Student student = getStudentById(studentId);
        student.setStudentDetails(studentDetails);
        return teacherRepository.updateStudent(student);

    }

    @Override
    public String predictResult(String studentId, String subject) throws Exception {
        Student student = getStudentById(studentId);



            HashMap<String, String> storedPredictedResult = student.getStudentDetails().getPredictedResult();
            if (storedPredictedResult == null || storedPredictedResult.get(subject) == null) {

                HashMap<String, ArrayList<Integer>> studentMarks = student.getStudentDetails().getStudentMarks();
                if (!studentMarks.containsKey(subject) && !subject.equals("overall")) {
                    throw new InvalidParameter("Invalid subject,Subject not available");
                } else {
                    ArrayList<Integer> totalMarks;
                    if (studentMarks.containsKey(subject)) {
                        totalMarks = studentMarks.get(subject);
                    } else {
                        totalMarks = getTotalMarks(studentMarks);
                    }

                    try {
                        LinkedHashMap<String, Object> params = getMLParams(student.getStudentDetails(), totalMarks);
                        String predictedResult = getPrediction(params);
                        storedPredictedResult.put(subject, predictedResult);
                        student.getStudentDetails().setPredictedResult(storedPredictedResult);
                        updateStudent(studentId, student.getStudentDetails());
                        return predictedResult;
                    } catch (Exception e) {
                        throw new Exception(e.getMessage());
                    }
                }
            } else {
                return storedPredictedResult.get(subject);
        }
    }


        private String getPrediction(LinkedHashMap < String, Object > params) throws Exception {
            String url = "http://localhost:80/predict";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/json");
            headers.set("Accept", "text/plain");
            headers.set("Accept", "/");
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setContentLength(345);
            MlRequest mlRequest = new MlRequest(params);
            HttpEntity<MlRequest> request = new HttpEntity<>(mlRequest, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();

            } else {
                throw new Exception("Unable to process request");
            }
        }

        private LinkedHashMap<String, Object> getMLParams (StudentDetails
        studentDetails, ArrayList < Integer > totalMarks){
            LinkedHashMap<String, Object> params = new LinkedHashMap<>();
            params.put("sex", studentDetails.getSex());
            params.put("age", studentDetails.getAge());
            params.put("address", studentDetails.getAddress());
            params.put("famsize", studentDetails.getFamilySize());
            params.put("Pstatus", studentDetails.getParentStatus());
            params.put("Medu", studentDetails.getMotherEducation());
            params.put("Fedu", studentDetails.getFatherEducation());
            params.put("Mjob", studentDetails.getMotherJob());
            params.put("Fjob", studentDetails.getFatherJob());
            params.put("traveltime", studentDetails.getTravelTime());
            params.put("studytime", studentDetails.getStudyTime());
            params.put("failures", studentDetails.getFailures());
            params.put("schoolsup", studentDetails.getSchoolSupport());
            params.put("famsup", studentDetails.getFamilySupport());
            params.put("paid", studentDetails.getExtraPaidClasses());
            params.put("activities", studentDetails.getExtraCurricularActivities());
            params.put("nursery", studentDetails.getNurseryEducation());
            params.put("higher", studentDetails.getHigherEducation());
            params.put("internet", studentDetails.getInternet());
            params.put("famrel", studentDetails.getFamilyRelationship());
            params.put("freetime", studentDetails.getFreeTime());
            params.put("health", studentDetails.getFreeTime());
            params.put("absences", studentDetails.getAbsences());
            params.put("G1", totalMarks.get(0));
            params.put("G2", totalMarks.get(1));
            return params;
        }

        private ArrayList<Integer> getTotalMarks (HashMap < String, ArrayList < Integer >> studentMarks){
            ArrayList<Integer> totalMarks = new ArrayList<>();
            int term1 = 0, term2 = 0;

            int totalSubject = studentMarks.size();


            for (Map.Entry<String, ArrayList<Integer>> entry : studentMarks.entrySet()) {
                ArrayList<Integer> marks = entry.getValue();

                term1 += marks.get(0);
                term2 += marks.get(1);
            }
            totalMarks.add(term1 / totalSubject);
            totalMarks.add(term2 / totalSubject);

            return totalMarks;
        }
    }


