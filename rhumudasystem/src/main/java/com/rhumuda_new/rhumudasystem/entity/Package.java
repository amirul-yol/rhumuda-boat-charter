package com.rhumuda_new.rhumudasystem.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "packages")
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private PackageCategory category;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "is_private")
    private Boolean isPrivate;

    @Column(name = "distance_min_km")
    private Integer distanceMinKm;

    @Column(name = "distance_max_km")
    private Integer distanceMaxKm;

    @Column(name = "fishing_type")
    private String fishingType;

    @OneToMany(mappedBy = "packageEntity", cascade = CascadeType.ALL)
    private List<PriceTier> priceTiers;

    @OneToMany(mappedBy = "packageEntity", cascade = CascadeType.ALL)
    private List<IncludedService> includedServices;

    // Getters and setters
} 