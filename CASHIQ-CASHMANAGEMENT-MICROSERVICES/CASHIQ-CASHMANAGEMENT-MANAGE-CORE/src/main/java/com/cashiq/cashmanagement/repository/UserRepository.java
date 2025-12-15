package com.cashiq.cashmanagement.repository;

import com.cashiq.cashmanagement.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This interface is used to store the user details
 */
@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    /**
     * @method - findByUsername
     * @param - username
     * @return - Optional<Users>
     * @Description - This method is used to find the user by username
     */
    Optional<Users> findByUsername(String username);
}
