package com.example.skincare.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateCosmeticDto(
    @NotBlank(message = "A kozmetikum neve nem lehet üres!")
    String name
) {}
