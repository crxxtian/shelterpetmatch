package com.shelterpetmatch.cristian.controller;

import com.shelterpetmatch.cristian.model.User;
import com.shelterpetmatch.cristian.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Error: Email already registered!";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Signup successful!";
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            User loggedInUser = existingUser.get();

            // Return user ID and email only (no password!)
            return new UserDTO(loggedInUser.getId(), loggedInUser.getEmail());
        } else {
            return "Error: Invalid email or password!";
        }
    }

    // Create an internal DTO class
    static class UserDTO {
        private Long id;
        private String email;

        public UserDTO(Long id, String email) {
            this.id = id;
            this.email = email;
        }

        public Long getId() {
            return id;
        }

        public String getEmail() {
            return email;
        }
    }
}
