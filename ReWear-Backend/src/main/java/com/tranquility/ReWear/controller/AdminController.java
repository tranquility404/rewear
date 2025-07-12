package com.tranquility.ReWear.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tranquility.ReWear.dto.ItemResponse;
import com.tranquility.ReWear.model.ItemStatus;
import com.tranquility.ReWear.service.ItemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin management APIs")
public class AdminController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/items/pending")
    @Operation(summary = "Get pending items", description = "Get all items pending moderation")
    public ResponseEntity<?> getPendingItems() {
        List<ItemResponse> items = itemService.getPendingItems();
        return ResponseEntity.ok(items);
    }

    @PutMapping("/items/{id}/approve")
    @Operation(summary = "Approve item", description = "Approve a pending item")
    public ResponseEntity<?> approveItem(@PathVariable String id) {
        ItemResponse item = itemService.updateItemStatus(id, ItemStatus.APPROVED);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/items/{id}/reject")
    @Operation(summary = "Reject item", description = "Reject a pending item")
    public ResponseEntity<?> rejectItem(@PathVariable String id) {
        ItemResponse item = itemService.updateItemStatus(id, ItemStatus.REJECTED);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/items/{id}")
    @Operation(summary = "Delete item", description = "Delete an inappropriate or spam item")
    public ResponseEntity<?> deleteItem(@PathVariable String id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
