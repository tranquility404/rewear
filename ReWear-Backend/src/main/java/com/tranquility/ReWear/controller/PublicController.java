package com.tranquility.ReWear.controller;

import com.tranquility.ReWear.dto.ItemResponse;
import com.tranquility.ReWear.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
@Tag(name = "Public", description = "Public APIs accessible without authentication")
public class PublicController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/landing")
    @Operation(summary = "Get landing page data", description = "Get platform intro and featured items")
    public ResponseEntity<?> getLandingData() {
        List<ItemResponse> featuredItems = itemService.getFeaturedItems();

        Map<String, Object> response = new HashMap<>();
        response.put("intro", "Welcome to SwapPlatform - Your Ultimate Item Exchange Hub!");
        response.put("description", "Discover, swap, and trade items with our community. " +
                "Turn your unused items into something you need!");
        response.put("callsToAction", new String[]{
                "Start Swapping", "Browse Items", "List an Item"
        });
        response.put("featuredItems", featuredItems);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/items")
    @Operation(summary = "Browse all approved items", description = "Get paginated list of approved items")
    public ResponseEntity<?> browseItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Page<ItemResponse> items = itemService.getApprovedItems(page, size);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/items/{id}")
    @Operation(summary = "Get item details", description = "Get detailed information about a specific item")
    public ResponseEntity<?> getItemDetails(@PathVariable String id) {
        ItemResponse item = itemService.getItemById(id);
        return ResponseEntity.ok(item);
    }
}
