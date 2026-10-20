package com.example.skincare.hello;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HelloServiceTest {

    private final HelloService helloService = new HelloService();

    @Test
    void testGenerateGreeting() {
        HelloRequest request = new HelloRequest();
        request.setName("Cintia");

        HelloResponse response = helloService.generateGreeting(request);

        assertEquals("Szia Cintia!", response.getMessage());
    }
}
