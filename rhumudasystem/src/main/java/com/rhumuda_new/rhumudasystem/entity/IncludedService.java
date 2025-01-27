package com.rhumuda_new.rhumudasystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "included_services")
public class IncludedService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private Package packageEntity;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    private String description;

    // Getters and setters
} 