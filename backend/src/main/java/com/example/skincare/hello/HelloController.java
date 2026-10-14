package com.example.skincare.hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hello")
public class HelloController {

    @GetMapping
    public HelloResponse getHello(@RequestParam(required = false) String name) {
        if (name != null && !name.isBlank()) {
            return new HelloResponse("Hello " + name + " from the skincare backend");
        }
        return new HelloResponse("Hello from the skincare backend");
    }
}
