package com.tranquility.ReWear.service;

import com.tranquility.ReWear.dto.UserProfileResponse;
import com.tranquility.ReWear.exception.ResourceNotFoundException;
import com.tranquility.ReWear.model.User;
import com.tranquility.ReWear.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public UserProfileResponse getUserProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getAvatar(),
                user.getPoints(),
                user.getRoles()
        );
    }
}
