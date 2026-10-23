package com.example.skincare.service;

import com.example.skincare.cosmetic.CreateCosmeticDto;
import com.example.skincare.cosmetic.CosmeticEntity;
import com.example.skincare.cosmetic.CosmeticRepository;
import org.springframework.stereotype.Service;

@Service
public class CosmeticService {

    private final CosmeticRepository cosmeticRepository;

    public CosmeticService(CosmeticRepository cosmeticRepository) {
        this.cosmeticRepository = cosmeticRepository;
    }

    public CosmeticEntity createCosmetic(CreateCosmeticDto createDto) {
        CosmeticEntity entity = new CosmeticEntity(createDto.name());
        return cosmeticRepository.save(entity);
    }
}
