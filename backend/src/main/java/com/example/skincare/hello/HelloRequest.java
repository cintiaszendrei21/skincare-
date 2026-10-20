package com.example.skincare.hello;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class HelloRequest {
    @NotBlank(message = "A név megadása kötelező.")
    @Size(min = 2, max = 50, message = "A név legalább 2 karakter kell hogy legyen.")
    private String name;

    public HelloRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}


