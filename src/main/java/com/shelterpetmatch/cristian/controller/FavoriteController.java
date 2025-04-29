package com.shelterpetmatch.cristian.controller;

import com.shelterpetmatch.cristian.model.Favorite;
import com.shelterpetmatch.cristian.model.Pet;
import com.shelterpetmatch.cristian.model.User;
import com.shelterpetmatch.cristian.repository.FavoriteRepository;
import com.shelterpetmatch.cristian.repository.PetRepository;
import com.shelterpetmatch.cristian.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired private FavoriteRepository favoriteRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private PetRepository petRepo;

    @PostMapping("/add")
    public Favorite add(@RequestBody FavoriteRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Pet pet = petRepo.findById(req.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        return favoriteRepo.findByUserAndPet(user, pet)
                .orElseGet(() -> {
                    Favorite favorite = new Favorite();
                    favorite.setUser(user);
                    favorite.setPet(pet);
                    return favoriteRepo.save(favorite);
                });
    }

    @GetMapping("/{userId}")
    public List<Favorite> list(@PathVariable Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return favoriteRepo.findByUser(user);
    }

    @DeleteMapping("/remove/{userId}/{petId}")
    public void remove(@PathVariable Long userId, @PathVariable Long petId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Pet pet = petRepo.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        favoriteRepo.deleteByUserAndPet(user, pet);
    }

    // DTO for request body
    public static class FavoriteRequest {
        private Long userId;
        private Long petId;

        public Long getUserId() {
            return userId;
        }
        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public Long getPetId() {
            return petId;
        }
        public void setPetId(Long petId) {
            this.petId = petId;
        }
    }
}
