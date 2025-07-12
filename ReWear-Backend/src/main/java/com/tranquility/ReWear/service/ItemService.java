package com.tranquility.ReWear.service;

import com.tranquility.ReWear.dto.ItemRequest;
import com.tranquility.ReWear.dto.ItemResponse;
import com.tranquility.ReWear.exception.ResourceNotFoundException;
import com.tranquility.ReWear.model.Item;
import com.tranquility.ReWear.model.ItemStatus;
import com.tranquility.ReWear.model.User;
import com.tranquility.ReWear.repository.ItemRepository;
import com.tranquility.ReWear.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ItemService {
    
    @Autowired
    private ItemRepository itemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private final String uploadDir = "uploads/";
    
    public ItemResponse createItem(ItemRequest itemRequest, String userId, List<MultipartFile> images) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Item item = new Item();
        item.setTitle(itemRequest.getTitle());
        item.setDescription(itemRequest.getDescription());
        item.setCategory(itemRequest.getCategory());
        item.setType(itemRequest.getType());
        item.setSize(itemRequest.getSize());
        item.setCondition(itemRequest.getCondition());
        item.setTags(itemRequest.getTags());
        item.setUploader(user);
        item.setStatus(ItemStatus.PENDING);
        
        // Handle image uploads
        if (images != null && !images.isEmpty()) {
            List<String> imageUrls = images.stream()
                    .map(this::saveImage)
                    .collect(Collectors.toList());
            item.setImages(imageUrls);
        }
        
        Item savedItem = itemRepository.save(item);
        return convertToResponse(savedItem);
    }
    
    public ItemResponse getItemById(String id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
        return convertToResponse(item);
    }
    
    public List<ItemResponse> getFeaturedItems() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("createdAt").descending());
        List<Item> items = itemRepository.findByStatusOrderByCreatedAtDesc(ItemStatus.APPROVED, pageable);
        return items.stream().map(this::convertToResponse).collect(Collectors.toList());
    }
    
    public List<ItemResponse> getUserItems(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<Item> items = itemRepository.findByUploader(user);
        return items.stream().map(this::convertToResponse).collect(Collectors.toList());
    }
    
    public Page<ItemResponse> getApprovedItems(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Item> items = itemRepository.findByStatus(ItemStatus.APPROVED, pageable);
        return items.map(this::convertToResponse);
    }
    
    public List<ItemResponse> getPendingItems() {
        List<Item> items = itemRepository.findByStatus(ItemStatus.PENDING);
        return items.stream().map(this::convertToResponse).collect(Collectors.toList());
    }
    
    public ItemResponse updateItemStatus(String itemId, ItemStatus status) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
        item.setStatus(status);
        Item updatedItem = itemRepository.save(item);
        return convertToResponse(updatedItem);
    }
    
    public void deleteItem(String itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
        itemRepository.delete(item);
    }
    
    private String saveImage(MultipartFile file) {
        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Generate unique filename
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            
            // Save file
            Files.copy(file.getInputStream(), filePath);
            
            return "/uploads/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
    
    private ItemResponse convertToResponse(Item item) {
        ItemResponse response = new ItemResponse();
        response.setId(item.getId());
        response.setTitle(item.getTitle());
        response.setDescription(item.getDescription());
        response.setCategory(item.getCategory());
        response.setType(item.getType());
        response.setSize(item.getSize());
        response.setCondition(item.getCondition());
        response.setTags(item.getTags());
        response.setImages(item.getImages());
        response.setStatus(item.getStatus());
        response.setCreatedAt(item.getCreatedAt());
        
        if (item.getUploader() != null) {
            response.setUploader(new ItemResponse.UploaderInfo(
                    item.getUploader().getId(),
                    item.getUploader().getName(),
                    item.getUploader().getAvatar()
            ));
        }
        
        return response;
    }
}
