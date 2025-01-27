package com.rhumuda_new.rhumudasystem.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "package_categories")
public class PackageCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(name = "icon_url")
    private String iconUrl;

    @OneToMany(mappedBy = "category")
    private List<Package> packages;

    // Getters and setters
} 