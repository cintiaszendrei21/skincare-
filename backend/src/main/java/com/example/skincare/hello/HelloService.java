package com.example.skincare.hello;

import org.springframework.stereotype.Service;

@Service
public class HelloService {
    public HelloResponse generateGreeting(HelloRequest request) {
        String message = "Szia " + request.getName() + "!";
        return new HelloResponse(message);
    }
}

