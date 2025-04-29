package com.shelterpetmatch.cristian.repository;

import com.shelterpetmatch.cristian.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    // basic CRUD operations inherited
}
