package com.shelterpetmatch.cristian.repository;

import com.shelterpetmatch.cristian.model.User;
import com.shelterpetmatch.cristian.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(User user);
}
