package com.rhumuda_new.rhumudasystem.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String bookingId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    // Customer Info
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String phoneNumber;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String addressLine1;
    private String addressLine2;
    @Column(nullable = false)
    private String postalCode;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String country;

    // Reservation Details
    @ManyToOne
    @JoinColumn(name = "jetty_point_id", nullable = false)
    private JettyPoint jettyPoint;

    @Column(nullable = false)
    private LocalDate bookingDate;
    
    @Column(nullable = false)
    private Integer passengers;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private Package packageDetails;

    @ManyToMany
    @JoinTable(
        name = "booking_addons",
        joinColumns = @JoinColumn(name = "booking_id"),
        inverseJoinColumns = @JoinColumn(name = "addon_id")
    )
    private Set<AddOn> addOns;

    // Other Options
    private LocalDate alternativeDate1;
    private LocalDate alternativeDate2;
    private String specialRemarks;

    // System Fields
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED
    }

    // Add getters and setters
} 