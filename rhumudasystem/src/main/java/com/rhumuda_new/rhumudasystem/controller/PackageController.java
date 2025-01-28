package com.rhumuda_new.rhumudasystem.controller;

import com.rhumuda_new.rhumudasystem.entity.Package;
import com.rhumuda_new.rhumudasystem.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "http://localhost:3000")
public class PackageController {

    @Autowired
    private PackageRepository packageRepository;

    @GetMapping("/category/{categoryId}")
    public List<Package> getPackagesByCategory(@PathVariable Long categoryId) {
        List<Package> packages = packageRepository.findByCategoryId(categoryId);
        System.out.println("Packages found: " + packages.size());
        packages.forEach(p -> {
            System.out.println("Package ID: " + p.getId());
            System.out.println("Package Title: " + p.getTitle());
            System.out.println("Services: " + p.getServices().size());
            System.out.println("Price Tiers: " + p.getPriceTiers().size());
        });
        return packages;
    }
} 