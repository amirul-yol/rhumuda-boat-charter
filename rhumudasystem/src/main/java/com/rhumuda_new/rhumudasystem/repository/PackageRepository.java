package com.rhumuda_new.rhumudasystem.repository;

import com.rhumuda_new.rhumudasystem.entity.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PackageRepository extends JpaRepository<Package, Long> {
    List<Package> findByCategoryId(Long categoryId);
} 