package com.smartroom.backend.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSender {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailSender(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String receiverEmail, String body, String subject) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom("smartroom2023@gmail.com");
        simpleMailMessage.setTo(receiverEmail);
        simpleMailMessage.setText(body);
        simpleMailMessage.setSubject(subject);

        javaMailSender.send(simpleMailMessage);
    }

}

