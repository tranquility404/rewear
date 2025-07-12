package com.tranquility.ReWear.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("health-check")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok("OK");
    }

}
