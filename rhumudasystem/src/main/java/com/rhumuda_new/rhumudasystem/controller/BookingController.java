package com.rhumuda_new.rhumudasystem.controller;

import com.rhumuda_new.rhumudasystem.dto.ApiError;
import com.rhumuda_new.rhumudasystem.dto.BookingDTO;
import com.rhumuda_new.rhumudasystem.entity.AddOn;
import com.rhumuda_new.rhumudasystem.entity.Booking;
import com.rhumuda_new.rhumudasystem.entity.Booking.BookingStatus;
import com.rhumuda_new.rhumudasystem.repository.AddOnRepository;
import com.rhumuda_new.rhumudasystem.repository.BookingRepository;
import com.rhumuda_new.rhumudasystem.repository.JettyPointRepository;
import com.rhumuda_new.rhumudasystem.repository.PackageRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private JettyPointRepository jettyPointRepository;

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private AddOnRepository addOnRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingDTO bookingDTO, BindingResult bindingResult) {
        try {
            // Check for validation errors
            if (bindingResult.hasErrors()) {
                List<String> errors = bindingResult.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
                return ResponseEntity
                    .badRequest()
                    .body(new ApiError(HttpStatus.BAD_REQUEST.value(), "Validation failed", errors));
            }

            // Create new booking entity
            Booking booking = new Booking();

            // Set basic fields
            booking.setBookingId(bookingDTO.getBookingId());
            booking.setStatus(BookingStatus.valueOf(bookingDTO.getStatus()));
            booking.setFirstName(bookingDTO.getFirstName());
            booking.setLastName(bookingDTO.getLastName());
            booking.setPhoneNumber(bookingDTO.getPhoneNumber());
            booking.setEmail(bookingDTO.getEmail());
            booking.setAddressLine1(bookingDTO.getAddressLine1());
            booking.setAddressLine2(bookingDTO.getAddressLine2());
            booking.setPostalCode(bookingDTO.getPostalCode());
            booking.setCity(bookingDTO.getCity());
            booking.setCountry(bookingDTO.getCountry());

            // Set entity relationships
            booking.setJettyPoint(jettyPointRepository.findById(Long.parseLong(bookingDTO.getJettyPoint()))
                .orElseThrow(() -> new RuntimeException("JettyPoint not found")));

            booking.setPackageDetails(packageRepository.findById(Long.parseLong(bookingDTO.getPackageId()))
                .orElseThrow(() -> new RuntimeException("Package not found")));

            // Set dates and passengers
            booking.setBookingDate(bookingDTO.getBookingDate());
            booking.setPassengers(bookingDTO.getPassengers());
            booking.setAlternativeDate1(bookingDTO.getAlternativeDate1());
            booking.setAlternativeDate2(bookingDTO.getAlternativeDate2());
            booking.setSpecialRemarks(bookingDTO.getSpecialRemarks());

            // Set system fields
            booking.setCreatedAt(LocalDateTime.now());
            booking.setUpdatedAt(LocalDateTime.now());

            // Handle add-ons if present
            if (bookingDTO.getAddOns() != null && !bookingDTO.getAddOns().isEmpty()) {
                Set<AddOn> addOns = new HashSet<>();
                for (String addOnId : bookingDTO.getAddOns()) {
                    AddOn addOn = addOnRepository.findById(Long.parseLong(addOnId))
                        .orElseThrow(() -> new RuntimeException("AddOn not found: " + addOnId));
                    addOns.add(addOn);
                }
                booking.setAddOns(addOns);
            }

            // Save the booking
            Booking savedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(savedBooking);

        } catch (NumberFormatException e) {
            return ResponseEntity
                .badRequest()
                .body(new ApiError(HttpStatus.BAD_REQUEST.value(), "Invalid ID format", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity
                .badRequest()
                .body(new ApiError(HttpStatus.BAD_REQUEST.value(), "Error creating booking", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error", e.getMessage()));
        }
    }
}