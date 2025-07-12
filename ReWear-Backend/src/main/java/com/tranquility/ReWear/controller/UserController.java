package com.tranquility.ReWear.controller;

import com.tranquility.ReWear.config.UserPrincipal;
import com.tranquility.ReWear.dto.ItemRequest;
import com.tranquility.ReWear.dto.ItemResponse;
import com.tranquility.ReWear.dto.UserProfileResponse;
import com.tranquility.ReWear.service.ItemService;
import com.tranquility.ReWear.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "User", description = "User management APIs")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ItemService itemService;

    @GetMapping("health-check")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get user dashboard", description = "Get user profile and items")
    public ResponseEntity<?> getUserDashboard(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        UserProfileResponse profile = userService.getUserProfile(userPrincipal.getId());
        List<ItemResponse> userItems = itemService.getUserItems(userPrincipal.getId());

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("profile", profile);
        dashboard.put("items", userItems);
        dashboard.put("swapStatus", new HashMap<String, Object>() {{
            put("ongoing", 0);
            put("completed", 0);
        }});

        return ResponseEntity.ok(dashboard);
    }

    @PostMapping("/items")
    @Operation(summary = "Create new item", description = "Upload a new item for swapping")
    public ResponseEntity<?> createItem(
            @Valid @ModelAttribute ItemRequest itemRequest,
            @RequestParam(value = "images", required = false) List<MultipartFile> images,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        ItemResponse item = itemService.createItem(itemRequest, userPrincipal.getId(), images);
        return ResponseEntity.ok(item);
    }

    @GetMapping("/items")
    @Operation(summary = "Get user items", description = "Get all items uploaded by the user")
    public ResponseEntity<?> getUserItems(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ItemResponse> items = itemService.getUserItems(userPrincipal.getId());
        return ResponseEntity.ok(items);
    }
}
