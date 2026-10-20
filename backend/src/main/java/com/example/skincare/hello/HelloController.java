package com.example.skincare.hello;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hello")
public class HelloController {

    private final HelloService helloService;

    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }


    @GetMapping
    public ResponseEntity<HelloResponse> getHello(@RequestParam(required = false) String name) {
        if (name != null && !name.isBlank()) {
            return ResponseEntity.ok(new HelloResponse("Hello " + name + " from the skincare backend"));
        }
        return ResponseEntity.ok(new HelloResponse("Hello from the skincare backend"));
    }

    @PostMapping
    public ResponseEntity<HelloResponse> sayHello(@Valid @RequestBody HelloRequest request) {
        HelloResponse response = helloService.generateGreeting(request);
        return ResponseEntity.ok(response);
    }
}
