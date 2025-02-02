package com.rhumuda_new.rhumudasystem.repository;

import com.rhumuda_new.rhumudasystem.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByBookingId(String bookingId);
} 