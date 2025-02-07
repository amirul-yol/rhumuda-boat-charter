package com.rhumuda_new.rhumudasystem.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.rhumuda_new.rhumudasystem.dto.BookingDTO;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${admin.email:admin@rhumudaboatcharter.com.my}")
    private String adminEmail;

    @PostConstruct
    public void init() {
        logger.info("EmailService initialized with username: {}", fromEmail);
        // Don't log the actual password, just check if it's set
        logger.info("MAIL_PASSWORD environment variable is {}", 
            System.getenv("MAIL_PASSWORD") != null ? "set" : "not set");
    }

    public void sendBookingEmails(BookingDTO booking) throws MessagingException {
        // Send to customer
        sendCustomerEmail(booking);
        
        // Send to admin
        sendAdminEmail(booking);
    }

    private void sendCustomerEmail(BookingDTO booking) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(booking.getEmail());
        helper.setSubject("Booking Inquiry Confirmation - Rhumuda Boat Charter");

        String emailContent = generateCustomerEmailContent(booking);
        helper.setText(emailContent, true);

        mailSender.send(message);
    }

    private void sendAdminEmail(BookingDTO booking) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(adminEmail);
        helper.setSubject("New Booking Inquiry - " + booking.getBookingId());

        String emailContent = generateAdminEmailContent(booking);
        helper.setText(emailContent, true);

        mailSender.send(message);
    }

    private String generateCustomerEmailContent(BookingDTO booking) {
        String template = getEmailTemplate();
        
        return template
            .replace("[booking_id]", booking.getBookingId())
            .replace("[first_name]", booking.getFirstName())
            .replace("[last_name]", booking.getLastName())
            .replace("[email]", booking.getEmail())
            .replace("[phone_number]", booking.getPhoneNumber())
            .replace("[address_line1]", booking.getAddressLine1())
            .replace("[address_line2]", booking.getAddressLine2() != null ? booking.getAddressLine2() : "")
            .replace("[postal_code]", booking.getPostalCode())
            .replace("[city]", booking.getCity())
            .replace("[country]", booking.getCountry())
            .replace("[booking_date]", booking.getBookingDate().toString())
            .replace("[passengers]", String.valueOf(booking.getPassengers()))
            // These might need to be fetched from the package service
            .replace("[name]", "Package Name") // TODO: Get from PackageService
            .replace("[jetty]", booking.getJettyPoint());
    }

    private String generateAdminEmailContent(BookingDTO booking) {
        // Create a simpler template for admin
        return String.format("""
            New Booking Inquiry Received
            
            Booking ID: %s
            Customer: %s %s
            Email: %s
            Phone: %s
            
            Package ID: %s
            Booking Date: %s
            Passengers: %d
            
            Please review and respond to the customer.
            """,
            booking.getBookingId(),
            booking.getFirstName(),
            booking.getLastName(),
            booking.getEmail(),
            booking.getPhoneNumber(),
            booking.getPackageId(),
            booking.getBookingDate(),
            booking.getPassengers()
        );
    }

    private String getEmailTemplate() {
        try {
            return new String(getClass().getResourceAsStream("/templates/EmailTemplate.txt")
                .readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read email template", e);
        }
    }
} 