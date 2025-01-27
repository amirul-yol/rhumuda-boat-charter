package com.rhumuda_new.rhumudasystem.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "price_tiers")
public class PriceTier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private Package packageEntity;

    @Column(name = "tier_type", nullable = false)
    private String tierType;  // FIXED, ADULT, CHILD, INFANT

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "age_min")
    private Integer ageMin;

    @Column(name = "age_max")
    private Integer ageMax;

    // Getters and setters
} 