package com.tranquility.ReWear.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@Document(collection = "items")
public class Item {
    @Id
    private String id;
    
    private String title;
    private String description;
    private String category;
    private String type;
    private String size;
    private String condition;
    private List<String> tags = new ArrayList<>();
    private List<String> images = new ArrayList<>();
    
    private ItemStatus status = ItemStatus.PENDING;
    
    @DBRef
    private User uploader;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    public Item(String title, String description, User uploader) {
        this.title = title;
        this.description = description;
        this.uploader = uploader;
    }
}
