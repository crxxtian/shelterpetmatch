package com.shelterpetmatch.cristian.controller;

import com.shelterpetmatch.cristian.model.User;
import com.shelterpetmatch.cristian.model.UserProfile;
import com.shelterpetmatch.cristian.repository.UserProfileRepository;
import com.shelterpetmatch.cristian.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class UserProfileController {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save")
    public UserProfile saveProfile(@RequestBody UserProfileRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<UserProfile> existingProfile = userProfileRepository.findByUser(user);

        UserProfile profile = existingProfile.orElse(new UserProfile());
        profile.setUser(user);
        profile.setName(request.getName());
        profile.setCity(request.getCity());
        profile.setBio(request.getBio());
        profile.setPreferredType(request.getPreferredType());
        profile.setPreferredAgeRange(request.getPreferredAgeRange());

        return userProfileRepository.save(profile);
    }

    @GetMapping("/{userId}")
    public UserProfile getProfile(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    // DTO for receiving JSON from frontend
    public static class UserProfileRequest {
        private Long userId;
        private String name;
        private String city;
        private String bio;
        private String preferredType;
        private String preferredAgeRange;

        // Getters and Setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public String getBio() { return bio; }
        public void setBio(String bio) { this.bio = bio; }

        public String getPreferredType() { return preferredType; }
        public void setPreferredType(String preferredType) { this.preferredType = preferredType; }

        public String getPreferredAgeRange() { return preferredAgeRange; }
        public void setPreferredAgeRange(String preferredAgeRange) { this.preferredAgeRange = preferredAgeRange; }
    }
}
