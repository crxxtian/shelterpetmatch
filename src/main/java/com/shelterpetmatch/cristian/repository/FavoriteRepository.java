package com.shelterpetmatch.cristian.repository;

import com.shelterpetmatch.cristian.model.Favorite;
import com.shelterpetmatch.cristian.model.Pet;
import com.shelterpetmatch.cristian.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser(User user);

    Optional<Favorite> findByUserAndPet(User user, Pet pet);

    @Transactional
    @Modifying
    @Query("DELETE FROM Favorite f WHERE f.user = :user AND f.pet = :pet")
    void deleteByUserAndPet(@Param("user") User user, @Param("pet") Pet pet);
}
