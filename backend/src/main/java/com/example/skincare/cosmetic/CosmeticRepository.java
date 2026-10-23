package com.example.skincare.cosmetic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CosmeticRepository extends JpaRepository<CosmeticEntity, Long> {
}
