package com.tranquility.ReWear.dto;

import com.tranquility.ReWear.model.Role;
import java.util.Set;

public class UserProfileResponse {
    private String id;
    private String name;
    private String email;
    private String avatar;
    private Integer points;
    private Set<Role> roles;
    
    public UserProfileResponse(String id, String name, String email, String avatar, Integer points, Set<Role> roles) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.points = points;
        this.roles = roles;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    
    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
    
    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
}
