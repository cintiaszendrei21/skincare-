package com.example.skincare.repository;

import com.example.skincare.entity.CosmeticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CosmeticRepository extends JpaRepository<CosmeticEntity, Long> {
}
