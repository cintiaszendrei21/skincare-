package com.example.skincare.controller;

import com.example.skincare.dto.CreateCosmeticDto;
import com.example.skincare.entity.CosmeticEntity;
import com.example.skincare.service.CosmeticService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/cometics")
public class CosmeticController {
    private final CosmeticService cosmeticService;

    public CosmeticController(CosmeticService cosmeticService) {
        this.cosmeticService = cosmeticService;
    }

    @PostMapping
    public ResponseEntity<CosmeticEntity> createCosmetic(@Valid @RequestBody CreateCosmeticDto createDto) {
        CosmeticEntity savedCosmetic = cosmeticService.createCosmetic(createDto);
        return new ResponseEntity<>(savedCosmetic, HttpStatus.CREATED);
    }
}
