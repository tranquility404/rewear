package com.tranquility.ReWear.dto;

import com.tranquility.ReWear.model.ItemStatus;
import java.time.LocalDateTime;
import java.util.List;

public class ItemResponse {
    private String id;
    private String title;
    private String description;
    private String category;
    private String type;
    private String size;
    private String condition;
    private List<String> tags;
    private List<String> images;
    private ItemStatus status;
    private UploaderInfo uploader;
    private LocalDateTime createdAt;
    
    // Constructors
    public ItemResponse() {}
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
    
    public ItemStatus getStatus() { return status; }
    public void setStatus(ItemStatus status) { this.status = status; }
    
    public UploaderInfo getUploader() { return uploader; }
    public void setUploader(UploaderInfo uploader) { this.uploader = uploader; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public static class UploaderInfo {
        private String id;
        private String name;
        private String avatar;
        
        public UploaderInfo(String id, String name, String avatar) {
            this.id = id;
            this.name = name;
            this.avatar = avatar;
        }
        
        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getAvatar() { return avatar; }
        public void setAvatar(String avatar) { this.avatar = avatar; }
    }
}
